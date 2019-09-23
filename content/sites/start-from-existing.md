---
title: Start from an Existing Site
alwaysopen: true
weight: 3
---

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
bucket = "./public" # <-- Add your build directory name here!
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
