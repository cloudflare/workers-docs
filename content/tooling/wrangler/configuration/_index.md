---
title: Configuration
weight: 2
alwaysopen: true
---

- [Global User](#global-user)
  * [Using environment variables](#using-environment-variables)
- [Per Project](#per-project)

There are two types of configuration that `wrangler` uses: global user and per project.

### Global User

  In Cloudflare's system, you have a User that can have multiple Accounts and Zones. As a result, your User is configured globally on your machine. Your Account(s) and Zone(s) will be configured per project, but will use your User credentials to authenticate all API calls. This config file is created in a `.wrangler`
  directory in your computer's home directory.
  
  To set up `wrangler` to work with your Cloudflare user, use the following commands:

  - 🔧 `config`: a command that prompts you to enter your `email` and `api` key.
- 🕵️‍♀️ `whoami`: run this command to confirm that your configuration is appropriately set up.
    When successful, this command will print out your user information, including the type of plan you
    are currently on.
  
#### Using environment variables

  You can also configure your global user with environment variables. This is the preferred method for using Wrangler in CI.

  You can deploy with authentication tokens (recommended):

  ```bash
  # e.g.
  CF_API_TOKEN=superlongapitoken wrangler publish
  # where
  # $CF_API_TOKEN -> a Cloudflare API token
  ```

  Or you can deploy with your email and your global API key:

  ```bash
  # e.g.
  CF_EMAIL=testuser@example.com CF_API_KEY=superlongapikey wrangler publish
  # where
  # $CF_EMAIL -> your Cloudflare account email
  # $CF_API_KEY -> your Cloudflare API key
  ```
  Note that providing authentication credentials through environment variables will override whatever credentials you configured 
  if you ran `wrangler config`.

### Per Project

  Your project will need to have several things configured before you can publish your worker. These values are stored in a `wrangler.toml` file that `wrangler generate` will make for you. You will need to manually edit this file to add these values before you can publish.

  - `name`: This is the name of your project. It will be the name of your script.
  - `type`: This key tells `wrangler build` how to build your project. There are currently three options (`webpack`, `javascript`, and `rust`), but we expect there to be more as the community grows.
      - `javascript`: This project contains a single JavaScript file, defined in `package.json`'s `main` key.
      - `rust`: This project contains a Rust crate that uses `wasm-bindgen`. It will be built with `wasm-pack`.
      - `webpack`: This project contains any number of JavaScript files or Rust/C/C++ files that compile to
          WebAssembly. Rust files will be built with `wasm-pack`.
          This project type uses webpack and webpack plugins in the background to build your worker. You can read more about this type [here](/tooling/wrangler/webpack).
  - `zone_id`: This is the ID of the "zone" or domain you want to run your script on. This is optional if you are using a [workers.dev](https://workers.dev) subdomain and is only required when `workers_dev` is false, or excluded from an [environment](/tooling/wrangler/configuration/environments) configuration.
  - `account_id`: This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one.
  - `route`: This is the route you'd like to use your worker on. You need to include the hostname. Examples:

      - `*example.com/*`
      - `http://example.com/hello`
      
      This key is optional if you are using a [workers.dev](https://workers.dev) subdomain and is only required when `workers_dev` is false, or excluded from an [environment](/tooling/wrangler/configuration/environments). 

  - `webpack_config`: This is the path to a custom webpack configuration file for your worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. You can read more [here](/tooling/wrangler/webpack).
  - `workers_dev`: This is a boolean flag that specifies if your worker will be deployed to your [workers.dev](https://workers.dev) subdomain. For more information, please read the [environments documentation](/tooling/wrangler/configuration/environments).
  - `kv-namespaces`: These specify any [Workers KV](/reference/storage/) Namespaces you want to access from
      inside your Worker. Each namespace you include should have an entry in your `wrangler.toml` that includes:

      - `binding`: the name you want to bind to in your script
      - `id`: the namespace_id assigned to your KV Namespace upon creation.

      For example:

      ```toml
      kv-namespaces = [
          { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279" },
          { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0" }
      ]
      ```

      Note: Creating your KV Namespaces should be handled using Wrangler's [KV Commands](/tooling/wrangler/kv_commands).

  #### Environments

  Additionally, you can configure Wrangler to publish to multiple environments. This means that your same codebase can be deployed to multiple places on your [workers.dev](https://workers.dev) subdomain, across multiple accounts, zones, and routes. Read more [here](/tooling/wrangler/configuration/environments).