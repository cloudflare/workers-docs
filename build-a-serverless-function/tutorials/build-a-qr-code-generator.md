# Build a QR Code Generator

In this tutorial, you'll build and publish a serverless function that generates QR codes, using Cloudflare Workers.

<video loop muted="true">
  <source src="../media/demo.webm" type="video/webm">
  <source src="../media/demo.mp4" type="video/mp4">
  Your browser doesn't support HTML5 video in WebM or MP4.
</video>

This tutorial makes use of [Wrangler](https://github.com/cloudflare/wrangler), our command-line tool for generating, building, and publishing projects on the Cloudflare Workers platform. If you haven't used Wrangler, we recommend checking out the [quick-start guide](../), which will get you set up with Wrangler, and familiar with the basic commands.

If you're interested in building and publishing serverless functions, this is the guide for you! No prior experience with serverless functions or Cloudflare Workers is assumed.

One more thing before you start the tutorial: if you just want to jump straight to the code, we've made the final version of the codebase [available on GitHub] TODO. You can take that code, customize it, and deploy it for use in your own projects. Happy coding!

## Prerequisites

To publish your QR Code Generator function to Cloudflare Workers, you'll need a few things:

- A Cloudflare account, and access to the API keys for that account
- A Wrangler installation running locally on your machine, and access to the command-line

If you don't have those things quite yet, don't worry. We'll walk through each of them and make sure we're ready to go, before you start creating your application.

You'll need to get your Cloudflare API keys to deploy code to Cloudflare Workers: see ["How to find your Cloudflare API Keys"](/reference/how-to-find-your-cloudflare-api-keys) for a brief guide on how to find them.

TODO: Wrangler install

## Generate

Cloudflare's command-line tool for managing Worker projects, Wrangler, has great support for templates – pre-built collections of code that make it easy to get started writing Workers. We'll make use of the default JavaScript template to start building your project.

In the command line, generate your Worker project, using Wrangler's [worker-template](https://github.com/cloudflare/worker-template), and pass the project name "qr-code-generator":

```
wrangler generate qr-code-generator https://github.com/cloudflare/worker-template
cd qr-code-generator
```

Wrangler templates are just Git repositories, so if you want to create your own templates, or use one from our [Template Gallery](/reference/templates), there's a ton of options to help you get started.

Cloudflare's `worker-template` includes support for building and deploying JavaScript-based projects. Inside of your new `qr-code-generator` directory, `index.js` represents the entry-point to your Cloudflare Workers application.

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

In your default `index.js` file, we can see that request/response pattern in action. The `handleRequest` constructs a new `Response` with the body text "Hello worker", as well as an explicit status code of 200. When a `fetch` event comes into the worker, the script uses `event.respondWith` to return that new response back to the client. This means that your Cloudflare Worker script will serve new responses directly from Cloudflare's cloud network: instead of continuing to the origin, where a standard server would accept requests, and return responses, Cloudflare Workers allows you to respond quickly and efficiently by constructing responses directly on the edge.

## Build

Any project you publish to Cloudflare Workers can make use of modern JS tooling like ES modules, NPM packages, and [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) functions to put together your application. In addition, simple serverless functions aren't the only thing you can publish on Cloudflare Workers: you can [build full applications] using the same tooling and process as what we'll be building today.

The QR code generator will be a function that runs at a single route and receives requests. Given text sent inside of that request (such as URLs or strings of your choice), the function will render a QR code and serve the QR code as a PNG response.

### Handling requests

Currently, our Workers function receives requests, and returns a simple response with the text "Hello worker!". To handle data coming _in_ to our serverless function, check if the incoming request is a `POST`:

```javascript
async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = new Response('Hello worker!', { status: 200 })
  }
  return response
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

Currently, if an incoming request isn't a POST, `response` will be undefined. Since we only care about incoming `POST` requests, populate `response` with a new instance of `Response` with a [500 status code](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500>), if the incoming request isn't a `POST`:

```javascript
async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = new Response('Hello worker!', { status: 200 })
  } else {
    response = new Response('Expected POST', { status: 500 })
  }
  return response
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

With the basic flow of `handleRequest` established, it's time to think about how to handle incoming *valid* requests: if a `POST` request comes in, the function should generate a QR code. To start, move the "Hello worker!" response into a new function, `generate`, which will contain the bulk of our function's logic:

```javascript
const generate = async request => {
  return new Response('Hello worker!', { status: 200 })
}

async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = await generate(request)
  } else {
    response = new Response('Expected POST', { status: 500 })
  }
  return response
}
```

### Building a QR Code

All projects deployed to Cloudflare Workers support NPM packages, which makes it incredibly easy to rapidly build out _a lot_ of functionality in your serverless functions. The [`qr-image`](<https://github.com/alexeyten/qr-image>) package is a great way to take text and encode it into a QR code, with support for generating the codes in a number of file formats (such as PNG, the default, and SVG) and configuring other aspects of the code's image. In the command-line, install and save `qr-image` to your project's `package.json`:

```
npm install --save qr-image
```

In `index.js`, require the `qr-image` package as the variable `qr`. In the `generate` function, parse the incoming request as JSON, using `request.json`, and use the `text` to generate a QR code using `qr.imageSync`:

```javascript
const qr = require('qr-image')

const generate = async request => {
  const body = await request.json()
  const text = body.text
  const qr_png = qr.imageSync(text || 'https://workers.dev')
}
```

By default, the QR code is generated as a PNG. Construct a new instance of `Response`, passing in the PNG data as the body, and a `Content-Type` header of `image/png`: this will allow browsers to properly parse the data coming back from your serverless function as an image:

```javascript
const qr = require('qr-image')

const generate = async request => {
  const { text } = await request.json()
  const qr_png = qr.imageSync(text || 'https://workers.dev')
  const headers = { 'Content-Type': 'image/png' }
  return new Response(qr_png, { headers })
}
```

With the `generate` function filled out, we can simply wait for the generation to finish in `handleRequest`, and return it to the client as `response`:

```javascript
async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = await generate(request)
  } else {
    response = new Response('Expected POST', { status: 500 })
  }
  return response
}
```

With that, your serverless function is complete! The full version of the code looks like this:

```javascript
const qr = require('qr-image')

const generate = async request => {
  const { text } = await request.json()
  const headers = { 'Content-Type': 'image/png' }
  const qr_png = qr.imageSync(text || 'https://workers.dev')
  return new Response(qr_png, { headers })
}

async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = await generate(request)
  } else {
    response = new Response('Expected POST', { status: 500 })
  }
  return response
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

## Publish

And with that, you're finished writing the code for the QR code serverless function, on Cloudflare Workers!

Wrangler has built-in support for bundling, uploading, and releasing your Cloudflare Workers application. To do this, we'll first _build_ the code, and then _publish_ it:

```
wrangler build
wrangler publish
```

TODO Wrangler screenshot

With your serverless function deployed, a simple cURL request is a great way to test the functionality of the function. By sending an HTTP `POST` with JSON-formatted data to our published Workers function, we can get QR code data back, and write to the file `qr.png`:

```
curl -d '{"text":"https://workers.dev"}' -H "Content-Type: application/json" -X POST https://qr.signalnerve.com > qr.png
```

If you're unfamiliar with the command-line, or want to test it in a user interface, we've built a [live demo](https://qr.signalnervecom) (TODO this should go somewhere else) to test the function (find the source [here](https://github.com/signalnerve/qr-generator-landing)):

<video loop muted="true">
  <source src="../media/demo.webm" type="video/webm">
  <source src="../media/demo.mp4" type="video/mp4">
  Your browser doesn't support HTML5 video in WebM or MP4.
</video>

## Resources

In this tutorial, you built and published a Cloudflare Workers serverless function for generating QR codes. If you'd like to see the full source code for this application, visit the `cloudflare/slack-bot-on-workers` repo on GitHub. TODO LINK

If you enjoyed this tutorial, we encourage you to explore our other tutorials for building on Cloudflare Workers:

[Build a Slack bot] TODO LINK

If you want to get started building your own projects, check out the quick-start templates we've provided in our [Template Gallery]. TODO LINK