---
title: 'Transforming Apps with HTMLRewriter'
---

The `HTMLRewriter` class built into the Cloudflare Workers runtime allows for parsing and rewriting of HTML at the edge, giving developers the ability to efficiently and transparently customize their Workers applications. In this tutorial, we'll build an _internationalization_ engine (commonly referred to as `i18n`) for your application, automatically translating the content of your site depending on where your visitors are in the world.

[![Demo Image](/tutorials/transforming-apps-using-htmlrewriter/i18n.jpg)](https://i18n-example.signalnerve.com)

This tutorial makes use of [Wrangler](https://github.com/cloudflare/wrangler), our command-line tool for generating, building, and publishing projects on the Cloudflare Workers platform. If you haven't used Wrangler, we recommend checking out the ["Installing the CLI"](/quickstart/cli-setup) part of our [Quick Start guide](/quickstart), which will get you set up with Wrangler, and familiar with the basic commands.

One more thing before you start the tutorial: if you just want to jump straight to the code, we've made the final version of the codebase [available on GitHub](https://github.com/signalnerve/edge-i18n). You can take that code, customize it, and deploy it for use in your own projects. Happy coding!

## Prerequisites

To publish your project to Cloudflare Workers, you'll need a few things:

- A Cloudflare account, and access to the API keys for that account
- A Wrangler installation running locally on your machine, and access to the command-line

If you don't have those things quite yet, don't worry. We'll walk through each of them and make sure we're ready to go, before you start creating your application.

This tutorial is designed to be built using a prior application – I'll use `i18n-example.signalnerve.com` – we'll overlay an i18n layer over top of that site, by deploying a Workers application in front of that site. If you'd like to deploy your own version of the site, you can find the source here **TODO**. Instructions on how to deploy this application can be found in the project's README.

## Generate a project

Cloudflare's command-line tool for managing Worker projects, Wrangler, has great support for templates – pre-built collections of code that make it easy to get started writing Workers. We'll make use of the [default template](https://github.com/cloudflare/worker-template) to start building your project.

In the command line, generate your Workers project, and pass the project name `i18n-example`:

```sh
$ wrangler generate i18n-example
$ cd i18n-example
```

Wrangler templates are just Git repositories, so if you want to create your own templates, or use one from our [Template Gallery](/templates), there's a ton of options to help you get started.

The default Workers template includes support for building and deploying JavaScript-based projects. Inside of your new `i18n-example` directory, `index.js` represents the entry-point to your Cloudflare Workers application.

All Cloudflare Workers applications start by listening for `fetch` events, which are fired when a client makes a request to a Workers route:

```js
// index.js
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

In your default `index.js` file, we can see that request/response pattern in action. The `handleRequest` constructs a new `Response` with the body text "Hello worker", as well as an explicit status code of 200. When a `fetch` event comes into the worker, the script uses `event.respondWith` to return that new response back to the client.

In our project, we'll use the `fetch` function to make requests to our origin – the site that we want to serve back to the user – and pass it through the `HTMLRewriter` class to make transformations to the HTML before the user receives it.

## How it works

The `HTMLRewriter` class provided in the Workers runtime allows developers to parse HTML and write simple JavaScript to query and transform every element of the page.

In our example (find the source HERE TODO TODO, we have a basic single-page website. There are a number of clear pieces of text: an `h1` element, with the text "Example Site", and a number of `p` elements with different text:

![Demo Code](/tutorials/transforming-apps-using-htmlrewriter/code-example.png)

What is unique about this page is the addition of [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) in the HTML – custom attributes defined on a number of elements on this page. The `data-i18n-key` on the `h1` tag on this page, as well as many of the `p` tags, indicates that there is a corresponding internationalization key, which should be used to look up a translation for this text:

```html
<!-- source clipped from i18n-example site -->

<div class="inner">
  <h1 data-i18n-key="headline">Example Site</h1>
  <p data-i18n-key="subtitle">
    This is my example site. Depending o...
  </p>
  <p data-i18n-key="disclaimer">
    Disclaimer: the initial translations...
  </p>
</div>
```

Using `HTMLRewriter`, we'll take this page and parse the HTML. When we find a `data-i18n-key`, we'll look up an internal `strings` object, using `data-i18n-key` to find a matching key, and retrieve the string translation. With `HTMLRewriter`, it's super easy to _query_ elements, for instance, to find a data attribute, but as the name suggests, we can also _rewrite_ elements: taking a translated string and directly inserting it into the HTML.

Finally, it's shockingly easy to introduce one more cool feature into this project: based on the `Accept-Language` header, which exists on incoming requests, we can set the translation language per-request, allowing users from around the world to see a locally-relevant and translated page. Neat!

## Using the HTML Rewriter

To start, let's look back into `index.js`: our Workers application in this tutorial will live entirely in this file, so it's important to be familiar with it.

As mentioned in the "Generate a project" section, the default template used by Wrangler will return a new `Response`, allowing you to serve custom responses directly from Cloudflare's edge servers. In `index.js`, we should change that behavior, instead using `fetch` to continue the original request, and assigning it to `response`:

```js
// index.js

async function handleRequest(request) {
  const response = await fetch(request)
  return response
}
```

With `response` available, we can construct a new instance of `HTMLRewriter`, and use it to parse the response. When instantiating `HTMLRewriter`, we can also attach handlers using the `on` function: in our case, we'll use the `*` selector (see the documentation for more advanced usage) to parse all elements with a single class, `ElementHandler` . With the created instance of `HTMLRewriter`, the `transform` function takes a `response`, and can be returned to the client:

```js
// index.js

async function handleRequest(request) {
  const response = await fetch(request)
  return new HTMLRewriter().on('*', new ElementHandler()).transform(response)
}
```

## Transforming HTML

Our `ElementHandler` will receive every element parsed by the `HTMLRewriter` instance, and thanks to the expressive API, it's really easy to query each incoming element for information.

In "How it works", I showed the usage of `data-i18n-key`, a custom data attribute that could be used to find a corresponding translated string for the website's user interface. In `ElementHandler`, we can define an `element` function, which will be called as each element is parsed. Inside of it, we can query for the custom data attribute using `getAttribute`:

```js
class ElementHandler {
  element(element) {
    const i18nKey = element.getAttribute('data-i18n-key')
  }
}
```

With `i18nKey` defined, we can use it to lookup a corresponding translated string. Let's set up `strings`, an object with key-value pairs corresponding to the `data-i18n-key` value – for now, I'll define a single example string, `headline`, with a (possibly badly translated) German `string`, "Beispielseite" ("Example Site"), and retrieve it in the `element` function:

```js
const strings = {
  headline: 'Beispielseite',
}

class ElementHandler {
  element(element) {
    const i18nKey = element.getAttribute('data-i18n-key')
    const string = strings[i18nKey]
  }
}
```

With our translated `string`, we can take it and insert it into the original element, using the `setInnerContent` function:

```js
const strings = {
  headline: 'Beispielseite',
}

class ElementHandler {
  element(element) {
    const i18nKey = element.getAttribute('data-i18n-key')
    const string = strings[i18nKey]
    if (string) {
      element.setInnerContent(string)
    }
  }
}
```

To check that everything looks like you'd expect, it could be a good time to use the preview functionality built into Wrangler. Call `wrangler preview --watch` to open up a live preview of your project, refreshed after every code change that you make.

We can expand on this simple translation functionality to provide country-specific translations, based on the incoming request's `Accept-Language` header. By taking this header, parsing it, and passing the parsed language into our `ElementHandler`, we can retrieve a translated string in our user's home language, provided that it's defined in `strings`.

To implement this, we'll update the `strings` object, adding a second layer of key-value pairs, and allowing strings to be looked up in the format `strings[country][key]`. In addition, we'll pass a `countryStrings` object into our `ElementHandler`, so that it can be used during the parsing process. Finally, we'll grab the `Accept-Language` header from an incoming request, parse it, and pass the parsed language to `ElementHandler`.

To parse the `Accept-Language` header, we'll install the [`accept-language-parser`](https://www.npmjs.com/package/accept-language-parser) NPM package:

```sh
npm i accept-language-parser
```

Once imported into our code, we can use it to parse the most relevant language for a client based on `Accept-Language` header, and pass it to `ElementHandler`. Our final code for the project, with an included sample translation for Germany (using Google Translate) looks like this:

```js
import parser from 'accept-language-parser'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const strings = {
  de: {
    title: 'Beispielseite',
    headline: 'Beispielseite',
    subtitle:
      'Dies ist meine Beispielseite. Abhängig davon, wo auf der Welt Sie diese Site besuchen, wird dieser Text in die entsprechende Sprache übersetzt.',
    disclaimer:
      'Haftungsausschluss: Die anfänglichen Übersetzungen stammen von Google Translate, daher sind sie möglicherweise nicht perfekt!',
    tutorial: 'Das Tutorial für dieses Projekt finden Sie in der Cloudflare Workers-Dokumentation.',
    copyright: 'Design von HTML5 UP.',
  },
}

class ElementHandler {
  constructor(countryStrings) {
    this.countryStrings = countryStrings
  }

  element(element) {
    const i18nKey = element.getAttribute('data-i18n-key')
    if (i18nKey) {
      const translation = this.countryStrings && this.countryStrings[i18nKey]
      if (translation) {
        element.setInnerContent(translation)
      }
    }
  }
}

async function handleRequest(request) {
  const languageHeader = request.headers.get('Accept-Language')
  const language = parser.pick(['de'], languageHeader)
  const countryStrings = strings[language]

  const response = await fetch(request)

  return new HTMLRewriter()
    .on('*', new ElementHandler(countryStrings))
    .transform(response)
}
```

## Publish

Our simple i18n tool built on Cloudflare Workers is complete, and it's time to deploy it to your domain! This tutorial assumes that you already have a domain hosted on Cloudflare – check out ["Getting Started with Cloudflare"](https://support.cloudflare.com/hc/en-us/articles/360027989951-Getting-Started-with-Cloudflare) for instructions, if you need to add a domain. Note that the example website, pictured below, is open-source, if you don't have an existing site you'd like to test with:

[![Demo Image](/tutorials/transforming-apps-using-htmlrewriter/i18n.jpg)](https://i18n-example.signalnerve.com)

With a configured zone, add your Cloudflare account and zone IDs to your project's `wrangler.toml`. If you need help finding your account and zone ID, check out the ["Configure" section](https://developers.cloudflare.com/workers/quickstart/#account-id-and-zone-id) of our Quick Start! In addition to `account_id` and `zone_id`, you need to define a `route`, which tells Workers where you'd like your application to run on your site. For instance, if my website is at `i18n-example.signalnerve.com`, I'll choose `i18n-example.signalnerve.com/*`, indicating that I'd like the Workers application to run over top of my _entire_ application, matching every possible route:

```toml
# wrangler.toml

# ...
name = "i18n-example"
account_id = "accountid123"
zone_id = "zoneid123"
route = "https://i18n-example.signalnerve.com/*"
# ...
```

Congrats, it's time to publish your application! Using `wrangler`, we can publish to Cloudflare's entire network almost instantly, using the `publish` command, passing in `--release` to deploy it to our configured zone:

```sh
$ wrangler publish --release
```

## Resources

In this tutorial, you built and published an i18n tool using `HTMLRewriter`. If you'd like to see the full source code for this application, visit the [repo on GitHub](https://github.com/signalnerve/edge-i18n).

If you want to get started building your own projects, check out the quick-start templates we've provided in our [Template Gallery](/templates).
