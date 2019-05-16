# Fetch Event

## Overview

With a registered Worker script running in your Cloudflare Edge domain, HTTP requests send a `fetch` event within the [global scope](TODO: Link ServiceWorkerGlobalScope) of the registered Worker. 

**Example of a basic Worker script** 

```javascript
/**
 * Register a FetchEvent listener that sends a custom 
 * response for the given request.
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

The above worker script demonstrates a direct passthrough; however, the event handler lets you leverage all available APIs to manipulate intercepted requests. For example, you can retrieve data from [Cache](TODO: Link Cache API), compute a custom response right from the edge, [route](TODO: link to router template) the request to the appropriate service, filter traffic, and [more](TODO: link tutorials and/or template gallery).

## FetchEvent Object

### Properties

* `type`: The type of event. Always = `fetch`.

* `request`: A [Request Object](TODO: Link to Request Object in FetchAPI) that represents the request triggering `FetchEvent`.

### Methods


* `passThroughOnException`: Cause the script to "fail open" unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. This is a Cloudflare Worker method.

* `respondWith`: Intercept the request and send a custom response, such as acknowledging the request and saying you'll be quick to reply. 
	* If an event handler does not call `respondWith()`, the runtime delivers the event to the next registered event handler. 
	* If no event handler calls `respondWith()`, the runtime proxies the request to its destination.

* `waitUntil`: Extend the lifetime of the event. Use this method to notify the runtime to wait for tasks, such as streaming and caching, that run longer than the usual time it takes to send a response. It is a good place to handle logging and analytics to third-party services, where you don't want to block the `response`. This is a standard Service Worker method.
