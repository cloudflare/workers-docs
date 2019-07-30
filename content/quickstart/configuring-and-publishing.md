---
title: 'Configuring and Publishing'
weight: 4
---

> This article assumes that you'll be deploying Workers applications to your `workers.dev` subdomain - if you want to use Wrangler to deploy Workers applications to your own domain name, you'll need to configure your `wrangler.toml` slightly differently. For more information, see ["Deploying To Your Domain"](/quickstart/deploying-to-your-domain).

You'll need a few values from your Cloudflare account to deploy code to Cloudflare Workers:

- Global API key
- Email address associated with your Cloudflare account
- Account ID

Follow [this guide](/quickstart/api-keys) to find these values for your account.

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
