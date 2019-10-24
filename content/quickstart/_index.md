---
title: Quick Start
alwaysopen: true
weight: 1
---

- [Installing the CLI](#installing-the-cli)
  - [Updating the CLI](#updating-the-cli)
- [Generating a Project](#generating-a-project)
- [Writing Code](#writing-code)
- [Build and Preview Your Project](#build-and-preview-your-project)
- [Configure](#configure)
  - [Finding Your Cloudflare API Keys](#finding-your-cloudflare-api-keys)
    - [Account ID and Zone ID](#account-id-and-zone-id)
    - [Global API Key](#global-api-key)
  - [Setup](#setup)
- [Publish Your Project](#publish-your-project)
  - [Publish To workers.dev](#publish-to-workers-dev)
  - [Publish To Your Domain](#publish-to-your-domain)
- [Learn More](#learn-more)

# Installing the CLI

All of the tutorials in the Workers documentation use [Wrangler](https://github.com/cloudflare/wrangler), Cloudflare's open-source command-line tool for managing Cloudflare Workers projects. To begin, you’ll need to [install Wrangler](https://github.com/cloudflare/wrangler#installation) on your machine.

To confirm that Wrangler has successfully installed on your machine, run `wrangler --help` on the command-line:

![Verify Wrangler Installation](/quickstart/media/verify-wrangler-install.gif)

## Updating the CLI

To update [Wrangler](https://github.com/cloudflare/wrangler), follow the below instructions (customized for either an NPM or Cargo install):

**Updating Wrangler with NPM:**

```sh
npm uninstall -g @cloudflare/wrangler && npm install -g @cloudflare/wrangler
```

**Updating Wrangler with Cargo:**

```sh
cargo uninstall wrangler && cargo install wrangler
```

# Generating a Project

Wrangler's `generate` subcommand allows you to create new projects based on existing templates. Passing an additional argument to `generate` will set the "name" of the project, as well as the directory the project will be created in:

![Generate a Project](/quickstart/media/generate-project.gif)

Once the project has been generated, you can navigate into the newly generated project directory, and look at the list of files created:

```sh
$ cd my-worker
$ ls
```

With no template argument, Wrangler generates projects using our [JavaScript template](https://github.com/cloudflare/worker-template).

> 💡 Protip: We maintain a diverse list of templates in our [Template Gallery](/templates). Using a custom template is easy - simply pass the GitHub URL of your template into `wrangler generate`:

```sh
$ wrangler generate my-router-app https://github.com/cloudflare/worker-template-router
```

If you don't wish to start with a template, you can use `wrangler init` in an existing project.

# Writing Code

Once you have an environment set up, you are ready to start writing scripts.

## Hello World

At its heart, a Workers app consists of two parts: an event listener that listens for [`FetchEvents`](/reference/apis/fetch-event), and an event handler that returns a [Response](/reference/apis/response) object which is passed to the event's `.respondWith()` method.

When a request is received on one of Cloudflare's edge servers for a URL matching a Workers script, it passes the request in to the Workers runtime, which in turn emits a 'fetch' event in the isolate where the script is running.

```javascript
// 1. Register a FetchEvent listener that sends a custom
//    response for the given request.
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 2. Return a custom request object
async function handleRequest(request) {
  return new Response('hello world')
}
```

Let's break this down:

### 1. An event listener for the `FetchEvent`:

Tells the script to listen for any request coming to your Worker. `event.request` - of type [`Request`](/reference/apis/request) - is a representation of the HTTP request that triggered the FetchEvent.

### 2. A call to `.respondWith()`

The FetchEvent handler typically culminates in a call to the method `.respondWith()` with either a [`Response`](/reference/apis/fetch/#response) or `Promise<Response>` that determines the response.

The FetchEvent object also provides two other methods - `.passThroughOnException()` and `.waitUntil()`- to handle unexpected exceptions and operations that may complete after a response is returned.

##### Further Reading

- [The FetchEvent Lifecycle](/about/tips/fetch-event-lifecycle)
- [FetchEvent API Reference](/reference/apis/fetch-event)

## Directing Requests

Now that we have a very basic script running on all requests, how can we filter requests to reach certain handlers? There are a few options:

##### Option 1: manually filter requests

You can use standard JavaScript branching logic, such as `if/else` or `switch` statements, to conditionally return different responses or execute different handlers based on the request:

```javascript
async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = await generate(request)
  } else {
    response = new Response('Expected POST', { status: 500 })
  }
```

For all avaliable methods of the Request object that you can filter by see: [Requests](/reference/apis/request).

##### Option 2: use a template for routing on URL

The [Workers Router](https://github.com/cloudflare/worker-template-router) template provides an API similar to ExpressJS for handling requests based on HTTP methods and paths. To initialize a project using this router with Wrangler, simply pass the git repository URL to Wrangler's `generate` command:

```sh
wrangler generate myApp https://github.com/cloudflare/worker-template-router
```

We'll use this approach in the [Slack Bot Tutorial](/tutorials/build-an-application).

### Templates

There are a variety of examples in the [Template Gallery](/templates) for more custom solutions.

### Workers Concepts

The example outlined in this guide is just a starting point. There are many more [APIs](/reference/runtime/apis) available to manipulate intercepted requests. For example, you can retrieve data from [Cache](/reference/apis/cache), compute a custom response right from the edge, route the request to the appropriate service, filter traffic, and more.

For concepts, pitfalls and guidelines to keep in mind while writing scripts, check out our [Workers Concepts](/reference/workers-concepts) articles.

# Preview Your Project

`worker.js` contains the actual code that you'll deploy to Workers. Let's use Wrangler to preview it:

```sh
$ wrangler preview --watch
```

The `preview` command will take your built Worker project and upload it to a unique URL at [cloudflareworkers.com](https://cloudflareworkers.com). This means that you can actually test your project with our Workers runtime, and optionally, you can share this URL so that other users can test your Worker!

The `--watch` flag for `preview` tells Wrangler to watch your Worker project for changes and update the preview tab live with the latest URL.

![Preview your Worker](/quickstart/media/wrangler-preview.png)

# Build Your Project

Wrangler's `build` command will install the necessary dependencies for your project, and compile it to make it ready for deployment. The `build` command will also notify you of any build warnings before deployment. `preview` and `publish` will both run `build` for you, but we expose it separately as it is useful for checking for errors.

Node and npm are required to be installed on the system when using the webpack project type, which is the default.

```sh
$ wrangler build
```

# Configure

To publish Cloudflare Workers projects and serve them from our global cloud network, [create a Cloudflare account](https://dash.cloudflare.com/sign-up/workers) and setup a registered domain **_or_** a Workers.dev subdomain on Cloudflare.

## Finding Your Cloudflare API Keys

[Wrangler](/tooling/wrangler) and [other tools](/tooling) use the following credentials to manage uploading and publishing your Worker scripts to your Cloudflare domain:

- Account ID
- Zone ID _(Note You do not need your Zone ID for deploying Workers on a `Workers.dev` subdomain)_
- Global API Key
- Email address

### Account ID and Zone ID

**Registered Domains**

For domains that you have registered on Cloudflare, you need both IDs:

1. Log in to your Cloudflare account and select the desired domain.
2. Select the _Overview_ tab on the navigation bar.
3. Scroll to the _API_ section and select **Click to copy** to copy your Account ID.
4. Copy your **Zone ID**.

**Workers.dev**

For workers.dev domains, you will just need the Account ID:

1. Log in to your Cloudflare account and select **Workers**.
2. Scroll to the _API_ section and select **Click to copy** to copy your **Account ID**.

### Global API Key

1. Click **Get API Key** below the _API_ section to jump to your _Profile_ page.
2. Scroll to _API Keys_, and click **View** to copy your Global API Key **\***.

**\* IMPORTANT: Treat your Global API Key like a password!**
It should not be stored in version control or in your code, use environment variables if possible.

## Setup

Set up your default credentials on your local machine via the `config` subcommand. You should only need to do this once. Running `wrangler config` will prompt you interactively for your email and API key:

```sh
$ wrangler config
Enter email:
foo@bar.com
Enter api key:
123456abcdef
```

To configure your project, complete the `wrangler.toml` file at the root of the generated project. This file contains the information wrangler needs to connect to the Cloudflare Workers API, and publish your code.

The **name** field in this config file, which will map to your script's deploy name (e.g. `my-worker.mysubdomain.workers.dev`).

Fill in the `account_id` field with the value found in your dashboard and `type` with the type of your project.

```toml
# wrangler.toml

# The name of your Workers application
name = "my-worker"

# Your Cloudflare account ID
account_id = "$yourAccountId"

# The kind of application you're deploying to Cloudflare
type = "webpack"

# Publish to workers.dev by default
workers_dev = true
```

# Publish Your Project

With your project configured, it's time to publish it!

```sh
$ wrangler publish
```

![Published Worker](/quickstart/media/published.png)

## Publish To workers.dev

With the `workers_dev` key in `wrangler.toml` set to `true`, Wrangler will publish your project to your `workers.dev` subdomain.

```toml
# wrangler.toml

name = "my-worker"
account_id = "$yourAccountId"
type = "webpack"
workers_dev = true
```

Now, run:

```console
wrangler publish
```

_Note: If you are pushing a new workers.dev Worker project you may initially see 523 errors. Do not fear! The DNS is propagating and can take a few seconds. It should work after a minute or so._

## Publish To Your Domain

To publish your application on a domain you own (i.e. not a `workers.dev` subdomain), you can add a `route` key to your `wrangler.toml`.

Wrangler's ["environments"](https://github.com/cloudflare/wrangler/blob/master/docs/content/environments.md) feature allows us to specify multiple different deploy targets for our application. Let's add a `production` environment, passing in a `route` and `zone_id` to deploy to a specific domain:

```toml
# wrangler.toml

name = "my-worker"
account_id = "$yourAccountId"
type = "webpack"
workers_dev = true

[env.production]
# The ID of your domain you're deploying to
zone_id = "$yourZoneId"
# The route pattern your Workers application will be served at
route = "example.com/*"
```

The `route` key here is a [_route pattern_](/about/routes/). Now, we can deploy to the production environment configured above by passing the `--env` flag to `wrangler publish`:

```console
wrangler publish --env production # Publish to example.com
wrangler publish            # Publish to workers.dev
```

For more information on environments, check out the [Wrangler documentation](https://github.com/cloudflare/wrangler/blob/master/docs/content/environments.md).

# Learn More

This is just the beginning of what you can do with Cloudflare Workers. If you'd like to dive deeper into building projects with Cloudflare Workers, check out the full-length tutorials below:

- [Build An Application](/tutorials/build-an-application)
- [Build A Serverless Function](/tutorials/build-a-serverless-function)
- [Configure Your CDN](/tutorials/configure-your-cdn)

[2]: https://github.com/cloudflare/wrangler
