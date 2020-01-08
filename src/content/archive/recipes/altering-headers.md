---
title: Altering Headers
---
To modify  request or response headers, you'll first need to make a copy of the object in order to make it mutable. You can then use the [Headers interface](https://developer.mozilla.org/en-US/docs/Web/API/Headers) to add, change, or remove headers.

## Response headers
Set a new header on your response before returning it the end user.

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let response = await fetch(request)

  // Make the headers mutable by re-constructing the Response.
  response = new Response(response.body, response)
  response.headers.set('x-my-header', 'custom value')

  return response
}
{{</highlight>}}


## Request headers
Set a new header on the request before fetching a response from the origin.

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Make the headers mutable by re-constructing the Request.
  request = new Request(request)
  request.headers.set('x-my-header', 'custom value')

  return await fetch(request)
}
{{</highlight>}}