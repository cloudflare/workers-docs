---
title: Hot-link Protection
---
You can use Cloudflare Workers to protect your hot-links on your web properties. 

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

/**
 * If the browser is requesting an image and 
 * the referer does not match your host
 * we redirect the request to your page
 */
async function fetchAndApply(request) {
  // Fetch the response.
  let response = await fetch(request)

  // If it's an image, engage hotlink protection based on the
  // Referer header.
  let referer = request.headers.get('Referer')
  let contentType = response.headers.get('Content-Type') || ''
  if (referer && contentType.startsWith('image/')) {
    // It's an image and there's a Referer. Verify that the
    // hostnames match.
    if (new URL(referer).hostname !==
        new URL(request.url).hostname) {
      // Hosts don't match. This is a hotlink. Redirect the
      // user to our homepage.
      return Response.redirect('/', 302)
    }
  }

  // Everything is fine, return the response normally.
  return response
}
{{</highlight>}}