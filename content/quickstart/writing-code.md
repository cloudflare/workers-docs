---
title: "Writing Code"
--- 

Once you have an environment set up either with Wrangler or [the Playground](/reference/tooling/playground), you are ready to start writing scripts.

## Hello World

At its heart, a Workers app consists of two parts: an event listener that listens for [`FetchEvents`](/reference/runtime/apis/fetch-event), and an event handler that returns a [Response](/reference/runtime/apis/fetch#response) object which is passed to the event's `.respondWith()` method.

When a request is received on one of Cloudflare's edge servers for a URL matching a Workers script, it passes the request in to the Workers runtime, which in turn emits a 'fetch' event in the isolate where the script is running.

```javascript
// 1. Register a FetchEvent listener that sends a custom
//    response for the given request.
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 2. Return a custom request object
async function handleRequest(request) {
  return new Response("hello world")
}
```

Let's break this down:

### 1. An event listener for the `FetchEvent`:

Tells the script to listen for any request coming to your Worker. `event.request` - of type [`Request`](/reference/runtime/apis/fetch#request) - is a representation of the HTTP request that triggered the FetchEvent.

### 2. A call to `.respondWith()`

The FetchEvent handler typically culminates in a call to the method `.respondWith()` with either a [`Response`](/reference/runtime/apis/fetch/#response) or `Promise<Response>` that determines the response.

The FetchEvent object also provides two other methods -  `.passThroughOnException()` and `.waitUntil()`-   to handle unexpected exceptions and operations that may complete after a response is returned.

##### Further Reading

* [The FetchEvent Lifecycle](/reference/workers-concepts/fetch-event-lifecycle)
* [FetchEvent API Reference](/reference/runtime/apis/fetch-event)

## Directing Requests

Now that we have a very basic script running on all requests, how can we filter requests to reach certain handlers? There are a few options:

##### Option 1: manually filter requests

You can use standard JavaScript branching logic, such as `if/else` or `switch` statements, to conditionally return different responses or execute different handlers based on the request:

```javascript
async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = await generate(request)
  } else {
    response = new Response('Expected POST', { status: 500 })
  }
```

For all avaliable methods of the Request object that you can filter by see: [Requests](/reference/runtime/apis/fetch#request).

##### Option 2: use a template for routing on URL

The [Workers Router](https://github.com/cloudflare/worker-template-router) template provides an API similar to ExpressJS for handling requests based on HTTP methods and paths. To initialize a project using this router with Wrangler, simply pass the git repository URL to Wrangler's `generate` command:

```sh
wrangler generate myApp https://github.com/cloudflare/worker-template-router
```

We'll use this approach in the [Slack Bot Tutorial](/tutorials/build-an-application).

### Templates

There are a variety of examples in the [Template Gallery](/templates) for more custom solutions.

### Workers Concepts

The example outlined in this guide is just a starting point. There are many more [APIs](/reference/runtime/apis) available to manipulate intercepted requests. For example, you can retrieve data from [Cache](/reference/runtime/apis/cache), compute a custom response right from the edge, route the request to the appropriate service, filter traffic, and more.

For concepts, pitfalls and guidelines to keep in mind while writing scripts, check out our [Workers Concepts](/reference/workers-concepts) articles.