---
title: FetchEvent
weight: 3
---

The event type for HTTP requests dispatched to a Worker (i.e the `Object` passed through as `event` in [`addEventListener()`](/reference/apis/addEventListener).

## Usage

```js
addEventListener('fetch', (event) => {
  event.respondWith(eventHandler(event))
})
```

### Properties

- `event.type: 'fetch'`: The type of event.

- `event.request: `[`Request`](/reference/apis/request): The incoming HTTP request triggering `FetchEvent`.

### Methods

When a Workers script receives a request, the Workers runtime triggers a FetchEvent which may then be handled by any event listeners registered for the type `'fetch'`. The event handler can invoke any of the following methods of the `event` object to control what happens next:

- `event.respondWith(response: `[`Response`](/reference/apis/response)` | Promise<`[`Response`](/reference/apis/response)`>): void`: Intercept the request and send a custom response.

  _If no event handler calls `respondWith()` the runtime attempts to request the origin as if no Worker script exists. If no origin is setup (e.g. workers.dev sites), then the Workers script must call `respondWith()` for a valid response._

- `event.passThroughOnException(): void`: Prevents requests from failing due to an unhandled exception thrown by the Worker, causing it instead to ["fail open"](https://community.microfocus.com/t5/Security-Blog/Security-Fundamentals-Part-1-Fail-Open-vs-Fail-Closed/ba-p/283747). Instead of returning an error response, the runtime will proxy the request to the origin server as though the Worker was never invoked.

- `event.waitUntil(promise: Promise<void>): void`: Extend the lifetime of the event without blocking the `response` from being sent. Use this method to notify the runtime to wait for tasks (e.g. logging, analytics to third-party services, streaming and caching) that need to run longer than the usual time it takes to send a response.

To learn more about using the `FetchEvent`, see [FetchEvent LifeCycle](/about/tips/fetch-event-lifecycle).
