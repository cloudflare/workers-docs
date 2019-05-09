---
title: 'Build a Serverless Function'
alwaysopen: true
weight: 2
---

# Build a Serverless Function

Welcome to Cloudflare Workers! This tutorial series will bring you from no experience with Workers, to writing and deploying a serverless function to Cloudflare.

Cloudflare Workers is a platform for building and deploying serverless functions to a global cloud network. If you’re interested in how the platform works, check out the [Reference]() section of the documentation!

TODO: BROKEN LINK ^

This quick start guide will get you up and running with Wrangler, our command-line tool for building, previewing, and deploying Cloudflare Workers. As you continue to build and deploy to Cloudflare Workers, you’ll make use of all of Wrangler’s features to manage your serverless function, so we recommend going through this brief guide before moving into the full tutorial!

## Prerequisities

All of the tutorials in the Workers documentation use [Wrangler][2], our open-source command-line tool for managing Cloudflare Workers projects. To begin, you’ll need to install Wrangler on your machine. We publish binaries for most platforms as part of our release process: to install Wrangler on your machine, follow the instructions on our [Install Wrangler][3] page.

To confirm that Wrangler has successfully installed on your machine, try running `wrangler --help` on the command-line. You should see output like the below screenshot:

![Verify Wrangler Installation](./media/verify-wrangler-install.png)

You'll need to get your Cloudflare API keys to deploy code to Cloudflare Workers: see ["How to find your Cloudflare API Keys"](/reference/how-to-find-your-cloudflare-api-keys) for a brief guide on how to find them. With these keys, you can use Wrangler to set up our default credentials for deploying to Cloudflare Workers, via the `config` subcommand:

`wrangler config <email> <global_api_key>`

## Scaffold a Project

We've tried to make it as easy as possible for new and returning users alike to get up and running with Workers, by including support for templates in Wrangler. Wrangler's `generate` subcommand allows you to create new projects based on existing templates. We maintain a great list of templates in our [Template Gallery](/gallery), designed to help you get started quickly with Workers based on what you need in your project. For now, let's use one of our basic templates, which includes support for building and deploying JavaScript code, to generate our first Wrangler project:

```
wrangler generate my-worker https://github.com/cloudflare/worker-template
```

![Generate a Project](./media/generate-project.png)

TODO: "Generating a new _rustwasm_": screenshot should be redone when JS support lands

> 💡 Protip: If you're ever unsure what a Wrangler subcommand does, like `wrangler generate`, try adding `--help` to the end of the command.

## Build and Preview your Project

First, navigate into the new project directory generated for you by Wrangler, and look at the list of files created:

```
cd my-worker
ls
```

![Inside my-worker directory](./media/cd-ls-my-worker.png)

In the longer tutorial, let's look more closely at `worker.js`: this is the actual code that you'll deploy to Workers. In the meantime, let's use two more Wrangler commands to build your project, and preview it:

```
wrangler build
wrangler preview
```

Wrangler's `build` command will install the necessary dependencies for your project, and compile it to make it ready for deployment. The `build` command will also notify you of any warnings in your project before deployment.

The `preview` command will take your built Worker project and upload it to a unique URL at [cloudflareworkers.com](https://cloudflareworkers.com). This means that you can actually test your project with our Workers runtime, and optionally, you can share this URL so that other users can test your Worker!

![Preview your Worker](./media/wrangler-preview.png)

(TODO: JS preview currently doesn't work, should be updated when JS support lands in Wrangler)

## Configure your Project

Before you can deploy our Worker to production, you need to fill in a few fields inside of `wrangler.toml`. This file will contain the information Wrangler needs to connect to the Cloudflare Workers API, and deploy your code.

Earlier in the quick start guide, we logged into the Cloudflare Dashboard UI to get your **Account ID** and **Zone ID**. In `wrangler.toml`, fill in the corresponding `account_id` and `zone_id` with the values found in your dashboard. The **name** field in this config file should have a default value already filled in – feel free to change it, if you'd like.

Last but not least, you need to set a **route** for your Worker: where your Worker will be hosted, and accessible by your users. The route field here is a _pattern_: if we chose the route `wasm-worker.signalnerve.com`, the Worker would _only_ run on that exact subdomain, at the _root_ path. If you changed the route to `wasm-worker.signalnerve.com/*` (using the `*` or _wildcard_ symbol), the Worker would then run on any path on that subdomain, for instance, `wasm-worker.signalnerve.com/test`, or even `wasm-worker.signalnerve.com/test/123`.

When thinking about routes, you should consider the URLs that you want your Worker to run on – for instance, if you're deploying a single serverless function, you'll probably host it on a single route, like: `wasm-worker.signalnerve.com/myFn`.

## Publish your Project

With your project configured, it's time to publish your serverless function! Wrangler has a built-in command for uploading your script, generating the route that corresponds to your `wrangler.toml` file, and wiring them together. If that sounds complicated, don't worry – we've made it really easy:

```
wrangler publish
```

![Wrangler Publish Command](./media/wrangler-publish.png)

Your Worker will be uploaded and deployed to the route you specified in your config file. To ensure that everything deployed correctly, go to the URL specified at the end of the publishing process – you should see your Worker running as expected!

![Published Worker](./media/published.png)

TODO I have multiscript, and this whole section assumes zone workers: will need to redo this with zoneless workers and probably rework the routing copy as we update Wrangler to support that.

## Learn More

This is just the beginning of what you can do with Cloudflare Workers. If you'd like to dive deeper into building and deploying a serverless function with Workers, check out the full-length tutorial below!

- [Building a Serverless Function with Cloudflare Workers][4]

[2]: https://github.com/cloudflare/wrangler
[3]: TODO
[4]: ./tutorials/TODO
