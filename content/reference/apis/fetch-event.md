---
title: FetchEvent
weight: 3
---

The event type for HTTP requests dispatched to a Worker (i.e the`Object` passed through as `'fetch'` in `addEventListener('fetch', event => {…})`).

If multiple event listeners are registered, when an event handler does not call `respondWith()` the runtime delivers the event to the next registered event handler.

### Properties

- `type`: The type of event. Always = `fetch`.

- `request`: A [Request Object](/reference/apis/request) that represents the request triggering `FetchEvent`.

### Methods

- `passThroughOnException`: Cause the script to ["fail open"](https://community.microfocus.com/t5/Security-Blog/Security-Fundamentals-Part-1-Fail-Open-vs-Fail-Closed/ba-p/283747) unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException` causes the Worker script to act as if the exception wasn’t there. This allows the script to yield control to your origin server.

- `respondWith`: Intercept the request and send a custom response.
	If no event handler calls `respondWith()` the runtime attempts to proxy the request to the origin as if no Worker script intercepted.
- `waitUntil`: Extend the lifetime of the event. Use this method to notify the runtime to wait for tasks, such as streaming and caching, that run longer than the usual time it takes to send a response. This is good for handling logging and analytics to third-party services, where you don't want to block the `response`.

To learn more about using the `FetchEvent`, see [FetchEvent LifeCycle](/about/tips/fetch-event-lifecycle).

---
title: The FetchEvent Lifecycle
---

When working with the [`fetch` event](/reference/apis/fetch-event) inside the Workers runtime, it helps to have a good idea of its lifecycle.

The [FetchEvent](/reference/apis/fetch-event) lifecycle starts when Cloudflare's edge network receives a request whose URL matches both a zone and a route for a Workers function; this causes the Workers runtime to trigger a `fetch` event and creates a FetchEvent Object to pass to the first event handler in the Workers function registered for `'fetch'`. Then the event handler can use any of the following to control what happens next:
