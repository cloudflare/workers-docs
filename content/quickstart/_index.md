---
title: Quick Start
alwaysopen: true
weight: 1
---
- [Installing the CLI](#installing-the-cli)
- [Generating a Project](#generating-a-project)
- [Updating the CLI](#updating-the-cli)
- [Writing Code](#writing-code)
  - [Hello World](#hello-world)
    - [1. An event listener for the `FetchEvent`:](#1-an-event-listener-for-the-fetchevent)
    - [2. A call to `.respondWith()`](#2-a-call-to-respondwith)
        - [Further Reading](#further-reading)
  - [Directing Requests](#directing-requests)
        - [Option 1: manually filter requests](#option-1-manually-filter-requests)
        - [Option 2: use a template for routing on URL](#option-2-use-a-template-for-routing-on-url)
    - [Templates](#templates)
    - [Workers Concepts](#workers-concepts)
- [Configuring and Publishing](#configuring-and-publishing)
  - [Build and Preview your Project](#build-and-preview-your-project)
  - [Publish your Project](#publish-your-project)
  - [Learn More](#learn-more)
- [Finding Your Cloudflare API Keys](#finding-your-cloudflare-api-keys)
  - [Account ID and Zone ID](#account-id-and-zone-id)
      - [Registered Domains](#registered-domains)
      - [Workers.dev](#workersdev)
  - [Global API Key](#global-api-key)
- [Publishing To Your Domain](#publishing-to-your-domain)
  - [Publishing with Wrangler](#publishing-with-wrangler)



<!-- - [Installing the CLI](#installing-the-cli)
- [Generating a Project](#generating-a-project)
- [Writing Code](#writing-code)
- [Configuring and Publishing](#configuring-and-publishing)
- [Release](#publishing-to-your-domain)
- [Finding Your Cloudflare API Keys](#api-keys) -->





# Installing the CLI

All of the tutorials in the Workers documentation use [Wrangler](https://github.com/cloudflare/wrangler), Cloudflare's open-source command-line tool for managing Cloudflare Workers projects. To begin, you’ll need to [install Wrangler](https://github.com/cloudflare/wrangler#-installation) on your machine.

To confirm that Wrangler has successfully installed on your machine, run `wrangler --help` on the command-line:

![Verify Wrangler Installation](/quickstart/media/verify-wrangler-install.gif)

# Generating a Project

We've tried to make it as easy as possible for new and returning users alike to get up and running with Workers by including support for templates in Wrangler. Wrangler's `generate` subcommand allows you to create new projects based on existing templates. Passing an additional argument to `generate` will set the "name" of the project, as well as the directory the project will be created in:

![Generate a Project](/quickstart/media/generate-project.gif)

> 💡 Protip: If you're ever unsure what a Wrangler subcommand does, like `wrangler generate`, try adding `--help` to the end of the command.

Once the project has been generated, you can navigate into the newly generated project directory, and look at the list of files created:

```sh
$ cd my-worker
$ ls
```

By default, Wrangler generates projects using our [JavaScript template](https://github.com/cloudflare/worker-template), which enables building Workers projects with JavaScript. We also maintain a great list of templates in our [Template Gallery](/templates), designed to help you get started quickly with Workers based on what you need in your project.

Using a custom template is easy - simply pass the GitHub URL of your template into `wrangler generate`:

```sh
$ wrangler generate my-router-app https://github.com/cloudflare/worker-template-router
```

# Updating the CLI

To update [Wrangler](https://github.com/cloudflare/wrangler), follow the below instructions (customized for either an NPM or Cargo install):

**Updating Wrangler with NPM:**

```sh
npm uninstall -g @cloudflare/wrangler && npm install -g @cloudflare/wrangler
```

**Updating Wrangler with Cargo:**

```sh
cargo uninstall wrangler && cargo install wrangler
```

# Writing Code

Once you have an environment set up either with [the CLI](/quickstart/cli-setup) or [the Playground](/reference/tooling/playground), you are ready to start writing scripts.

## Hello World

At its heart, a Workers app consists of two parts: an event listener that listens for [`FetchEvents`](/reference/runtime/apis/fetch-event), and an event handler that returns a [Response](/reference/runtime/apis/fetch#response) object which is passed to the event's `.respondWith()` method.

When a request is received on one of Cloudflare's edge servers for a URL matching a Workers script, it passes the request in to the Workers runtime, which in turn emits a 'fetch' event in the isolate where the script is running.

```javascript
// 1. Register a FetchEvent listener that sends a custom
//    response for the given request.
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 2. Return a custom request object
async function handleRequest(request) {
  return new Response("hello world")
}
```

Let's break this down:

### 1. An event listener for the `FetchEvent`:

This tells the script to listen for any request coming to your Worker. `event.request` - which is of type [`Request`](/reference/runtime/apis/fetch#request) - is a representation of the HTTP request that triggered the FetchEvent..

### 2. A call to `.respondWith()`

The FetchEvent handler typically culminates in a call to the method `.respondWith()` with either a [`Response`](/reference/runtime/apis/fetch/#response) or `Promise<Response>` that determines the response.

The FetchEvent object also provides two other methods, `.passThroughOnException()` and `.waitUntil()`, to handle unexpected exceptions and operations that may complete after a response is returned.

##### Further Reading

* [The FetchEvent Lifecycle](/reference/workers-concepts/fetch-event-lifecycle)
* [FetchEvent API Reference](/reference/runtime/apis/fetch-event)

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

For all avaliable methods of the Request object that you can filter by see: [Requests](/reference/runtime/apis/fetch#request).

##### Option 2: use a template for routing on URL

The [Workers Router](https://github.com/cloudflare/worker-template-router) template provides an API similar to ExpressJS for handling requests based on HTTP methods and paths. To initialize a project using this router with Wrangler, simply pass the git repository URL to Wrangler's `generate` command:

```sh
wrangler generate myApp https://github.com/cloudflare/worker-template-router
```

We'll use this approach in the [Slack Bot Tutorial](/tutorials/build-an-application).

### Templates

There are a variety of examples in the [Template Gallery](/templates).

### Workers Concepts

The example outlined in this guide is just a starting point. There are many more [APIs](/reference/runtime/apis) available to manipulate intercepted requests. For example, you can retrieve data from [Cache](/reference/runtime/apis/cache), compute a custom response right from the edge, route the request to the appropriate service, filter traffic, and more.

For concepts, pitfalls and guidelines to keep in mind while writing scripts, check out our [Workers Concepts](/reference/workers-concepts) articles.

# Configuring and Publishing

> This article assumes that you'll be deploying Workers applications to your `workers.dev` subdomain - if you want to use Wrangler to deploy Workers applications to your own domain name, you'll need to configure your `wrangler.toml` slightly differently. For more information, see ["Deploying To Your Domain"](/quickstart#publishing-to-your-domain).

You'll need a few values from your Cloudflare account to deploy code to Cloudflare Workers:

- Global API key
- Email address associated with your Cloudflare account
- Account ID

Follow [this guide](/quickstart#finding-your-cloudflare-api-keys) to find these values for your account.

To configure Wrangler to deploy to your Cloudflare Workers account, set up your default credentials via the `config` subcommand. You should only need to do this once. Running `wrangler config` will prompt you interactively for your email and API key:

```sh
$ wrangler config
Enter email:
foo@bar.com
Enter api key:
123456abcdef
```

To configure your project, complete the `wrangler.toml` file at the root of the generated project. This file contains the information wrangler needs to connect to the Cloudflare Workers API, and publish your code.

The **name** field in this config file, which will map to your application's deploy name (e.g. `my-worker.mysubdomain.workers.dev`), should have a default value already filled in – feel free to change it, if you'd like.

Fill in the `account_id` field with the value found in your dashboard.

```toml
# wrangler.toml

# The name of your Workers application
name = "my-worker"

# Your Cloudflare account ID
account_id = "$yourAccountId"

# The kind of application you're deploying to Cloudflare
type = "webpack"
```

## Build and Preview your Project

`worker.js` contains the actual code that you'll deploy to Workers. Let's use two more Wrangler commands to build your project, and preview it:

```sh
$ wrangler build
$ wrangler preview
```

Wrangler's `build` command will install the necessary dependencies for your project, and compile it to make it ready for deployment. The `build` command will also notify you of any build warnings before deployment.

The `preview` command will take your built Worker project and upload it to a unique URL at [cloudflareworkers.com](https://cloudflareworkers.com). This means that you can actually test your project with our Workers runtime, and optionally, you can share this URL so that other users can test your Worker!

![Preview your Worker](/quickstart/media/wrangler-preview.png)

## Publish your Project

With your project configured, it's time to publish it! Wrangler has a built-in command for uploading your script, generating the route that corresponds to your `wrangler.toml` file, and wiring them together. If that sounds complicated, don't worry – we've made it really easy:

```sh
$ wrangler publish
```

Your Worker will be uploaded and deployed to the route you specified in your config file. To ensure that everything deployed correctly, go to the URL specified at the end of the publishing process – you should see your Worker running as expected!

![Published Worker](/quickstart/media/published.png)

## Learn More

This is just the beginning of what you can do with Cloudflare Workers. If you'd like to dive deeper into building projects with Cloudflare Workers, check out the full-length tutorials below:

- [Build An Application](/tutorials/build-an-application)
- [Build A Serverless Function](/tutorials/build-a-serverless-function)
- [Configure Your CDN](/tutorials/configure-your-cdn)

[2]: https://github.com/cloudflare/wrangler

# Finding Your Cloudflare API Keys

To publish Cloudflare Workers projects and serve them from our global cloud network, [create a Cloudflare account](https://dash.cloudflare.com/sign-up/workers) and setup a registered domain **_or_** a Workers.dev subdomain on Cloudflare.

[Wrangler](/reference/tooling/wrangler) and [other tools](/reference/tooling) use the following credentials to manage uploading and publishing your Worker scripts to your Cloudflare domain:

- Account ID
- Zone ID _(Note You do not need your Zone ID for deploying Workers on a `Workers.dev` subdomain)_
- Global API Key
- Email address

## Account ID and Zone ID

#### Registered Domains

For domains that you have registered on Cloudflare, you need both IDs:

1. Log in to your Cloudflare account and select the desired domain.
2. Select the _Overview_ tab on the navigation bar.
3. Scroll to the _API_ section and select **Click to copy** to copy your Account ID.
4. Copy your **Zone ID**.

#### Workers.dev

For workers.dev domains, you will just need the Account ID:

1. Log in to your Cloudflare account and select **Workers**.

2. Scroll to the _API_ section and select **Click to copy** to copy your **Account ID**.

## Global API Key

1. Click **Get API Key** below the _API_ section to jump to your _Profile_ page.

2. Scroll to _API Keys_, and click **View** to copy your Global API Key **\***.

**\* IMPORTANT: Treat your Global API Key like a password!**
It should not be stored in version control or in your code, use environment variables if possible.

# Publishing To Your Domain

If you are deploying your Workers application to a domain configured on your Cloudflare account, you'll need to configure your `wrangler.toml` with the following configuration details for your domain:

- Global API key
- Email address associated with your Cloudflare account
- Account ID
- Zone ID
- Route

For a helpful guide to finding these keys and configuring Wrangler to use them, visit the ["Finding Your Cloudflare API Keys"](/quickstart#finding-your-cloudflare-api-keys/) page in our documentation.

To configure Wrangler to deploy to your Cloudflare Workers account, set up your default credentials via the `config` subcommand. You should only need to do this once. Running `wrangler config` will prompt you interactively for your email and API key:

```sh
$ wrangler config
Enter email:
foo@bar.com
Enter api key:
123456abcdef
```

The remainder of your configuration details should be used to populate your project's `wrangler.toml` config. By default, your `wrangler.toml` looks like this:

```toml
# wrangler.toml

# The name of your Workers application
name = "my-worker"

# Your Cloudflare account ID
account_id = "$yourAccountId"

# Your Cloudflare zone ID
zone_id = "$yourZoneId"

# The route pattern your Workers application will be served at
route = "$yourRoute"

# The kind of application you're deploying to Cloudflare
type = "webpack"
```

A route will need to be selected for your app: where it will be hosted and accessible by your users. The route field here is a _pattern_: if we chose the route `my-worker.cloudflare.com`, the Worker would _only_ run on that exact subdomain, at the _root_ path. If you changed the route to `my-worker.cloudflare.com/*` (using the `*` or _wildcard_ symbol), the Worker would then run on any path on that subdomain, for instance, `my-worker.cloudflare.com/test`, or even `my-worker.cloudflare.com/test/123`. Learn more about routes [here](/reference/workers-concepts/routes/).

## Publishing with Wrangler

Wrangler's `publish` command supports deploying to your `workers.dev` domain _and_ a domain that you have hosted on Cloudflare. To deploy to your own domain, add the `--release` flag:

```sh
wrangler publish --release
```
