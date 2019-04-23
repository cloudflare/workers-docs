# Build an Application

Welcome to Cloudflare Workers! This tutorial series will bring you from no experience with Workers, to writing and deploying a full application to Cloudflare's edge network. 

Cloudflare Workers is a platform for building and deploying serverless applications to a global cloud network. If you’re interested in how the platform works, check out the [Reference]() section of the documentation!

This quick start guide will get you up and running with Wrangler, our command-line tool for building, previewing, and deploying Cloudflare Workers. As you continue to build and deploy to Cloudflare Workers, you’ll make use of all of Wrangler’s features to manage your application, so we recommend going through this brief guide before moving into the full tutorial! 

## Prerequisities

All of the tutorials in the Workers documentation use [Wrangler][2], our open-source command-line tool for managing Cloudflare Workers projects. To begin, you’ll need to install Wrangler on your machine. We publish binaries for most platforms as part of our release process: to install Wrangler on your machine, follow the instructions on our [Install Wrangler][3] page.

To confirm that Wrangler has successfully installed on your machine, try running `wrangler —help` on the command-line. You should see output like the below screenshot:

![Verify Wrangler Installation](/Users/kristian/src/workers/workers-docs/build-an-application/images/verify-wrangler-install.png)

To publish Cloudflare Workers projects and serve them from our global edge network, you'll need to create a Cloudflare account (TODO: is this true for zoneless workers? different account?). 

Once you've signed up (or if you already have an account), you'll need to write down your Cloudflare account email, as well as your API key – Wrangler will use this to manage uploading and publishing your Workers.

To find your API key, do the following:

1. Login to Cloudflare with the account you'd like to use for deploying Cloudflare Workers
2. Click on the Profile icon at the top-right of the screen, and select "My Profile". Your account email should also be listed underneath the "My Profile" text.
3. On the "My Profile" page, scroll down to "API Keys", and find "Global API Key".
4. Enter your password, and click "View" to see your Global API Key.

![Viewing Cloudflare API keys](/Users/kristian/src/workers/workers-docs/build-an-application/images/api-keys.png)

**Treat your Global API Key like a password!** We'll configure Wrangler to use this key, but by design, Wrangler does not keep this API key in version control, or inside of your code. 

Now that you've found your Cloudflare account email and API Key, hold on to them. We'll use them in the "Configure your Project" step later in the guide.

## Scaffold a Project

It's time to finally run some commands! In designing Wrangler, we've tried to make it as easy as possible for new and returning users alike to get up and running with Workers. One of Wrangler's most powerful features is the `generate` command: this will allow you to create new projects based on existing templates. We maintain a great list of templates in our [Template Gallery](/gallery), designed to help you get started quickly with Workers based on what you need in your project. For now, we'll use one of our basic templates, which includes support for building, deploying, and running JavaScript code on our edge servers.

Let's generate our first Wrangler project:

```
wrangler generate my-worker https://github.com/cloudflare/worker-template
```



![Generate a Project](/Users/kristian/src/workers/workers-docs/build-an-application/images/generate-project.png)

TODO: "Generating a new *rustwasm*"

Notice that Wrangler also supports the inclusion of a URL in this command, such as `wrangler generate https://github.com/cloudflare/template`. For now, we'll use Wrangler's default template, but as you become more familiar with Wrangler, you may want to create your own templates, or use something from the [Template Gallery](/gallery).

> 💡 Protip: If you're ever unsure what a Wrangler subcommand does, like `wrangler generate`, try adding `--help` to the end of the command: for instance, `wrangler generate --help`. This will show you the available *arguments*, *flags*, and usage instructions for that specific subcommand.



## Preview your Project

`wrangler preview`

## Configure your Project

`wrangler config <email> <api_key>`

## Publish your Project

`wrangler publish`

## Learn More

- [Tutorials][4]

[2]:	https://github.com/cloudflare/wrangler
[3]:	TODO
[4]:	./tutorials/index.md