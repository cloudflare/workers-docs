import { is_directory, determine_content_type } from './utils'
import { handleRedirect } from './redirects'
import { newDocsMap } from './data/newDocs'
import { oldDocsMap } from './data/oldDocs'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})
/**
 * gets the path to look up in KV (the ./public dir)
 * e.g. /dir/ -> dir/index.html
 * @param {*} pathname
 */
const keyModifier = pathname => {
  pathname = pathname.replace('/workers', '')
  // strip first slash(es)
  pathname = pathname.replace(/^\/+/, '')
  // root page
  if (pathname == '') {
    return 'index.html'
    // directory page with a trailing /
  } else if (pathname.endsWith('/')) {
    pathname + 'index.html'
    // normal pathname, no need to do anything!
  }
  return pathname
}

async function handleRequest(event) {
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

    var path = keyModifier(pathname)
    console.log('pathname', pathname)
    console.log('pat', path)

    // ensure all directories are redirected with a trailing
    // slash
    if (!path.endsWith('/') && is_directory(path)) {
      return Response.redirect(request.url + '/', 301)
    }

    let body = getAssetFromKV(event, keyModifier)
    // strip  trailing slashes since newDocsMaps won't include
    pathname = pathname.replace(/\/$/, '')
    if (!body || newDocsMap.has(pathname) || oldDocsMap.has(pathname)) {
      console.log('Handling redirect')
      return handleRedirect(request)
    }

    return body
  } catch (err) {
    console.log(err)
    let res = new Response(err.body, { status: err.status })
    res.headers.set('Content-type', 'text/html')
    return res
  }
}
