---
title: Glossary
---

## Runtime

The Workers Runtime is the environment in which your code runs on Cloudflare's Edge Network. Each machine in the network runs its own instance of the runtime, and each runtime instance manages many isolated environments, each of which contains a single app handling requests for that machine. Read more about [How Workers Work](TODO: link to reference overview).

## Script

A script is the bundle of the JavaScript code that makes up the logic of your app, as well as the Bindings that should ship with it.

## Bindings

[Bindings](TODO: Link to object specification) define the resources - for example, WebAssembly modules - that should be made available from within your app. These are specified as part of the payload when you [upload an app](TODO: script upload endpoint spec).

## Publish

You can upload app code and bindings as drafts, but in order for them to be served they need to be published. In the context of workers.dev, you can set your app to be [available on your subdomain](TODO: link to available on subdomain endpoint). For apps configured on a custom domain, you can set up [routes](TODO: route API spec), the simplest of which is a catchall pattern `/*`.

## Event

Workers scripts adhere to the Service Worker API, and are triggered as a handler on a [FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent).
