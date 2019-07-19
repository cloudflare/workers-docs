---
title: "Build an Emscripten Function"
weight: 3
---

This tutorial will walk you through the steps of generating, building, previewing, configuring, and publishing
a Emscripten-generated WebAssembly serverless function for Cloudflare Workers. Emscripten expects a browser or node.js environment, so there are some specific configuration options you must use in order for it to play nicely with Workers. If you have the ability to choose, the Rust + WASM experience is more platform-agnostic and provides a better developer experience.

This tutorial makes use of [Wrangler](https://github.com/cloudflare/wrangler), our command-line tool for generating, building, and publishing projects on the Cloudflare Workers platform. If you haven't used Wrangler, we recommend checking out the ["Installing the CLI"](/quickstart/cli-setup) part of our [Quick Start guide](/quickstart), which will get you set up with Wrangler, and familiar with the basic commands. Wrangler was recently updated to 1.1.0 to support some of the things in this tutorial, so make sure you have at least that
version installed.

## Generate

Cloudflare's command-line tool for managing Workers projects, Wrangler, has great support for templates – pre-built collections of code that make it easy to get started writing Workers. We'll make use of the [emscripten-worker template](https://github.com/cloudflare/emscripten-worker-template/) to start building your project.

In the command line, generate your Workers project by passing in a project name (we'll use emscripten-worker), and the template URL to base your project on.

```sh
wrangler generate emscripten-worker https://github.com/cloudflare/emscripten-worker-template/
```

This creates a directory called `rustwasm-markdown-parser` which you can now `cd` into.

Wrangler templates are just Git repositories, so if you want to create your own templates, or use one from our [Template Gallery](/templates), there's a ton of options to help you get started.

## Workers Playground

You can test how your Workers function will look when it's deployed by using the preview service, which you can access with the `preview` command:

```sh
wrangler preview
```

Using the preview command will open a browser window with your Cloudflare Workers function loaded in the Cloudflare preview
UI. Assuming everything went well, it should look like this:

![Cloudflare UI with working Emscripten Worker](/tutorials/build-a-rustwasm-function/media/emscripten0.png)

## Building

Let's make our Workers function more interesting. Lets use [some internet C library] and [add it as a dependency].

Now we'll leverage the code in the [example] from the [GitHub repository]. Let's change
our `src/main.c` to look like this:

```c
```

Now we'll update our `index.js` to use the new code we've written:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
}
```

Whenever we `preview` or `publish`, `wrangler` will build our project. But if you just want to `build` and not
`preview` or `publish`, you can run the `build` command:

```sh
wrangler build
```

This will compile your C to WebAssembly, with emscripten. It'll show you any compiler errors you have so you can fix them!
To preview this code in the Cloudflare UI, you can run:

```sh
wrangler preview
```

If everything worked, you should see:

![Cloudflare UI with working Emscripten Worker](/tutorials/build-a-rustwasm-function/media/rustwasm1.png)

## Publish

And with that, you're finished writing a Cloudflare Workers function with Emscripten-generated WASM!

Wrangler has built-in support for bundling, uploading, and releasing your Cloudflare Workers application. To do this, we'll run `wrangler publish`, which will _build_ and _publish_ your code:

![Publish](/tutorials/build-a-rustwasm-function/media/publish.gif)

## Resources

In this tutorial, you built and published a Rust-generated WebAssembly serverless function that parses Markdown. If you'd like to see the full source code for this application, you can find it [on GitHub](https://github.com/granjef3/rustwasm-markdown-parser).

If you enjoyed this tutorial, we encourage you to explore our other tutorials for building on Cloudflare Workers:

- [Build A Serverless Function](/tutorials/build-a-serverless-function)
- [Build An Application](/tutorials/build-an-application)
- [Configure Your CDN](/tutorials/configure-your-cdn)

If you want to get started building your own projects, check out the quick-start templates we've provided in our [Template Gallery](/templates).
