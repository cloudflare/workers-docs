# Fetch Event

## Overview

Every script that is run on Cloudflare Workers is, at its heart, a handler for a Fetch Event. When a request is received on Cloudflare's Edge network for a URL with a registered Worker script, a `fetch` event is emitted within the [global scope](TODO: Link ServiceWorkerGlobalScope) of the registered Worker. The most basic Worker script therefore looks like this:

```javascript
/**
 * Register a FetchEvent listener that sends a custom 
 * Response for the given Request.
 */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and return a given request object
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch(request)
  return response
}
```

The above worker is just a passthrough, but within the event handler function, you can leverage all of the available APIs to manipulate the intercepted request: you can retrieve data from [Cache](TODO: Link Cache API), compute a custom response right from the edge, [route]() the request to the appropriate service, compose multiple subrequests to third party APIs, filter traffic, and [more](TODO: link tutorials and/or template gallery).

## FetchEvent Object

### Properties

`type`: the type of event. Always `fetch`.

`request`: a [Request Object](TODO: Link to Request Object) representing the request that triggered the FetchEvent.

### Methods

`passThroughOnException`: Takes zero arguments. Calling this method will cause your script to "fail open", that is, rather than returning a runtime error response, the request will instead be routed through to the origin server.

`respondWith`: Intercept the request and provide (a promise for) a response yourself.

`waitUntil`: Extends the lifetime of the event. Used to notify the runtime of tasks that extend beyond the returning of a response, such as streaming and caching. This is also a good place to handle logging and analytics to third party services that you don't want to block a Response.