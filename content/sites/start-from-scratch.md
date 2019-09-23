---
title: Start from Scratch
alwaysopen: true
weight: 2
---

To start from scratch to create a Workers Site, follow these steps:

1.  Ensure you have Wrangler and Node.js installed. [For more info, click here.]
2.  In your terminal run `wrangler generate --site <project-name>`, replacing `<project-name>` with the name of your project. For example, I'll create a project called my-site by running this command:

    ```
    wrangler generate --site my-site
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
