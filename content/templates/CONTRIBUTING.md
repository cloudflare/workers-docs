[TOC]

# Introduction

### What makes a Good Template

The goal of any template is to be reusable amongst several projects, developers and entities; therefore, any template must be able to be used in a generic form. That does not mean that you can't use things like hardcoded constants, it just means those constants must be obvious and the logic must be generic.

Custom solutions that would could not clearly be reused make bad templates.

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

Never commit the `worker` directory. Commit your `wrangler.toml`and `workers-site` directory (if applicable) with the required `type`, but don't commit the account tags.

# Writing Templates

## Style

### JavaScript Styleguide

Required, see guide [here](./style/javascript.md)

### Rust Styleguide

Required if writing Rust, see guide [here](./style/rust.md)

### Boilerplate Format

A boilerplate will always be a project of multiple files that can run with the `wrangler generate`

You must test using [wrangler](https://github.com/cloudflare/wrangler) to generate a new project against your repo.

```
wrangler generate myTempName ./
cd myTempName
wrangler preview --watch
```

You do not need to strictly follow the snippet format for boilerplates, but it is recommended.

### Snippet Format

Test your snippet code with the playground and live on a domain. All snippet code must work unminified in the playground and be tested live.

The format of a snippet should be in the order:

1. `handleRequest`
2. `addEventListener('fetch', event => {`
3. Helper functions
4. Hardcoded constants, the developer will likely change

For example:

```javascript
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
 * Replace URL with the host you wish to send requests to
 * @param {string} URL
 */
const URL = 'https://example.com'
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

# `name.toml`

Once you've written the template you'd like to share, its time to configure your name.toml.  Templates have the following options:
```
# name.toml
# required fields
id = "name"
name = "Title of your template"
description = "Concise 1-2 sentences that explains what your template does"
# optional
tutorial="featured_boilerplates/name" #path to in depth tutorial of your code
share="featured_boilerplates/name" #path to  page to share the code
tags = ["Originless", "Enterprise"] # first letter must be caps
```

## Boilerplate
Specific boilerplate fields: 
```
repository_url = "https://github.com/<you>/<name>"
demo_url = "" # a live demo of your code (can be an array)
```
## Snippet

Fields specific to snippets: 
```
demo_url = "" # a shared link generated from cloudflareworkers.com (can be an array)
code = '''
async function handleRequest(request) {
...
​```
```

# Summit

## Boilerplate

1. Host a public repo, and then test your project by running `wrangler generate https://github.com/<you>/<name>`.
2. Label the PR with the tag `template_gallery`  to have your code reviewed.
3. Add a `name.toml` file to the [template gallery featured projects](/data/featured/). Include all the information that is in exisiting snippets there i.e. `demo_url`, `description`, etc.. Submit a PR to the [Cloudflare Workers Docs](https://github.com/cloudflare/cloudflare-docs)

## Snippets

1. If you think the snippet will need a lot of review, include victoria (@victoriabernard92 on Github) to a PR review to your own repo, or share a gist.
2. Add a `name.toml` file to the [template gallery snippets](/data/snippets/). Include all the information that is in exisiting snippets there i.e. `code`, `description`, etc..
   For an example see [Modify Request URL](/data/snippets/modify_req_url.toml). Submit a PR to the [Cloudflare Workers Docs](https://github.com/cloudflare/cloudflare-docs)

