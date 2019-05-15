---
title: Developing with Workers
alwaysopen: true
---

The Workers Ecosystem introduces a few subtle differences in how you have to think about your code. Under the hood, the Workers Runtime uses the V8 engine, and implements many of the standard [APIs](../runtime/apis) available in most modern browsers. However, rather than running on an individual's machine -- like a browser application --, or on a centralized server -- like a Node/Express application or Lambda function -- Workers apps run on Cloudflares Edge Network - a growing global network of thousands of machines distributed across hundreds of locations. Each of these machines hosts an instance of the Workers runtime, and each of those runtimes is capable of running thousands of user-defined apps. This guide will unpack some of those differences, and direct you to more in-depth resources.

## Isolates

![process-vs-isolate](/reference/media/isolates.png)

Isolates are lightweight contexts that group variables with the code allowed to mutate them. Most importantly, a single process can run hundreds or thousands of isolates, seamlessly switching between them. They make it possible to run untrusted code from many different customers within a single operating system process. They’re designed to start very quickly, and to not allow one isolate to access the memory of another.

Unlike other serverless providers, which use containerized processes each running an instance of the language runtime, we pay the overhead of a JavaScript runtime once, and then are able to run essentially limitless scripts with almost no individual overhead. Any given isolate can start around a hundred times faster than I can get a Node process to start on my machine. Even more importantly, they consume an order of magnitude less memory than that process.

A given isolate has its own scope, but isolates are not necessarily long-lived. An isolate may be spun down and evicted for a number of reasons: resource limitations on the machine, a suspicious script, individual [resource limits](../limits), etc. Because of this, it is generally advised that you not store mutable state in your global scope unless you have accounted for this contingency.

[Read more about handling state]()

[Read more about how Isolates relate to Security and Spectre Threat Mitigation](./security)

## Compute per Request

You'll notice that most of our [templates](../templates) are a variation on the default template:

``` javascript
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response("Hello worker!", {status: 200})
}
```

The first code block sets an event listener for the [Fetch Event](./fetch-events), which is triggered on any http(s) request to the URL where your code is deployed. Fetch Events typically complete with a call to `event.respondWith`, which takes as its argument a [`Response Object`](../runtime/apis/fetch#response).

When a request to your workers.dev subdomain, or to your Cloudflare-managed domain, is received by any of Cloudflare's data center machines, it is passed as an argument to the event handler you have defined. From there you can compute a response on the spot, call through to another server using [`fetch()`](../runtime/apis/fetch#response), or filter out unwanted requests and return an error response. Your account is billed based on the number of requests your script handles, rather than on compute time.

[Read more about FetchEvents](./fetch-events)

[Read more about the Service Worker Lifecycle](./service-worker-lifecycle)

[Read more about the Request Context](./request-context)

[Read more about Runtime Limitations](../runtime/limits)

## Distributed Execution

Isolates are resilient for the duration of a request, but when you hit our [limits](../limits), or when resources are tight in a metal, the runtime will selectively evict isolates once their events are properly resolved.

A single worker instance may handle multiple requests, including concurrent requests (in a single-threaded event loop, like all other JS platforms), but there's no guarantees whatsoever whether any two requests will land in the same instance. Because of this, it is inadvisable to set or mutate global state within the event handler.

- important to note: your code runs on the distributed network, not in a browser, and not in a central server.
- your code runs in its own isolate per location, spinning up and down based on traffic. there are several reasons it might spin down/be evicted, so be cautious with global scope
- your code is running on potentially hundreds of machines at any given time; there is no guarantee that any request will be handled by any given instance, even from the same IP.

## More Guides

[Understanding Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

[Signing Requests with the Web Crypto API](./signing-requests)

[Accessing the Cloudflare Cache](./accessing-cf-cache)

