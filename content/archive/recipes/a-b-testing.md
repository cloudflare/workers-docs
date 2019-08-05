---
title: "A/B Testing"
---

You can create a Cloudflare Worker to control A/B tests.

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {
  const name = 'experiment-0'
  let group          // 'control' or 'test', set below
  let isNew = false  // is the group newly-assigned?

  // Determine which group this request is in.
  const cookie = request.headers.get('Cookie')
  if (cookie && cookie.includes(`${name}=control`)) {
    group = 'control'
  } else if (cookie && cookie.includes(`${name}=test`)) {
    group = 'test'
  } else {
    // 50/50 Split
    group = Math.random() < 0.5 ? 'control' : 'test'
    isNew = true
  }

  // We'll prefix the request path with the experiment name. This way,
  // the origin server merely has to have two copies of the site under
  // top-level directories named "control" and "test".
  let url = new URL(request.url)
  // Note that `url.pathname` always begins with a `/`, so we don't
  // need to explicitly add one after `${group}`.
  url.pathname = `/${group}${url.pathname}`

  request = new Request(url, request)

  let response = await fetch(request)

  if (isNew) {
    // The experiment was newly-assigned, so add a Set-Cookie header
    // to the response. We need to re-construct the response to make
    // the headers mutable.
    response = new Response(response.body, response)
    response.headers.append('Set-Cookie', `${name}=${group}; path=/`)
  }

  return response
}
{{</highlight>}}
