---
title: Configuration
weight: 2
alwaysopen: true
---

- [Global User](#global-user)
  - [Using environment variables](#using-environment-variables)
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
CF_ACCOUNT_ID=youraccountid
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

Note environment variables will override whatever credentials you configured in `wrangler config` or in your `wrangler.toml`.

You can also specify or override the Zone ID used by `wrangler publish` with the `CF_ZONE_ID` environment variable.

### Per Project

Your project will need to have several things configured before you can publish your worker. These values are stored in a `wrangler.toml` file that `wrangler generate` will make for you. You will need to manually edit this file to add these values before you can publish.

- `name`: This is the name of your project. It will be the name of your script.
- `type`: This key tells `wrangler build` how to build your project. There are currently three options (`webpack`, `javascript`, and `rust`), but we expect there to be more as the community grows.
  - `javascript`\*: This project contains a single JavaScript file, defined in `package.json`'s `main` key.
  - `rust`: This project contains a Rust crate that uses `wasm-bindgen`. It will be built with `wasm-pack`.
  - `webpack`\*: This project contains any number of JavaScript files or Rust/C/C++ files that compile to
    WebAssembly. Rust files will be built with `wasm-pack`.
    This project type uses webpack and webpack plugins in the background to build your worker. You can read more about this type [here](/tooling/wrangler/webpack).
    _\* Note: All Javascript and webpack projects must include a package.json_
- `zone_id`: This is the ID of the "zone" or domain you want to run your script on. This is optional if you are using a [workers.dev](https://workers.dev) subdomain and is only required when `workers_dev` is false, or excluded from an [environment](/tooling/wrangler/configuration/environments) configuration. It can also be specified through the `CF_ZONE_ID` environment variable.
- `account_id`: This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable.
- `route`: This is the route you'd like to use your worker on. You need to include the hostname. Examples:

  - `*example.com/*`
  - `http://example.com/hello`

  This key is optional if you are using a [workers.dev](https://workers.dev) subdomain and is only required when `workers_dev` is false, or excluded from an [environment](/tooling/wrangler/configuration/environments).

- `routes`: A list of routes you'd like to use your worker on. These follow exactly the same rules a `route`, but you can specify a list of them.

  For example:

  ```toml
  routes = [
      "http://example.com/hello",
      "http://example.com/goodbye"
  ]
  ```

- `webpack_config`: This is the path to a custom webpack configuration file for your worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. You can read more [here](/tooling/wrangler/webpack).
- `workers_dev`: This is a boolean flag that specifies if your worker will be deployed to your [workers.dev](https://workers.dev) subdomain. For more information, please read the [environments documentation](/tooling/wrangler/configuration/environments).
- `vars`: An object containing text variables that can be directly accessed in a Worker script.

  ```toml
  vars = { FOO = "0f2ac74b498b48028cb68387c421e279", BAR = "068c101e168d03c65bddf4ba75150fb0" }
  ```

  Note: Using secrets should be handled using [wrangler secret](/tooling/wrangler/secret/). The `vars` definition in your `wrangler.toml` must not contain newlines in order to be valid TOML.

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

---

title: Webpack
weight: 3

---

Out of the box, Wrangler allows you to develop modern ES6 applications with support for modules. This is because of the 🧙‍♂️ magic of [webpack](https://webpack.js.org/). This document describes how Wrangler uses webpack to build your Workers, and how you can bring your own configuration.

**IMPORTANT: In order for Wrangler to use webpack to bundle your worker scripts, you must set `type = "webpack"` in your `wrangler.toml`, no other types will build your script with webpack.**

If you're here because you're seeing warnings about specifying `webpack_config`, click [here](#backwards-compatibility)

## Sensible Defaults

This is the default webpack configuration that Wrangler uses to build your worker:

```js
module.exports = {
  target: 'webworker',
  entry: './index.js', // inferred from "main" in package.json
}
```

Our default configuration sets `target` to `webworker`. From the [webpack docs](https://webpack.js.org/concepts/targets/):

> Because JavaScript can be written for both server and browser, webpack offers multiple deployment targets that you can set in your webpack configuration.

Cloudflare Workers are built to match the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), so we set our `target` to `webworker`.

The `entry` field is taken directly from the `main` field in your `package.json`. To read more about the webpack `entry` property, click [here](https://webpack.js.org/concepts/entry-points/).

## Bring your own configuration

You can tell Wrangler to use a custom webpack configuration file by setting `webpack_config` in your `wrangler.toml`. You'll want to make sure that `target` is always `webworker`.

### Example

`webpack.config.js`

```js
module.exports = {
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
}
```

`wrangler.toml`

```toml
type = "webpack"
name = "my-worker"
account_id = "12345678901234567890"
workers_dev = true
webpack_config = "webpack.config.js"
```

### Example with multiple environments

`wrangler.toml`

```toml
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
workers_dev = true
webpack_config = "webpack.development.js"

[env.staging]
name = "my-worker-staging"
webpack_config = "webpack.production.js"

[env.production]
name = "my-worker-production"
webpack_config = "webpack.production.js"
```

`webpack.development.js`

```js
module.exports = {
  target: 'webworker',
  devtool: 'cheap-module-source-map', // avoid 'eval': Workers environment doesn't allow it
  entry: './index.js',
  mode: 'development',
}
```

`webpack.production.js`

```js
module.exports = {
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
}
```

### Using with Workers Sites

Wrangler commands are run from the project root, so ensure your `entry` and `context` are set appropriately. For a project with structure:

```console
.
├── public
│   ├── 404.html
│   └── index.html
├── workers-site
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── webpack.config.js
└── wrangler.toml
```

webpack.config.js should look like this:

```js
module.exports = {
  context: __dirname,
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
}
```

## Shimming globals

Sometimes you want to bring your own implementation of an existing global API. You can do this by [shimming](https://webpack.js.org/guides/shimming/#shimming-globals) a third party module in its place as a webpack plugin.

For example, to replace the runtime global `URL` class with the npm package `url-polyfill` - or your choice of third party package - `npm i` the package to install it locally and add it to your worker's package.json, then add a plugin entry to your webpack config.

### Example with webpack plugin

`webpack.config.js`

```js
+ const webpack = require('webpack');

  module.exports = {
    target: "webworker",
    entry: "./index.js",
    mode: "production",
+   plugins: [
+     new webpack.ProvidePlugin({
+       URL: "url-polyfill",
+     }),
+   ],
  }
```

## Backwards Compatibility

If you are using a version of Wrangler before 1.6.0, worker projects will simply use any `webpack.config.js` that is in the root of your project. This is not always obvious, so we plan to require that you specify `webpack_config` in your `wrangler.toml` if you would like to use it. If you're seeing this warning and would like to use your `webpack.config.js`, simply add `webpack_config = "webpack.config.js"` to your wrangler.toml.

If you are using Workers Sites and want to specify your own webpack configuration, you will always need to specify this. By default, Wrangler will not assume the `webpack.config.js` at the root of your project is meant to be used for building your Worker.

---

title: Environments
weight: 3

---

- [Concepts](#concepts)
- [Usage](#usage)
  - [Examples](#examples)
  - [Custom webpack configurations](#custom-webpack-configurations)
  - [Environment Variables](#environment-variables)
- [Invalid configurations](#invalid-configurations)

Environments is a feature that allows you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on `wrangler build`, `wrangler preview`, and `wrangler publish`.

## Concepts

"top level configuration" refers to the configuration values you specify at the top of your `wrangler.toml`
"environment configuration" refers to the configuration values you specify under an `[env.name]` in your `wrangler.toml`

Here is an example `wrangler.toml` to illustrate

```toml
# top level configuration
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "dev.example.com/*"

# environment configuration
[env.staging]
name = "my-worker-staging"
route = "staging.example.com/*"

# environment configuration
[env.production]
name = "my-worker"
route = "example.com/*"
```

## Usage

The most common use case for environments is deploying to a staging subdomain before your production environment. `wrangler publish` will look at your top level configuration, and you can specify other environments beneath it. Each of these environments will inherit the values from the top level configuration if they are not specified, with the following caveats.

- `type` will always be inherited from the top-level configuration; you cannot specify different types for different environments.
- Fields that can be inherited from the top level are `account_id`, `zone_id`, `workers_dev`, and `webpack_config`. `kv_namespaces` and `route` must be defined for each environment and will not be inherited.
- `name` is inherited. If left out of the environment configuration, a Worker project named `my-worker` with an environment `[env.dev]` would become `my-worker-dev`.

### Examples

#### Top level configuration

##### Routes

This `wrangler.toml` has no environments defined and will publish `my-worker` to `example.com/*`

```toml
type = "webpack"
name = "my-worker"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"
```

```console
$ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to example.com/*
```

##### workers.dev

This `wrangler.toml` has no environments defined and will publish `my-worker` to `my-worker.<your-subdomain>.workers.dev`

```toml
type = "webpack"
name = "my-worker"
account_id = "12345678901234567890"
workers_dev = true # this field specifies that the worker should be deployed to workers.dev
```

```console
$ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker.<your-subdomain>.workers.dev
```

#### Introducing Environments

This `wrangler.toml` adds two environments to the base case. Note that you must provide a route/routes key for each environment if you are deploying to a custom domain.

```toml
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "dev.example.com/*"

[env.staging]
name = "my-worker-staging"
route = "staging.example.com/*"

[env.production]
name = "my-worker"
routes = [
	"example.com/foo/*",
	"example.com/bar/*"
]
```

In order to use environments with this configuration, you can pass the name of the environment via the `--env` flag.

With this configuration, Wrangler will behave in the following manner:

```console
$ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to dev.example.com/*
```

```console
$ wrangler publish --env staging
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to staging.example.com/*
```

```console
$ wrangler publish --env production
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to example.com/*
```

#### Staging Environment with workers.dev

In order to deploy your code to workers.dev, you must include `workers_dev = true` in the desired environment. Your `wrangler.toml` may look like this:

```toml
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"

[env.staging]
workers_dev = true
```

With this configuration, Wrangler will behave in the following manner:

```console
$ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to example.com/*
```

```console
$ wrangler publish --env staging
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker-staging.<your-subdomain>.workers.dev
```

#### workers.dev as a first class target

If you only want to deploy to workers.dev you can configure Wrangler like so:

```toml
name = "my-worker-dev"
type = "webpack"
account_id = "12345678901234567890"
workers_dev = true

[env.production]
name = "my-worker"

[env.staging]
name = "my-worker-staging"
```

With this configuration, Wrangler will behave in the following manner:

```console
$ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker-dev.<your-subdomain>.workers.dev
```

```console
$ wrangler publish --env staging
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker-staging.<your-subdomain>.workers.dev
```

```console
$ wrangler publish --env production
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker.<your-subdomain>.workers.dev
```

### Custom webpack configurations

You can specify different webpack configurations for different environments.

```toml
name = "my-worker-dev"
type = "webpack"
account_id = "12345678901234567890"
workers_dev = true
webpack_config = "webpack.dev.js"

[env.production]
name = "my-worker"
webpack_config = "webpack.config.js"

[env.staging]
name = "my-worker-staging"
```

Your default `wrangler build`, `wrangler preview`, and `wrangler publish` commands will all build with `webpack.dev.js`, as will `wrangler build -e staging`, `wrangler preview -e staging`, and `wrangler publish -e staging`. `wrangler build -e production`, `wrangler preview -e production`, and `wrangler publish -e production` would all use your `webpack.config.js` file.

### Environment Variables

You can specify different KV namespaces, secrets, and text variables for different environments.

```toml
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
workers_dev = true
kv-namespaces = [
    { binding = "KV", id = "06779da6940b431db6e566b4846d64db" }
]

[env.production]
kv-namespaces = [
    { binding = "KV", id = "bd46d6484b665e6bd134b0496ad97760" }
]
vars = {FOO = "some text"}
```

Note: Secret variables can be assigned to specific environments by passing the `-e/--env <environment_name>` flag while using the [`wrangler secret create`](/tooling/wrangler/secret/) command.

## Invalid configurations

### Multiple types

You cannot specify a type for each environment, type must be specified at the top level of your `wrangler.toml`.

```toml
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"
workers_dev = true

[env.staging]
type = "rust"
```

Wrangler will not error with this configuration, it will build with the `webpack` type.

### Same name for multiple environments

You cannot specify multiple environments with the same name. If this were allowed, publishing each environment would overwrite your previously deployed worker, and the behavior would not be clear.

```toml
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"

[env.staging]
name = "my-worker"
workers_dev = true
```

```console
$ wrangler publish
Error: ⚠️  Each name in your `wrangler.toml` must be unique, this name is duplicated: my-worker
```

```console
$ wrangler publish --env staging
Error: ⚠️  Each name in your `wrangler.toml` must be unique, this name is duplicated: my-worker
```

### Defining workers_dev and route

```toml
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"
workers_dev = true

[env.staging]
workers_dev = true
route = "staging.example.com/*"
```

Wrangler will fail to publish to an environment where `route` is defined alongside `workers_dev = true`.

```console
$ wrangler publish
Error: ⚠️  Your environment should only include `workers_dev` or `route`. If you are trying to publish to workers.dev, remove `route` from your wrangler.toml, if you are trying to publish to your own domain, remove `workers_dev`.
```

```console
$ wrangler publish --env staging
Error: ⚠️  Your environment should only include `workers_dev` or `route`. If you are trying to publish to workers.dev, remove `route` from your wrangler.toml, if you are trying to publish to your own domain, remove `workers_dev`.
```

## Sites

There are a few specific configuration settings for Workers Sites in your `wrangler.toml`:

| Key           | Value                                                                                                     | Example                          | Required |
| ------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------- | -------- |
| `bucket`      | The directory containing your static assets, path relative to your `wrangler.toml`                        | `bucket = "./public"`            | yes      |
| `entry-point` | The location of your Worker script, default is `workers-site`                                             | `entry-point = "./workers-site"` | no       |
| `include`     | A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload.   | `include = ["upload_dir"]`       | no       |
| `exclude`     | A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. | `exclude = ["ignore_dir"]`       | no       |

To learn more about the optional `include` and `exclude` fields, visit [Ignoring Subsets of Static Assets](/tooling/wrangler/sites/#ignoring-subsets-of-static-assets).

_Note: if your project uses [environments](/tooling/wrangler/configuration/environments), make sure to place `site` at the top level config._

Example of a `wrangler.toml`:

```toml
account_id = "95e..."
name = "docs-site-blah"
type = "webpack"
workers_dev = false

[site]
bucket = "./public"
entry-point = "workers-site"

[env.production]
name = "docs-site"
route = "https://example.com/docs*"
zone_id = "351c.."
account_id = "b54f07a.."

[env.staging]
zone_id = "ef47a..."
account_id = "95e5d..."
name = "docs-site-staging"
route = "https://staging.example.com/docs*"
```

### Storage Limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 10MB limit per page or file.

### Ignoring Subsets of Static Assets

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) - make sure to be on the [latest version](/quickstart/#updating-the-cli) - and the Workers [Unlimited plan](https://workers.cloudflare.com/sites#plans).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo's optional include and exclude fields](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).
This means that we use gitignore semantics when declaring which directory entries to include or ignore in uploads.

#### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
include = ["included_dir"] # must be an array.
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

#### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
exclude = ["excluded_dir"] # must be an array.
```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

#### Include > Exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

#### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

##### More about include/exclude patterns

You can learn more about the standard patterns used for include and exclude in the [gitignore documentation](https://git-scm.com/docs/gitignore).

### Customizing your Build

Workers Sites projects use webpack by default. You can [bring your own webpack config](/tooling/wrangler/webpack/#using-with-workers-sites), however it is important to be cognizant of your `entry` and `context` settings.
