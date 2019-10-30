---
title: 'Hosting Static Wordpress Sites'
---

In this tutorial, we'll migrate a Wordpress site to Cloudflare Workers, making use of [Workers Sites](/sites). Serving a static version of your Wordpress site has many advantages over directly exposing your Wordpress site: while Wordpress is extremely powerful and easy to use, the consistent discovery of new vulnerabilities make it an obvious target for hackers to attack. In addition, because Wordpress is built on PHP, each incoming request to your site regenerates a new response on the server – for most websites, this isn't necessary, and leads to scaling issues when your site receives a lot of traffic.

We'll use the free Wordpress plugin [WP2Static](https://wordpress.org/plugins/static-html-output-plugin/), which generates a completely static (HTML, CSS, and JS) version of your Wordpress site, and using [Wrangler](https://github.com/cloudflare/wrangler), we'll publish the site to Cloudflare Workers. The Workers Sites functionality built into Wrangler includes support for caching your site directly in Cloudflare's CDN, meaning that users will be able to view your site quickly and securely.

Note that there are some features available in Wordpress sites that will not be supported in a static site environment:

- WordPress Forms
- WordPress Comments
- Any links to `/wp-admin` or similar "internal" Wordpress routes

## Setup

This tutorial assumes that you have access to a Wordpress installation, with the ability to install and use plugins from Wordpress' plugin marketplace.

To start, we'll install the [WP2Static](https://wordpress.org/plugins/static-html-output-plugin/) plugin. In your Wordpress installation, navigate to the "Add Plugins" page, by default at `/wp-admin/plugin-install.php`. In the search bar, search WP2Static, and confirm that the resulting plugin that you will be installing matches the plugin linked above. Select "Install" on the plugin, and once it's finished installing, "Activate".

![Installing the plugin](/media/wordpress--install-plugin.png)

## Export your Wordpress site

When your application refreshes, you should see a new section of your sidebar called WP2Static. Navigate to that section, and we'll begin your first static Wordpress export.

WP2Static supports a number of different export types, including manual and automated exports. For now, we'll select the manual export type "ZIP archive (.zip)", which will export the Wordpress installation into a self-contained ZIP folder. To make deployment easier, we recommend you select "Allow offline usage" – this will make all the URLs in your Wordpress export _relative_: `/logo.png` versus `https://mysite.com/logo.png`, and will reduce the number of asset errors that could occur depending on your theme and Wordpress setup.

It's time to do our first export! Select "Start static site export" (it might take a while), and when it completes, save the ZIP file that contains your export somewhere you can easily find it later.

![Exporting your Wordpress site](/media/wordpress--export.png)

## Creating a new Workers project

With an export ready of our site, it's time to get to work deploying it. To do this, we'll use [Wrangler](https://github.com/cloudflare/wrangler), the command-line tool for Cloudflare Workers. If you haven't yet installed and configured Wrangler, check out our [Quick Start guide](/quickstart).

Once Wrangler is installed and configured, we can create a new project for deploying our static Wordpress site to Workers. To generate a new project, use `wrangler generate --site`, where the `--site` flag indicates that we want to deploy a website, namely, our static Wordpress site:

```sh
wrangler generate --site wp-static
```

The newly generated `wp-static` directory will contain three things:

1. A `public` directory, representing the site you want to deploy to Workers. This will be the location of your Wordpress site.
2. A `workers-site` directory, which contains the Workers script that will serve your website content. In this tutorial, we won't change anything in this folder.
3. A `wrangler.toml` file, which contains the configuration details for our `wp-static` file. We'll populate this file with some information before the project is deployed.

When deploying a website using Workers Sites, your static code – your HTML, CSS, and JavaScript – will be uploaded to Workers KV. The location of these files is, by default, the `public` folder mentioned above. Open the ZIP file downloaded from your Wordpress static export, and extract the contents of the ZIP into the `public` folder. Your directory structure should look something like this:

```
wp-static
├── public
│   ├── 2018
│   ├── 2019
│   ├── 404.html
│   └── # More exported Wordpress files
├── workers-site
│   ├── index.js
│   ├── node_modules
│   └── # More Workers script files
└── wrangler.toml
```

## Configuring and deploying

To deploy our application, we need to fill out `wrangler.toml`, the configuration file for this project. Most of the file has been pre-filled, but you need to specify your `account_id` and where you want to deploy your application. Using the [Quick Start](/quickstart) as your guide, fill out the `account_id` field in `wrangler.toml` with your Cloudflare account ID. In this tutorial, we'll deploy to a [Workers.dev subdomain tied to your account](/quickstart/#publish-to-workers-dev): the default value for `workers_dev` in your `wrangler.toml` should be `true`, indicating to Wrangler that it should publish to your subdomain. Your final `wrangler.toml` should resemble something like the following:

```toml
# wrangler.toml

name = "wp-static"
type = "webpack"
workers_dev = true
account_id = "$accountId"

[site]
bucket = "./public"
entry-point = "workers-site"
```

Now it's time to publish your site! Run `wrangler publish` – Wrangler will upload your files, deploy a Workers script to serve those files, and at `wp-static.$yourSubdomain.workers.dev`, you should see your Wordpress site being served via Workers!

[![Demo site](/media/wordpress--demo.png)](https://wp-static.signalnerve.workers.dev)

## Conclusions

Deploying your Wordpress site to Workers has huge benefits for your site's performance, security, and cost. With a static version of your site being served, you can do a number of things with your live Wordpress installation:

- Move your Wordpress install to a private URL or subdomain, and serve the static version of your site by deploying the Workers application to your domain. See [Deploying to a Domain](/quickstart/#publish-to-your-domain) to learn more!
- Run your Wordpress instance locally, or put your now-hidden WP instance behind something like [Cloudflare Access](https://www.cloudflare.com/products/cloudflare-access/) to only give access to your contributors. This has a dramatic effect on the number of attack vectors for your Wordpress site and its content.
- Downgrade your Wordpress hosting plan to a cheaper plan. Because the memory and bandwidth requirements for your Wordpress instance are now much smaller, you can often get away with hosting it on a cheaper plan, or moving to shared hosting. Your Cloudflare Workers plan is priced per-request, and because you can host up to thirty sites on your account, serving a high number of static Wordpress sites can be an order of magnitude cheaper on Workers.

We're super excited about the future of Workers and Wordpress, and we'd love to hear about what you're building with them! TODO: FEEDBACK ME PLZ ?
