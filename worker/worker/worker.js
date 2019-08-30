import { is_directory, determine_content_type, normalize_path } from './utils'
import { handleRedirect } from './redirects'
import { newDocsMap } from './data/newDocs'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    var parsedUrl = new URL(request.url)
    var pathname = parsedUrl.pathname
    pathname = pathname.replace('/workers', '')

    var path = normalize_path(pathname)

    if (!path.endsWith('/') && is_directory(path)) {
      return Response.redirect(request.url + '/', 301)
    }

    var contentType = determine_content_type(path)

    let body = await WORKERS_DOCS_STATIC_CONTENT.get(path, 'arrayBuffer')
    // strip  trailing slashes since newDocsMaps won't include
    pathname = pathname.replace(/\/$/, '')
    if (!body || newDocsMap.has(pathname)) {
      return handleRedirect(request)
    }
    let res = new Response(body, { status: 200 })
    res.headers.set('Content-type', contentType)
    return res
  } catch (err) {
    console.log(err)
    let res = new Response(err.body, { status: err.status })
    res.headers.set('Content-type', 'text/html')
    return res
  }
}
