---
title: FetchEvent
weight: 3
---

The event type for HTTP requests dispatched to a Worker (i.e the`Object` passed through as `event` in [`addEventListener`](/reference/apis/addEventListener).

## Usage

```js
addEventListener('fetch', (event) => {
  event.respondWith(eventHandler(event))
})
```

### Properties

- `event.type: String`: The type of event. Always = `fetch`.

- `event.request:`[`Request`](/reference/apis/request): The incoming HTTP request triggering `FetchEvent`.

### Methods

The `FetchEvent` lifecycle starts when a Workers script receives a request; this causes the Workers runtime to trigger a `fetch` event and creates a FetchEvent Object to pass to the first event handler in the Workers function registered for `'fetch'`. Then the event handler can use any of the following methods to control what happens next:

- `event.respondWith(response:`[`Response`](/reference/apis/response)`| Promise <`[`Response`](/reference/apis/response)`> ): void`: Intercept the request and send a custom response.

  _If no event handler calls `respondWith()` the runtime attempts to request the origin as if no Worker script exists. If no origin is setup (e.g. workers.dev sites), then the Workers script must call `respondWith()` for a valid response._

- `event.passThroughOnException(): void`: Cause the script to ["fail open"](https://community.microfocus.com/t5/Security-Blog/Security-Fundamentals-Part-1-Fail-Open-vs-Fail-Closed/ba-p/283747) unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException` causes the Worker script to act as if the exception wasn’t there. This allows the script to yield control to your origin server.

- `event.waitUntil(pro Promise < void > ): void`: Extend the lifetime of the event without blocking the `response` to the request. Use this method to notify the runtime to wait for tasks (e.g. logging,analytics to third-party services, streaming and caching) that run longer than the usual time it takes to send a response.

To learn more about using the `FetchEvent`, see [FetchEvent LifeCycle](/about/tips/fetch-event-lifecycle).
