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
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('Hello worker!', { status: 200 })
}
```

In your default `index.js` file, we can see that request/response pattern in action. The `handleRequest` constructs a new `Response` with the body text "Hello worker", as well as an explicit status code of 200.

When a `fetch` event comes into the worker, the script uses `event.respondWith` to return that new response back to the client. This means that your Cloudflare Worker script will serve new responses directly from Cloudflare's cloud network: instead of continuing to the origin, where a standard server would accept requests, and return responses, Cloudflare Workers allows you to respond quickly and efficiently by constructing responses directly on the edge.

## Build

1. Serve asset back from worker with correct content types, etc
2. Set caching rules based on rule (`/static`)

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const bucketName = 'my-bucket'
const bucketUrl = `http://storage.googleapis.com/${bucketName}`

async function handleRequest(request) {
  let response = await cache.match(request)
  if (!response) {
    const parsedUrl = new URL(request.url)
    const path = parsedUrl.pathname
    response = await fetch(`${bucketUrl}${path}`)
    if (path.includes('/static/')) {
      event.waitUntil(cache.put(event.request, response.clone()))
    }
  }
  return response
}
```

## Publish

And with that, you're finished writing the code for the QR code serverless function, on Cloudflare Workers!

Wrangler has built-in support for bundling, uploading, and releasing your Cloudflare Workers application. To do this, we'll first _build_ the code, and then _publish_ it:

```
wrangler build
wrangler publish
```

TODO Wrangler screenshot

## Resources

In this tutorial, you built and published a serverless function to Cloudflare Workers for generating QR codes. If you'd like to see the full source code for this application, visit the `cloudflare/cdn-assets-on-workers` repo on GitHub. TODO LINK

If you enjoyed this tutorial, we encourage you to explore our other tutorials for building on Cloudflare Workers:

- [Build a Slack bot](/build-an-application/tutorials/build-a-slack-bot)
- [Build a QR Code Generator](/build-a-serverless-function/tutorials/build-a-qr-code-generator)

If you want to get started building your own projects, check out the quick-start templates we've provided in our [Template Gallery](/reference/templates).

