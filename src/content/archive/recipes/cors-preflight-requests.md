---
title: "CORS preflight requests"
---

With this Worker, you can handle [CORS preflight requests](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request). It passes GET, POST and HEAD requests through to the origin, while OPTIONS requests are answered directly.

```js
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request)
  } else if (request.method === "GET" ||
             request.method === "HEAD" ||
             request.method === "POST") {
    // Pass-through to origin.
    return fetch(request)
  } else {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    })
  }
}

// We support the GET, POST, HEAD, and OPTIONS methods from any origin,
// and accept the Content-Type header on requests. These headers must be
// present on all responses to all CORS requests. In practice, this means
// all responses to OPTIONS requests.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function handleOptions(request) {
  if (request.headers.get("Origin") !== null &&
      request.headers.get("Access-Control-Request-Method") !== null &&
      request.headers.get("Access-Control-Request-Headers") !== null) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: corsHeaders
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        "Allow": "GET, HEAD, POST, OPTIONS",
      }
    })
  }
}
```