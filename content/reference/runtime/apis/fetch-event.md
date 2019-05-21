# Fetch Event

## Overview

With a registered Worker script running in your Cloudflare Edge domain, HTTP requests trigger a `fetch` event within the global scope of the registered Worker. Every worker listens for `fetch` events and passes incoming requests to the event handler.

Use this request for example, to display deprecation warnings to responses or display banners explaining upcoming changes.

**Note:** We recommend including this call as the very first thing your worker does in its fetch event listener. If you do not include this call and your worker encounters an uncaught exception while processing your request, your end user sees an edge-level error page instead of a response from your site, application, or API.


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

This worker script demonstrates a direct passthrough; however, the event handler lets you leverage all available APIs to manipulate intercepted requests. For example, you can retrieve data from [Cache](/reference/runtime/apis/cache), compute a custom response right from the edge, [route](https://github.com/cloudflare/worker-template-router) the request to the appropriate service, filter traffic, and [more](/templates).

## FetchEvent Object

### Properties

* `type`: The type of event. Always = `fetch`.

* `request`: A [Request Object](../fetch#Request) that represents the request triggering `FetchEvent`.

### Methods


* `passThroughOnException`: Cause the script to ["fail open"](https://community.microfocus.com/t5/Security-Blog/Security-Fundamentals-Part-1-Fail-Open-vs-Fail-Closed/ba-p/283747) unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException` causes the worker to act as if the exception wasn’t there. This allows you to yield control to your origin server.
* `respondWith`: Intercept the request and send a custom response
	* If an event handler does not call `respondWith()`, the runtime delivers the event to the next registered event handler.
	* If no event handler calls `respondWith()`, the runtime proxies the request to its destination.
* `waitUntil`: Extend the lifetime of the event. Use this method to notify the runtime to wait for tasks, such as streaming and caching, that run longer than the usual time it takes to send a response. This is good for handling logging and analytics to third-party services, where you don't want to block the `response`.
