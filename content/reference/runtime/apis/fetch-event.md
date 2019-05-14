---
title: Fetch Event
---

## Overview

When an HTTP request is received on Cloudflare's Edge network for a URL with a registered Worker script, a `fetch` event is emitted within the [global scope](TODO: Link ServiceWorkerGlobalScope) of the registered Worker. The most basic Worker script therefore looks like this:

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

The above worker is just a passthrough, but within the event handler function, you can leverage all of the available APIs to manipulate the intercepted request: you can retrieve data from [Cache](../cache), compute a custom response right from the edge, [route](TODO: link to router template) the request to the appropriate service, filter traffic, and [more](../../../templates).

## FetchEvent Object

### Properties

`type`: the type of event. Always `fetch`.

`request`: a [Request Object](../fetch#request) representing the request that triggered the FetchEvent.

### Methods

`passThroughOnException`: Cause script to "fail open" in the event of an unhandled exception. That is, rather than returning a runtime error response, the runtime proxies the request to its destination.

`respondWith`: Intercept the request and provide (a promise for) a response yourself. If an event handler does not call `respondWith()`, the runtime will deliver the event to the next registered event handler. If no event handler calls `respondWith()`, the runtime proxies the request to its destination.

`waitUntil`: Extend the lifetime of the event. Used to notify the runtime of tasks that extend beyond the returning of a response, such as streaming and caching. This is also a good place to handle logging and analytics to third party services that you don't want to block a Response.
