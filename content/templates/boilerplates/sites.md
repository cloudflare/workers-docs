# Sites

Worker Sites is a feature of Wrangler that allows you to easily deploy static assets to the Cloudflare edge.

To use this feature, you'll take one of three routes:

- [Create a new project from scratch](#create-a-new-project-from-scratch): Start from a blank slate and deploy an HTML based site to the Workers Platform.
- [Deploy a pre-existing static site project](#deploy-a-pre-existing-static-site-project): Already have a static site project? Using a pre-existing site generated from popular geneators like Hugo, Jekyll, or Gatsby and deploy to the Workers Platform.
- [Add static assets to a pre-existing worker project](#add-static-assets-to-a-pre-existing-worker-project): Start with a pre-existing project on the Workers Platform and add static asset serving to it.

### Create a new project from scratch

To start from scratch to create a Workers Site, follow these steps:

1.  Ensure you have Wrangler and Node.js installed. [For more info, click here.]
2.  In your terminal run `wrangler generate --site <project-name>`, replacing `<project-name>` with the name of your project. For example, I'll create a project called mySite by running this command:

    ```
    wrangler generate --site mySite
    ```

    This command creates the following:

    - `dist`: This directory contains the generated javascript for your Worker. Don't edit this!
    - `public`: This directory contains the static assets for your project. By default it contains an `index.html` and a `favicon`.
    - `worker-site`: This directory contains the JavaScript for serving your assets. You don't need to edit this- but if you want to see how it works, or add more funcationality to your Worker, you can edit `worker-site/index.js`.
    - `wrangler.toml`: This is your configuration file. You'll configure your account and project information here.

3.  Add your `account_id` your `wrangler.toml`. You can find your `account_id` on the left sidebar of the Workers Dashboard. Note: You may need to scroll down! For more details on finding your `account_id` click [here](https://developers.cloudflare.com/workers/quickstart/#account-id-and-zone-id).

4.  You can preview your site by running:

    ```
    wrangler preview
    ```

5.  Decide where you'd like to publish your site to: your personal domain registered with Cloudflare, or a workers.dev subdomain. Then, update your `wrangler.toml`:

    - **Personal Domain**: Add your `zone_id` and a `route`.

          	```
          	zone_id = "<zone_id>"
          	route = "exmaple.com/*"
          	```

    - **workers.dev**: Ensure that `workers_dev` is set to true. This is the default, so you should be all set.

          	*Note: If you are pushing a new workers.dev Worker project you may initially see 523 errors. Do not fear! The DNS is propogating and can take a few seconds. It should work after a minute or so.*

    You can learn more about configuring your project [here](https://developers.cloudflare.com/workers/quickstart/#configure).

6.  Run:

    ```
    wrangler publish
    ```

### Deploy a pre-existing static site project

To deploy a pre-existing static site project, you'll need to start with a pre-generated site. Workers Sites works well with all static site generators! For a quickstart, check out the following projects:

- [Hugo](https://gohugo.io/getting-started/quick-start/)
- [Gatsby](https://www.gatsbyjs.org/docs/quick-start/), requires Node
- [Jekyll](https://jekyllrb.com/docs/), requires Ruby
- [Eleventy](https://www.11ty.io/#quick-start), requires Node

Once you have a site generated, follow these steps:

1. Run this Wrangler command in the root of your project's directory:

```
$ wrangler init --site
```

This command creates a few things: - `wrangler.toml` - `worker-site`

2. Add your site's build directory to the `wrangler.toml`:

```toml
[site]
bucket = "" # <-- Add your build directory name here!
entry-point = "workers-site"
```

The default directories for the most popular static site generators are listed below:

- Hugo: `public`
- Gatsby: `public`
- Jekyll: `_site`
- Eleventy: `_site`

3.  Add your `account_id` your `wrangler.toml`. You can find your `account_id` on the left sidebar of the Workers Dashboard. Note: You may need to scroll down! For more details on finding your `account_id` click [here](https://developers.cloudflare.com/workers/quickstart/#account-id-and-zone-id).

4.  You can preview your site by running:

    ```
    wrangler preview
    ```

5.  Decide where you'd like to publish your site to: your personal domain registered with Cloudflare, or a workers.dev subdomain. Then, update your `wrangler.toml`:

    - **Personal Domain**: Add your `zone_id` and a `route`.

          	```
          	zone_id = "<zone_id>"
          	route = "exmaple.com/*"
          	```

    - **workers.dev**: Ensure that `workers_dev` is set to true. This is the default, so you should be all set.

          	*Note: If you are pushing a new workers.dev Worker project you may initially see 523 errors. Do not fear! The DNS is propogating and can take a few seconds. It should work after a minute or so.*

    You can learn more about configuring your project [here](https://developers.cloudflare.com/workers/quickstart/#configure).

6.  Run:

    ```
    wrangler publish
    ```

### Add static assets to a pre-existing worker project

If you have a pre-existing Worker project, you can use Workers Sites to add static asset serving to the Worker. To do so, follow these instructions:

1. Create a directory in the root of your project and add configuration to your `wrangler.toml` to point to it. Also add the path to your Worker script (probably `index.js`).

```toml
# Wrangler.toml

[site]
bucket = "<your dirname here>" # <-- Add the name of the dir that contains your static assets
entry-point = "index.js"

```

2. Add the `@cloudflare/kv-asset-handler` package to your project:

```
npm i @cloudflare/kv-asset-handler
```

3. Import the package's code into your Worker script, and use it in the handler you'd like to respond with static assets:

```
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    let pathname = new URL(event.request.url).pathname;
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: "not found"
    });
  }
}
```

4. You should now be all set you can run `preview` or `publish` as you would normally with your Worker project!

## Site Configuration Reference

There are a few specific configuration settings for Workers Sites in your `wrangler.toml`:

| Key           | Value                                                                              | Example                          |
| ------------- | ---------------------------------------------------------------------------------- | -------------------------------- |
| `bucket`      | The directory containing your static assets, path relative to your `wrangler.toml` | `bucket = "./dist"`              |
| `entry-point` | The location of your Worker script, default is `workers-site`                      | `entry-point = "./workers-site"` |

If you follow the `wrangler generate --site` or `wrangler init --site` instructions, `entry-point` will be auto-filled for you with the default, `workers-site`, which a directory containing the Worker, `workers-site/index.js` that serves your assets.

If you used `wrangler generate --site` you should be all set!
If you use `wrangler init --site` you'll need to add a value for `bucket` based on the static site generator you use.

If you are adding static assets to a pre-existing Worker, you'll need to configure both `bucket` and `entry-point`. See above for more details!

Note if using [environments](./environments) make sure to place `site` at the top level config.
