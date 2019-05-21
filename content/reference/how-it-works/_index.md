---
title: Developing with Workers
alwaysopen: true
---

The Workers Ecosystem introduces a few subtle differences in how you have to think about your code relative to using JavaScript in the browser or in Node.JS. Under the hood, the Workers Runtime uses the V8 engine-- the same engine used by Chromium and Node.JS. The Workers runtime also implements many of the standard [APIs](https://developers.cloudflare.com/workers/runtime/apis) available in most modern browsers.  

The difference between JavaSript written for the browser or Node.JS happen at runtime. Rather than running on an individual's machine -- like a browser application, or on a centralized server, Worker functions run on Cloudflares Edge Network - a growing global network of thousands of machines distributed across hundreds of locations. Each of these machines hosts an instance of the Workers runtime, and each of those runtimes is capable of running thousands of user-defined apps. This guide will unpack some of those differences, and help you dig deeper into these differences.

We'll start with the three largest differences: Isolates, Compute per Request, and Distributed Execution

## Isolates

![process-vs-isolate](https://developers.cloudflare.com/workers/reference/media/isolates.png)

Isolates are a type in V8-- lightweight contexts that group variables with the code allowed to mutate them. You could even consider it a "sandbox" for your function to run in. Most importantly, a single process can run hundreds or thousands of isolates, seamlessly switching between them. This makes it possible to run untrusted or user-written code from many different customers within a single operating system process, without allowing the pieces of code to inadverantly or otherwise affect each other by not allowing them to access each other's memory. Isolates are also designed to start very quickly-- instead of creating a virtual machine for each function, an Isolate is created within an existing environment. This model eliminates the  cold starts of the virtual machine model.

Unlike other serverless providers, which use containerized processes each running an instance of a language runtime, Workers pays the overhead of a JavaScript runtime once on the start of an edge container, and then are able to run essentially limitless scripts with almost no individual overhead by creating an isolate for each Workers function call. Any given isolate can start around a hundred times faster than it takes to start a Node process to start on a container or virtual machine. Even more importantly, Isolates consume an order of magnitude less memory than the process of spinning up a container.

A given isolate has its own scope, but isolates are not necessarily long-lived. An isolate may be spun down and evicted for a number of reasons: 

* resource limitations on the machine
* a suspicious script-- anything seen as trying to break out of the Isolate sandbox
*  individual [resource limits](https://developers.cloudflare.com/workers/limits)

Because of this, it is generally advised that you not store mutable state in your global scope unless you have accounted for this contingency. You can learn more by reading [more about handling state](TODO: link)

If you're interested in how we handle security with the Workers runtime, you can [read more about how Isolates relate to Security and Spectre Threat Mitigation](https://developers.cloudflare.com/workers/how-it-works/security)

## Compute per Request

Most Worker functions, as you can see in our [templates](https://developers.cloudflare.com/workers/templates), are a variation on the default Worker flow:

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

The first code block sets an event listener for the [`fetch` Event](https://developers.cloudflare.com/workers/how-it-works/fetch-events), which is triggered on any HTTP(S) request to the URL where your code is [routed to](https://developers.cloudflare.com/workers/api/routes). Fetch Events typically complete with a call to `event.respondWith()`, which takes a [`Response` object](https://developers.cloudflare.com/workers/runtime/apis/fetch#response) as its argument.

When a request to your workers.dev subdomain, or to your Cloudflare-managed domain, is received by any of Cloudflare's data center machines, it is passed as an [`Request` object](https://developers.cloudflare.com/workers/how-it-works/request-context) argument to the event handler you have defined. From there you can compute a response on the spot, call through to another server using [`fetch()`](https://developers.cloudflare.com/workers/runtime/apis/fetch#response), or filter out unwanted requests and return an error response. **Your account is billed based on the number of requests your script handles, rather than on compute time.**

### Further Reading

* [More about FetchEvents](https://developers.cloudflare.com/workers/how-it-works/fetch-events)-- detailed 

* [More about the Service Worker Lifecycle](https://developers.cloudflare.com/workers/how-it-works/service-worker-lifecycle)

* [More about the Request Context](https://developers.cloudflare.com/workers/how-it-works/request-context)

* [More about Runtime Limitations](https://developers.cloudflare.com/workers/runtime/limits)

## Distributed Execution

Isolates are resilient and will continue to be available for the duration of a request, but when you hit our [limits](https://developers.cloudflare.com/workers/limits), or when resources are tight in the machine your code is running on, the runtime will selectively evict isolates once their events are properly resolved. TODO: When an isolate is evicted...

A single worker instance may handle multiple requests, including concurrent requests in a single-threaded event loop, like all other JavaScript platforms, but there's no guarantees whatsoever whether any two requests will land in the same instance. Because of this, it is inadvisable to set or mutate global state within the event handler. You can learn more by reading [more about handling state](TODO: link)

### Key Notes

- Your Worker function runs on the distributed network, not in a browser, and not in a central server.
- Your Worker function runs in its own isolate per location, spinning up and down based on traffic. there are several reasons it might spin down/be evicted, so be cautious with global scope
- Your Worker function is running on potentially hundreds of machines at any given time; there is no guarantee that any request will be handled by any given instance, even from the same IP.

## More Guides

[Understanding Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

[Signing Requests with the Web Crypto API](./signing-requests)

[Accessing the Cloudflare Cache](./accessing-cf-cache)

