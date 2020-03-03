import { handleRedirect } from '../redirects/index'
import { newDocsMap } from '../redirects/newDocs'
import { oldDocsMap } from '../redirects/oldDocs'
import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
const templateRegURL = 'https://template-registry.developers.workers.dev/templates/'
const myMapRequestToAsset = request => {
  request = mapRequestToAsset(request)
  let url = new URL(request.url)
  // url.pathname = url.pathname.replace(/^\/workers/, '/')
  url.pathname = url.pathname.replace(/^(?!\/*workers.*$).*/, '/workers' + url.pathname) //nothing that doesn't start with /workers (i.e. probably called by gatsby, prepend /workers)
  return new Request(url, request)
}
function is_directory(path) {
  const bits = path.split('/')
  const last = bits[bits.length - 1]

  // does the final component contain a dot? technically there may be edge cases
  // here but this is fine for now!
  return !last.includes('.')
}
export async function handleRequest(event) {
  try {
    const request = event.request
    var parsedUrl = new URL(request.url)
    var pathname = parsedUrl.pathname
    // ensure any requests to /dir/index.html redirect
    // to /dir/ immediately
    if (pathname.endsWith('index.html')) {
      const url = request.url.replace(/\/*index.html\/*/i, '/')
      return Response.redirect(url, 301)
    }
    // ensure all directories are redirected with a trailing
    // slash
    if (!pathname.endsWith('/') && is_directory(pathname)) {
      return Response.redirect(request.url + '/', 301)
    }
    let body = null
    try {
      body = await getAssetFromKV(event, {
        mapRequestToAsset: myMapRequestToAsset,
        cacheControl:{
          browserTTL: 31536000,
          edgeTTL: 31536000
        }
      })
    } catch (e) {
      console.log(e, 'not found in KV')
    }
    // strip trailing slashes and /workers since newDocsMaps won't include
    pathname = pathname.replace(/\/workers/, '')
    pathname = pathname.replace(/\/$/, '')
    if (!body || newDocsMap.has(pathname) || oldDocsMap.has(pathname)) {
      console.log('Handling redirect')
      return handleRedirect(request)
    }
    return body
  } catch (err) {
    console.log(err)
    let res = new Response(err.body || err.message, { status: 500 })
    res.headers.set('Content-type', 'text/html')
    return res
  }
}
class MetaHandler {
  constructor(content) {
    this.meta = { ...content }
  }
  element(element) {
    let type = element.getAttribute('property')
    type += element.getAttribute('name')
    if (typeof type !== 'string') return
    if (type.includes('title')) {
      element.setAttribute('content', this.meta.title)
    }
    if (type.includes('description')) {
      element.setAttribute('content', this.meta.description)
    }
  }
}
class TitleHandler {
  constructor(content) {
    this.content = { ...content }
  }
  element(element) {
    element.setInnerContent(this.content.title)
  }
}
