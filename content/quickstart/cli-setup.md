---
title: Installing the CLI
weight: 2
---

All of the tutorials in the Workers documentation use [Wrangler][2], Cloudflare's open-source command-line tool for managing Cloudflare Workers projects. To begin, you’ll need to [install Wrangler](/reference/tooling/wrangler) on your machine.

To confirm that Wrangler has successfully installed on your machine, run `wrangler --help` on the command-line:

![Verify Wrangler Installation](/quickstart/media/verify-wrangler-install.gif)

## Scaffold a Project

We've tried to make it as easy as possible for new and returning users alike to get up and running with Workers by including support for templates in Wrangler. Wrangler's `generate` subcommand allows you to create new projects based on existing templates. We maintain a great list of templates in our [Template Gallery](/templates), designed to help you get started quickly with Workers based on what you need in your project. For now, let's use one of our basic templates, which includes support for building and deploying JavaScript code, to generate our first Wrangler project:

```sh
$ wrangler generate my-worker
```

![Generate a Project](/quickstart/media/generate-project.gif)

> 💡 Protip: If you're ever unsure what a Wrangler subcommand does, like `wrangler generate`, try adding `--help` to the end of the command.

Once the project has been generated, you can navigate into the newly generated project directory, and look at the list of files created:

![Inside my-worker directory](/quickstart/media/cd-ls-my-worker.gif)

```sh
$ cd my-worker
$ ls
```

## Configure your Project

You'll need the following values from [your Cloudflare account](/reference/write-workers/api-keys) to deploy code to Cloudflare Workers:

- your Global API key
- the email addess associated with your Cloudflare account
- your Account ID
- your Zone ID (if you are running workers on your own domain)

With these keys, you can use Wrangler to set up your default credentials for deploying to Cloudflare Workers, via the `config` subcommand:

```sh
$ wrangler config <email> <global_api_key>
```

The `wrangler.toml` file contains the information Wrangler needs to connect to the Cloudflare Workers API, and deploy your code.

In `wrangler.toml`, fill in the corresponding `account_id` and `zone_id` with the values found in your dashboard. The **name** field in this config file should have a default value already filled in – feel free to change it, if you'd like.

Finally, if you are deploying your code to your own domain, you need to set a **route** for your app: where it will be hosted and accessible by your users. The route field here is a _pattern_: if we chose the route `my-worker.signalnerve.com`, the Worker would _only_ run on that exact subdomain, at the _root_ path. If you changed the route to `my-worker.signalnerve.com/*` (using the `*` or _wildcard_ symbol), the Worker would then run on any path on that subdomain, for instance, `my-worker.signalnerve.com/test`, or even `my-worker.signalnerve.com/test/123`. Learn more about routes [here](/reference/write-workers/routes)

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
wrangler publish
```

![Wrangler Publish Command](/quickstart/media/wrangler-publish.gif)

Your Worker will be uploaded and deployed to the route you specified in your config file. To ensure that everything deployed correctly, go to the URL specified at the end of the publishing process – you should see your Worker running as expected!

![Published Worker](/quickstart/media/published.png)

## Learn More

This is just the beginning of what you can do with Cloudflare Workers. If you'd like to dive deeper into building projects with Cloudflare Workers, check out the full-length tutorials below:

- [Build An Application](/tutorials/build-an-application)
- [Build A Serverless Function](/tutorials/build-a-serverless-function)
- [Configure Your CDN](/tutorials/configure-your-cdn)

[2]: https://github.com/cloudflare/wrangler
[3]: TODO
