---
title: Wrangler Reference
alwaysopen: true
weight: 5
---

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
