import { is_directory, determine_content_type, normalize_path } from './utils'
import { handleRedirect } from './redirects'

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
    if (handleRedirect(request)) return handleRedirect(request)

    pathname = pathname.replace('/docs/', '')

    var path = normalize_path(pathname)

    if (!path.endsWith('/') && is_directory(path)) {
      return Response.redirect(request.url + '/', 301)
    }

    var contentType = determine_content_type(path)

    let body = await STATIC_CONTENT.get(path, 'arrayBuffer')

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
