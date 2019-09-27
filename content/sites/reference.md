---
title: Wrangler Reference
alwaysopen: true
weight: 5
---

Worker Sites require the latest version of [Wrangler](https://github.com/cloudflare/wrangler) and the Workers [Unlimited plan](https://workers.cloudflare.com/sites#plans).

### Commands

* **`wrangler generate proj --site`** :  Creates a project with a Worker serving a generic HTML file and favicon with the directory structure:

    ```
    ├── public #files to serve
    |  ├── favicon.ico
    |  └── index.html 
    ├── workers-site
    |  ├── index.js # Worker script that serves the assets 
    |  ├── package-lock.json
    |  └── package.json # node modules used by Worker script
    └── wrangler.toml
    ```
    Auto-fills wrangler.toml with  `entry-point`  with the default, `workers-site` and `bucket` with `public`.

* **`wrangler init —site`**: Creates a `wrangler.toml` and `workers-site` folder. You'll need to add a value for `bucket` based on the local path of folder you'd like to be serve.


### wrangler.toml

There are a few specific configuration settings for Workers Sites in your `wrangler.toml`:

| Key           | Value                                                                              | Example                          |
| ------------- | ---------------------------------------------------------------------------------- | -------------------------------- |
| `bucket`      | The directory containing your static assets, path relative to your `wrangler.toml` | `bucket = "./dist"`              |
| `entry-point` | The location of your Worker script, default is `workers-site`                      | `entry-point = "./workers-site"` |

Note if using [environments](https://github.com/cloudflare/wrangler/blob/master/docs/content/environments.md) make sure to place `site` at the top level config.

Example of a `wrangler.toml`:

```
account_id = "95e..."
name = "docs-site-blah"
type = "webpack"
workers_dev = false

[site]
bucket = "./public"
entry-point = "workers-site"

[env.production]
name = "docs-site"
route = "https://ex.com/docs*"
zone_id = "351c.."
account_id = "b54f07a.."

[env.staging]
zone_id = "ef47a..."
account_id = "95e5d..."
name = "docs-site-staging"
route = "https://staging.ex.com/docs*"
```

### Storage Limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 2MB limit per page. 