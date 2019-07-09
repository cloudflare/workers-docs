[TOC]

# Introduction

TODO: for now this is a guide for just Cloudflare to internally contribute templates.

People like yourself being willing to share code with others that use our platform is what makes a free serverless platform like Cloudflare Workers possible. So, thank you!

Following these guidelines helps to keep our templates consistent and deliver the best developer experience for those using them. Cloudflare developer experience team maintains the template gallery. (..add more..?)

There are several ways to contribute to the Cloudflare Workers platform. The template gallery is focussed on streamlining the contribution of templates. When a template makes it through the process it will be made public in [our template gallery](https://workers.cloudflare.com/docs/templates/). Since several developers - even beginners - will be using these templates, we must be scrupulous in the approval process. If you’re looking for a more relaxed way of sharing code, no worries! For other ways to contribute your Worker scripts see [our community](TODO).

# How to make a Template

To start making a template, first one must decide what to build. When deciding a template to build, we highly encourage Cloudflare internally to use [this list](https://wiki.cfops.it/display/EW/Templates+and+Template+Gallery).

### What makes a Good Template

The goal of any template is to be reusable amongst several projects, developers and entities; therefore, any template must be able to be used in a generic form. That does not mean that one can't use things like hardcoded constants, it just means those constants must be obvious and the logic must be generic.

Examples of [good templates that we need help building](https://wiki.cfops.it/display/EW/Templates+and+Template+Gallery). (TODO: remove this link for external and replace with a different list?):

- How to send a redirect

Custom solutions that would could not clearly be reused make bad templates.

Examples of bad templates:

- Building out a full blown OAuth authentication server

### Name your Template

Your template should have a programmatically name (I will refer to as `name`) and human readable description:

Examples:

- Generic template for cloud storage with an arbitrary cloud provider - `cloud_storage`
- Authentication with pre-shared header key - `auth_key_header`

You'll want to make sure your name does not conflict with existing snippet names.

# Snippets versus Boilerplates

Template is an umbral term for both snippets and boilerplate. Our gallery uses both. Before building a template distinguish it as a template or a boilerplate. We define them as:

**boilerplate**: a reusable project likely containing _more than one file_ that can serve as a skeleton code for those beginning a project

Boilerplates will be displayed in the template gallery as `wrangler generate` commands

Examples (will add links):

- Rust Wasm
- Image Compression
- Create React App
- GraphQL

**snippet**: copy-pastable code for either those beginning a project or adding into a project. Meant to not depend on multiple files.

Snippets will be displayed by default in the template gallery as the code collapsed.

Examples (will add links):

- Modify header
- Bulk redirects

**both(rare)**: a simple project that consists of a single file that one would use as a boilerplate for building out a project but could also easily copy-paste (e.g. hello-world). In this case, you can build out either or both.

# Building a Template

### Create a Snippet

If you are just designing a snippet, you can skip the setup and move to writing template.

### Create a Boilerplate

First clone the [template creator](https://github.com/victoriabernard92/workers-template-creator) and follow the instructions in the README to get your project started.

Never commit the `worker` directory or `wrangler.toml`.

# Writing Templates

## Style

### JavaScript Styleguide

Required, see guide [here](./style/javascript)

### Rust Styleguide

Required if writing Rust, see guide [here](./style/rust)

### Boilerplate Format

A boilerplate will always be a project of multiple files that can run with the `wrangler generate`

You must test using [wrangler](https://github.com/cloudflare/wrangler) to generate a new project against your repo.

```
wrangler generate myTempName ./
cd myTempName
wrangler preview
```

You do not need to strictly follow the snippet format for boilerplates, but it is recommended.

### Snippet Format

Test your snippet code with the [playground](TODO) and live on a domain. All snippet code must work unminified in the playground and be tested live.

The format of a snippet should be in the order:

1. `handleRequest`
2. `addEventListener('fetch', event => {`
3. Helper functions
4. Hardcoded constants, the developer will likely change

For example:

```javascript
/**
 * Return a simple Hello World response
 * @param {Request} request
 */
async function handleRequest(request) {
  helper(request.url.path)
  return new Response('Hello worker!', { status: 200 })
}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Here is what my helper does
 * @param {string} path
 */
function helper(path) {
  return url + '/' + path
}
/**
 * Here are what developers are expected to fill in
 * Replace url with the host you wish to send requests to
 * @param {string} url
 */
const url = 'https://example.com'
```

For snippets, the meat of the logic should be in a function called `handleRequest`, which should always exist in either forms:

```javascript
function handleRequest(request: Request): Promise<Response>
function handleRequest(request: Request): Response
```

The event listener should almost always be exactly:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

Omit all blank links in your snippet for formatting purposes (i.e. A regex find should have 0 results for `\n\n`.)

# Submit

This process is for internal only and will improve

## Boilerplate

1. Host a public repo, and then test your project by running `wrangler generate https://github.com/<your-repo>`.
2. Have Victoria (@victoriabernard92 on Github) review your code via a PR into your own repo.
3. Submit a PR to add the template to the [template gallery](https://github.com/cloudflare/cloudflare-docs/edit/master/content/templates/_index.md) after having it approved. Make sure to follow the same format as other boilerplates in the gallery and include all the same fields (e.g. wrangler genereate, demo.. )

## Snippets

1. Include victoria (@victoriabernard92 on Github) to a PR review to your own repo, or share a gist (e.g. [some gist](https://gist.github.com/victoriabernard92/5d63a2abc92fb0e5774cfd6a7035ecda.js))
2. Add the code to the [template gallery](https://github.com/cloudflare/cloudflare-docs/edit/master/content/templates/_index.md) following the format of another snippet like Post JSON.
