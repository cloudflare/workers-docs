---
title: 'Updating Error Statuses'
---

This example catches request errors between 400 and 599 and returns static content in its place with a 200 status.

## With Lambda@Edge:

```js
'use strict'

exports.handler = (event, context, callback) => {
  const response = event.Records[0].cf.response

  /**
   * This function updates the response status to 200 and generates static
   * body content to return to the viewer in the following scenario:
   * 1. The function is triggered in an origin response
   * 2. The response status from the origin server is an error status code (4xx or 5xx)
   */

  if (response.status >= 400 && response.status <= 599) {
    response.status = 200
    response.statusDescription = 'OK'
    response.body = 'Body generation example'
  }

  callback(null, response)
}
```

## With Workers:

```js
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  let response = await fetch(request)

  if (response.status >= 400 && response.status <= 599) {
    response = new Response('Body generation example', {
      status: 200,
      statusText: 'OK',
    })
  }

  return response
}
```
