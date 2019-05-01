# Build a QR Code Generator

In this tutorial, you'll build and publish a serverless function that generates QR codes, using Cloudflare Workers.

TODO: img

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

- Take in input

### Building a QR Code

- Import qr-image
- Return image

## Publish

- Publish
- Test using CURL
- Deploy a landing page for testing

## Resources

In this tutorial, you built and published a Cloudflare Workers serverless function for generating QR codes. If you'd like to see the full source code for this application, visit the `cloudflare/slack-bot-on-workers` repo on GitHub. TODO LINK

If you enjoyed this tutorial, we encourage you to explore our other tutorials for building on Cloudflare Workers:

[Build a Slack bot] TODO LINK

If you want to get started building your own projects, check out the quick-start templates we've provided in our [Template Gallery]. TODO LINK