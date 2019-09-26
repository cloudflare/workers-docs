import { is_directory } from './utils'
import { handleRedirect } from '../redirects/index'
import { newDocsMap } from '../redirects/newDocs'
import { oldDocsMap } from '../redirects/oldDocs'
import { getAssetFromKV, mapRequestToAsset} from '@cloudflare/kv-asset-handler'

const myMapRequestToAsset = request => {
  request = mapRequestToAsset(request)
  let url = new URL(request.url)
  url.pathname = url.pathname.replace('/workers', '/')
  return new Request(url, request)
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
      body = await getAssetFromKV(event, { mapRequestToAsset: myMapRequestToAsset })
    } catch (e) {
      console.log(e, 'not found in KV')
    }
    // strip trailing slashes since newDocsMaps won't include
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
