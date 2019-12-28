---
title: "Originless Responses"
---

You can return responses directly from the edge. No need to hit your origin.

## Ignore POST and PUT HTTP requests
Ignore POST and PUT HTTP requests. This snippet allows all other requests to pass through to the origin.

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {  
  if (request.method === 'POST' || request.method === 'PUT') {
    return new Response('Sorry, this page is not available.',
        { status: 403, statusText: 'Forbidden' })
  }

  return fetch(request)
}
{{</highlight>}}

## Deny a spider or crawler
Protect your origin from unwanted spiders or crawlers. In this case, if the user-agent is "annoying-robot", the Worker returns the response instead of sending the request to the origin.

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {  
  if (request.headers.get('user-agent').includes('annoying_robot')) {
    return new Response('Sorry, this page is not available.',
        { status: 403, statusText: 'Forbidden' })
  }

  return fetch(request)
}
{{</highlight>}}

## Prevent a specific IP from connecting
Blacklist IP addresses. This snippet of code prevents a specific IP, in this case '225.0.0.1' from connecting to the origin.

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {  
  if (request.headers.get('cf-connecting-ip') === '225.0.0.1') {
    return new Response('Sorry, this page is not available.',
        { status: 403, statusText: 'Forbidden' })
  }

  return fetch(request)
}
{{</highlight>}}
