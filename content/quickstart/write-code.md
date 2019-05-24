---
title: Write Code
weight: 1
---

Here are the barebones to get any script up and running. Once you have an environment setup either with [the CLI](/quickstart/cli-setup) or [the Playground](/reference/tooling/playground), you are ready to start writing scripts.

## Hello World 

HTTP requests to your Worker script trigger a [`FetchEvent`](/reference/runtime/apis/fetch/) - `'fetch'` - within the global scope of the registered Worker. To intercept and respond to any request using a Worker, one must set up:

1. An event listener for the fetch `addEventListener('fetch', event => {...})`. This tells the script to listen for any request coming to your Worker. `event.request` - type [`Request`](/runtime/apis/fetch#request) - is the actual HTTP request being intercepted by the Worker script.

2. A call to `respondWith` with the parameter of either a [`Response`](/reference/runtime/apis/fetch/#response) or `Promise<Response>` that determines the response. For advanced usage, you can also use [passThroughOnException](/reference/runtime/apis/fetch-event#methods) and [waitUntil](/reference/runtime/apis/fetch-event#methods). 

   *Note: If you do not include this call and your script encounters an uncaught exception while processing a request, the response will result in a runtime error at the edge.*

An uber simple hello-world example would look like:

```javascript
// 1. Register a FetchEvent listener that sends a custom
//    response for the given request.
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 2. Fetch and return a given request object
async function handleRequest(request) {
  new Response("hello world")
}
```
## Directing Requests

Now that we have a very basic script running on all requests, how can we filter requests to reach certain handlers? There are a few options:

##### Basic: manually filter the requests with booleans

Filter with simple `if` statements/other boolean statements, based on the `event.request` to generate the response.

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

##### Template: use a template for routing on URL

Use the following command to use your routing logic on the 

```javascript
wrangler generate myApp https://github.com/cloudflare/worker-template-router
```
Now, you can toy with the templates' `get`, `post`, etc.. methods to setup routes. All the source code for the router logic is included in the template to fit the needs of your app.

## Templates

To discover what you can build or if you know vaguely, there are a variety of examples at the [Template Gallery](/templates/).

## Advanced

The [hello world worker script](/quickstart/write-code#hello-world) demonstrates a direct way to get started. There are many more [available APIs](/reference/runtime/apis) to manipulate intercepted requests. For example, you can retrieve data from [Cache](/reference/runtime/apis/cache), compute a custom response right from the edge, route the request to the appropriate service, filter traffic, and more.

For gotchas and concepts to keep in mind while writing scripts see: [Workers Concepts](/reference/workers-concepts).