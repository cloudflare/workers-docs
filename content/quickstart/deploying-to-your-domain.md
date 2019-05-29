---
title: 'Deploying To Your Domain'
---

If you are deploying your Workers application to a domain configured on your Cloudflare account, you'll need to configure your `wrangler.toml` with the following configuration details for your domain:

- Global API key
- Email address associated with your Cloudflare account
- Account ID
- Zone ID
- Route

For a helpful guide to finding these keys and configuring Wrangler to use them, visit the ["Finding Your Cloudflare API Keys"](/quickstart/api-keys/) page in our documentation.

With these keys, you can use Wrangler to set up your default credentials for deploying to Cloudflare Workers, via the `config` subcommand:

```sh
$ wrangler config <email> <global_api_key>
```

The remainder of your configuration details should be used to populate your project's `wrangler.toml` config. By default, your `wrangler.toml` looks like this:

```toml
# wrangler.toml

# The name of your Workers application
name = "my-worker"

# Your Cloudflare account ID
account_id = "$yourAccountId"

# Your Cloudflare zone ID
zone_id = "$yourZoneId"

# The route pattern your Workers application will be served at
route = "$yourRoute"

# The kind of application you're deploying to Cloudflare
type = "webpack"
```

A route will need to be selected for your app: where it will be hosted and accessible by your users. The route field here is a _pattern_: if we chose the route `my-worker.cloudflare.com`, the Worker would _only_ run on that exact subdomain, at the _root_ path. If you changed the route to `my-worker.cloudflare.com/*` (using the `*` or _wildcard_ symbol), the Worker would then run on any path on that subdomain, for instance, `my-worker.cloudflare.com/test`, or even `my-worker.cloudflare.com/test/123`. Learn more about routes [here](/reference/workers-concepts/routes/).
