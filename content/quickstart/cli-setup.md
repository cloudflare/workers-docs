---
title: Installing the CLI
weight: 2
---

All of the tutorials in the Workers documentation use [Wrangler][2], Cloudflare's open-source command-line tool for managing Cloudflare Workers projects. To begin, you’ll need to [install Wrangler](/reference/tooling/wrangler) on your machine.

To confirm that Wrangler has successfully installed on your machine, run `wrangler --help` on the command-line:

![Verify Wrangler Installation](/quickstart/media/verify-wrangler-install.gif)

## Scaffold a Project

We've tried to make it as easy as possible for new and returning users alike to get up and running with Workers by including support for templates in Wrangler. Wrangler's `generate` subcommand allows you to create new projects based on existing templates. We maintain a great list of templates in our [Template Gallery](/templates), designed to help you get started quickly with Workers based on what you need in your project. For now, let's use one of our basic templates, which includes support for building and deploying JavaScript code, to generate our first Wrangler project:

![Generate a Project](/quickstart/media/generate-project.gif)

> 💡 Protip: If you're ever unsure what a Wrangler subcommand does, like `wrangler generate`, try adding `--help` to the end of the command.

Once the project has been generated, you can navigate into the newly generated project directory, and look at the list of files created:

![Inside my-worker directory](/quickstart/media/cd-ls-my-worker.gif)

## Configure your Project

You'll need a few values from your Cloudflare account to deploy code to Cloudflare Workers:

- Global API key
- Email address associated with your Cloudflare account
- Account ID

For a helpful guide to finding these keys and configuring Wrangler to use them, visit the ["Finding Your Cloudflare API Keys"](/reference/write-workers/api-keys) page in our documentation.

With these keys, you can use Wrangler to set up your default credentials for deploying to Cloudflare Workers, via the `config` subcommand:

```sh
$ wrangler config <email> <global_api_key>
```

The `wrangler.toml` file contains the information Wrangler needs to connect to the Cloudflare Workers API, and deploy your code.

In `wrangler.toml`, fill in the corresponding `account_id` with the values found in your dashboard. The **name** field in this config file, which will map to your Workers application's deploy name (e.g. `my-worker.mysubdomain.workers.dev`), should have a default value already filled in – feel free to change it, if you'd like.

```toml
# wrangler.toml

# The name of your Workers application
name = "my-worker"

# Your Cloudflare account ID
account_id = "$yourAccountId"

# The kind of application you're deploying to Cloudflare
type = "webpack"
```

_This quickstart assumes that you'll be deploying Workers applications to your `workers.dev` subdomain_ - if you want to use Wrangler to deploy Workers applications to your own domain name, you'll need to configure your `wrangler.toml` slightly differently. For more information, see ["Deploying To Your Domain"](/quickstart/deploying-to-your-domain).

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
