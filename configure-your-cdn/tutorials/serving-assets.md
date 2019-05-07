# Serving Assets Using Cloudflare Workers

In this tutorial, you'll build and publish a Cloudflare Workers function that serves assets from a storage platform (in this example, Google Cloud Storage) to your users. This approach, called "white-labelling", often takes the form of complex DNS configuration – thanks to Cloudflare Workers, and Cloudflare's CDN network, we can build a powerful (and fast) solution to this problem in just a few lines of code.

TODO IMG

This tutorial makes use of [Wrangler](https://github.com/cloudflare/wrangler), our command-line tool for generating, building, and publishing projects on the Cloudflare Workers platform. If you haven't used Wrangler, we recommend checking out the [quick-start guide](../), which will get you set up with Wrangler, and familiar with the basic commands.

If you're interested in building and publishing a Cloudflare Workers function to configure your CDN, this is the guide for you! No prior experience with serverless functions or Cloudflare Workers is assumed.

One more thing before you start the tutorial: if you just want to jump straight to the code, we've made the final version of the codebase [available on GitHub] TODO. You can take that code, customize it, and deploy it for use in your own projects. Happy coding!

## Prerequisites

To publish your project to Cloudflare Workers, you'll need a few things:

- A Cloudflare account, and access to the API keys for that account
- A Wrangler installation running locally on your machine, and access to the command-line

If you don't have those things quite yet, don't worry. We'll walk through each of them and make sure we're ready to go, before you start creating your application.

You'll need to get your Cloudflare API keys to deploy code to Cloudflare Workers: see ["How to find your Cloudflare API Keys"](/reference/how-to-find-your-cloudflare-api-keys) for a brief guide on how to find them.

TODO: Wrangler install

In addition to your Cloudflare configuration, this tutorial assumes that you have a *public* bucket on Google Cloud Storage, which you'll use to serve assets through your Cloudflare Workers function. If you don't have a Google Cloud Storage bucket to use with this project, we recommend going through Google Cloud's "Cloud Storage Quickstart" guide, which can be found [here](https://cloud.google.com/storage/docs/quickstart-console).

This tutorial makes use of sample images to illustrate serving data through your Cloudflare Workers function. If you have an existing set of images you'd like to use, you can upload those to your Google Cloud Storage bucket and use them – if you don't have an existing set of images, we've provided a sample set of profile pictures via [UIFaces.com](http://uifaces.com/), formatted in numeric order (`1.jpg`, `2.jpg`, … `199.jpg`). 

To follow along with this tutorial, using the data set we've provided, download the sample image collection [here] TODO, and upload the zipped folder "faces" to root of your bucket. The directory structure should look like this:

```
your-bucket
|- faces
   |- 1.jpg
   |- 2.jpg
   |- ...
   |- 199.jpg
```

Finally, to ensure that you can access the objects from your Worker, your Google Cloud Storage bucket should be publicly accessible. To ensure this, follow the "Making groups of objects publicly readable" guide in the Google Cloud Storage docs, which can be found [here](https://cloud.google.com/storage/docs/access-control/making-data-public#buckets).

## Generate

Cloudflare's command-line tool for managing Worker projects, Wrangler, has great support for templates – pre-built collections of code that make it easy to get started writing Workers. We'll make use of the default JavaScript template to start building your project.

In the command line, generate your Worker project, using Wrangler's [worker-template](https://github.com/cloudflare/worker-template), and pass the project name "qr-code-generator":

```
wrangler generate serve-cdn-assets https://github.com/cloudflare/worker-template
cd serve-cdn-assets
```

Wrangler templates are just Git repositories, so if you want to create your own templates, or use one from our [Template Gallery](/reference/templates), there's a ton of options to help you get started.

Cloudflare's `worker-template` includes support for building and deploying JavaScript-based projects. Inside of your new `serve-cdn-assets` directory, `index.js` represents the entry-point to your Cloudflare Workers application.

All Cloudflare Workers applications start by listening for `fetch` events, which are fired when a client makes a request to a Workers route. When that request occurs, you can construct responses and return them to the user. This tutorial will walk you through understanding how the request/response pattern works, and how we can use it to build fully-featured applications.

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(event) {
  return new Response('Hello worker!', { status: 200 })
}
```

In your default `index.js` file, we can see that request/response pattern in action. The `handleRequest` constructs a new `Response` with the body text "Hello worker", as well as an explicit status code of 200.

When a `fetch` event comes into the worker, the script uses `event.respondWith` to return that new response back to the client. This means that your Cloudflare Worker script will serve new responses directly from Cloudflare's cloud network: instead of continuing to the origin, where a standard server would accept requests, and return responses, Cloudflare Workers allows you to respond quickly and efficiently by constructing responses directly on the edge.

## Build

Any project you publish to Cloudflare Workers can make use of modern JS tooling like ES modules, NPM packages, and [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) functions to put together your application. In addition, simple serverless functions aren't the only thing you can publish on Cloudflare Workers: you can [build full applications](/build-an-application) using the same tooling and process as what we'll be building today.

The Cloudflare Workers project built in this tutorial will be a serverless function that runs on a *wildcard* route and receives requests. When the serverless function receives an incoming request, it should parse the URL, find what asset is being requested, and serve it from the configured Cloud Storage bucket. Because the asset will go through your Workers function, and through Cloudflare's network, you can also make use of both Cloudflare's *default* caching behavior, as well as your own custom logic, to ensure that as much data can be cached at Cloudflare's globally distributed data centers – the result is an easy-to-understand and highly performant CDN configuration, with the ability to customize it to your application's specific needs.

### Handling requests

Currently, the Workers function receives requests, and returns a simple response with the text "Hello worker!". Begin configuring the function by adding an additional check: requests coming in to the function should **only** be `GET` requests: if it receives other requests, like `POST`s or `DELETE`s, it should return an error response, with a status code of [405](https://httpstatuses.com/405):

```javascript
async function handleRequest(event) {
  const request = event.request
  if (request.method === 'GET') {
    return new Response('Hello worker!', { status: 200 })
  } else {
    return new Response('Method not allowed', { status: 405 })
  }
}
```

Given that the incoming request to the function *is* a `GET`, it should be clear that the bulk of our implementation will happen inside of that conditional, replacing the "Hello worker!" response. Create a separate function, `serveAsset`, which will house the majority of the implementation for the remainder of the tutorial:

```javascript
async function serveAsset(event) {
  const request = event.request
  return new Response('Hello worker!', { status: 200 })
}

async function handleRequest(event) {
  const request = event.request
  if (request.method === 'GET') {
    return serveAsset(event)
  } // ...
}
```

### Routing to your assets

Looking back at the original definition of this project, at the beginning of the "Build" section, the `serveAsset` function should parse the URL, find what asset is being requested, and serve it from the configured Cloud Storage bucket. To do this, the `request.url` field should be parsed using the `URL` library, and set to `url`. Given an instance of the `URL` class, `url`, there are a number of useful properties that can be used to query the incoming request. `serveAsset` should check the `pathname`, which contains the part of the URL _after_ the `host`: for instance, given the URL `https://assets.mysite.com/faces/1.jpg`, the pathname will be `/faces/1.jpg`:

```javascript
function serveAsset(event) {
  const request = event.request
  const url = new URL(request)
  const path = url.pathname
}
```

With that `path` available, the function can simply request the corresponding path from our Cloud Storage bucket. Given a bucket name of "my-bucket", construct a `bucketUrl`, append the asset `path` to the end of it, and `fetch` it to get your function's `response`:

```javascript
const bucketName = 'my-bucket'
const bucketUrl = `http://storage.googleapis.com/${bucketName}`

function serveAsset(event) {
  const request = event.request
  const url = new URL(request.url)
  const path = url.pathname
  return fetch(`${bucketUrl}${path}`)
}
```

### Custom caching

At this point in the tutorial, deploying this script would give you a fully-functional project you could use to retrieve assets from your Cloud Storage bucket. Instead of wrapping up the tutorial here, let's continue to explore how configuring your CDN is really powerful with Workers, by making use of the [Cache API] LINK TODO.

Cloudflare caches many resources by default: many common file types, like JPEG, PNG, and GIF (for the full list, see our Knowledge Base article: ["Which file extensions does Cloudflare cache for static content?"](https://support.cloudflare.com/hc/en-us/articles/200172516-What-file-extensions-does-CloudFlare-cache-for-static-content-)) For files that _aren't_ on that list, or in situations where you need more granular caching, the Cache API makes it simple for developers to build their own caching systems.

In this tutorial, we'll assume the existence of the `/static/` folder in a Cloud Storage bucket: this folder represents a collection of files that should be aggressively cached. Because they rarely change, the `handleRequest` function can be updated to check for `/static/` in the `path`: 

- If the `path` _does_ contain `/static/`, the code will check for an existing cached version of the asset, using the Cache API. If the asset isn't cached, the script should request the asset, cache it, and return it to the client.
- If the `path` _doesn't_ contain `/static/`, the script should simply request the asset and pass it back to the client – this is how the script is currently set up.

As indicated by the above logic, write an if/else statement to check for the presence of `/static/` inside of `path`, using `includes`. If the path _does_ contain `/static/`, set the variable `cache` to `caches.default`: the default cache implemented by the Workers runtime. With that `cache` in place, use the `match` function, passing in `request`, to see if an existing cached `response` exists. The `else` statement will contain the original code for `handleRequest` (`fetch(bucketUrl + path)`):

```javascript
// Note that this function has been updated to an _async_ function
async function serveAsset(event) {
  // ...
  
  let response
  if (path.includes('/static/')) {
    const cache = caches.default
    response = cache.match(request)
  } else {
    // ...
    response = await fetch(`${bucketUrl}${path}`)
  }
  return response
}
```

Of course, a cached response _may_ exist, but if it doesn't, we should request the asset, cache it, and then return it as the response. Use `cache.put`, passing in `request` and a _cloned_ version of `response`, to cache the `response` for future requests. Note the usage of `response.clone()`, to push a response into our cache, without processing the body or any other parts of the `response` – for more information on this requirement, check out the [Cache API documentation] TODO. With this rewrite, the final version of `serveAsset` looks like this:

```javascript
async function serveAsset(event) {
  const request = event.request
	const url = new URL(request.url)
  const path = url.pathname
  
  let response
  if (path.includes('/static/')) {
    const cache = caches.default
    response = await cache.match(request)
    if (!response) {
      response = await fetch(`${bucketUrl}${path}`)
      event.waitUntil(cache.put(request, response.clone()))
    }
  } else {
    response = await fetch(`${bucketUrl}${path}`)
  }
  return response
}
```

Before building and publishing your Workers script, there's one more thing to be added. Currently, if an asset is requested that doesn't exist, or if your bucket policy doesn't include access to an asset publicly, `serveAsset` will pass back the corresponding error page directly to the client. Instead of doing this, the returned response should be checked in `handleRequest`: if the status code is higher than `299` (where 200-level status codes indicate "success"), we can return a truncated `response` with just the `status` and `statusText` from response:

```javascript
async function handleRequest(event) {
  const request = event.request
  if (request.method === 'GET') {
    let response = await serveAsset(event)
    if (response.status > 299) {
      response = new Response(response.statusText, { status: response.status })
    }
    return response
  } else {
    return new Response('Method not allowed', { status: 405 })
  }
}
```

And with that, you're finished writing the code for this tutorial! The final version of your script should like this:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

const bucketName = 'my-bucket'
const bucketUrl = `http://storage.googleapis.com/${bucketName}`

async function serveAsset(event) {
  const request = event.request
	const url = new URL(request.url)
  const path = url.pathname
  
  let response
  if (path.includes('/static/')) {
    const cache = caches.default
    response = await cache.match(request)
    if (!response) {
      response = await fetch(`${bucketUrl}${path}`)
      event.waitUntil(cache.put(request, response.clone()))
    }
  } else {
    response = await fetch(`${bucketUrl}${path}`)
  }
  return response
}

async function handleRequest(event) {
  const request = event.request
  if (request.method === 'GET') {
    const response = await serveAsset(event)
    if (response.status > 299) {
      return new Response(response.statusText, { status: response.status })
    } else {
      return response
    }
  } else {
    return new Response('Method not allowed', { status: 405 })
  }
}
```

## Publish

To make this script available for use, you'll need to build and publish it to Cloudflare using Wrangler. To do this, we'll first _build_ the code, and then _publish_ it:

```
wrangler build
wrangler publish
```

TODO Wrangler screenshot

## Resources

In this tutorial, you built and published a serverless function to Cloudflare Workers for serving assets from cloud storage. If you'd like to see the full source code for this application, visit the `cloudflare/cdn-assets-on-workers` repo on GitHub. TODO LINK

If you enjoyed this tutorial, we encourage you to explore our other tutorials for building on Cloudflare Workers:

- [Build a Slack bot](/build-an-application/tutorials/build-a-slack-bot)
- [Build a QR Code Generator](/build-a-serverless-function/tutorials/build-a-qr-code-generator)

If you want to get started building your own projects, check out the quick-start templates we've provided in our [Template Gallery](/reference/templates).

