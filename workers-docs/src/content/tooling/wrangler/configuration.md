---
title: Configuration
weight: 2
alwaysopen: true
---

- [Global User](#global-user)
  - [Using commands](#using-commands)
  - [Using environment variables](#using-environment-variables)
- [wrangler.toml](#wrangler-toml)
  - [Top Level Config](#top-level-config)
  - [Environments Level Config (Optional)](#environments-level-config-optional-)
  - [Example `wrangler.toml`](#example)
  - [Keys](#keys)
    - [vars](#vars)
    - [kv-namespaces](#kv-namespaces)
    - [site](#site)

There are three levels of configuration that `wrangler` uses: global user, project and environment.

## Global User

In Cloudflare's system, you have a User that can have multiple Accounts and Zones. As a result, your User is configured globally on your machine via a single Cloudflare Token. Your Account(s) and Zone(s) will be configured per project, but will use your Cloudflare Token to authenticate all API calls. A config file is created in a `.wrangler`
directory in your computer's home directory.

### Using commands

To set up `wrangler` to work with your Cloudflare user, use the following commands:

- 🔧 `config`: a command that prompts you to enter your `email` and `api` key.
- 🕵️‍♀️ `whoami`: run this command to confirm that your configuration is appropriately set up.
  When successful, this command will print out your user information, including the type of plan you
  are currently on.

### Using environment variables

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

## wrangler.toml

Your project will need to have several keys configured before you can publish your worker. These values are stored in a `wrangler.toml`file. You will need to manually edit this file to add these values before you can publish.

For all configurable fields, see the [table](#keys) below.

### Top Level Config

Top level configuration: the configuration values you specify at the top of your `wrangler.toml` will be applied to all environments if not otherwise specified in the environment.

### Environments Level Config (Optional)

Environment configuration: the configuration values you specify under an `[env.name]` in your `wrangler.toml`

Environments is a feature that allows you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on the commands that are deploying live Worker scripts:

- `build`
- `preview`
- `publish`

Environment keys can be [*inherited*](#keys) from the top level configure, but if specified trumps top level specificity. 

### Example

To illustrate how these levels are applied, here is a wrangler.toml using multiple environments:

```toml
# top level configuration
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "dev.example.com/*"
[site]
bucket = "./public"
entry-point = "workers-site"

# environment configuration
[env.staging]
name = "my-worker-staging"
route = "staging.example.com/*"
kv-namespaces = [
    { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279" },
    { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0" }
]

# environment configuration
[env.production]
workers_dev= true
kv-namespaces = [
    { binding = "FOO", id = "0d2ac74b498b48028cb68387c421e233" },
    { binding = "BAR", id = "0d8c101e168d03c65bddf4ba75150f33" }
]
```

Note: Global user was configured with the `wrangler config` command or environment variables.

### Keys

Keys to configure per project in your `wrangler.toml`.

**Top level only**: required to be configured at the top level of your wrangler.toml only; multiple environments on the same project must share this property

**Inherited** : Can be configured at the top level and/or environment. If the property is defined *only* at the top level, the environment will use the property value from the top level. If the property is defined in the environment, the environment value will override the top level value. 

**Not inherited**: Must be defined for every environment individually. 

| Field name                        | Level                           | Description                                                  | Required      |
| --------------------------------- | ------------------------------- | ------------------------------------------------------------ | ------------- |
| `name`                            | Inherited                       | The name of your Worker script.  If inherited, your environment name with be appended to the top level. | Required      |
| `type`                            | Top level only                  | Specifies how `wrangler build` will build your project. There are currently three options (`webpack`, `javascript`, and `rust`). | Required      |
| `zone_id`                         | Inherited                       | This is the ID of the "zone" or domain you want to run your script on. It can also be specified through the `CF_ZONE_ID` environment variable. | Optional \*   |
| `account_id`                      | Inherited                       | This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable. | Required      |
| `workers_dev`                     | Inherited, overridden  by route | This is a boolean flag that specifies if your worker will be deployed to your [workers.dev](https://workers.dev) subdomain. If omitted defaults to false. | Optional      |
| `route`                           | Not Inherited                   | This is the route you'd like to use your worker on. You need to include the hostname. Examples: `*example.com/*` `http://example.com/hello` | Optional \*\* |
| `routes`                          | Not Inherited                   | A list of routes you'd like to use your worker on. These follow exactly the same rules a `route`, but you can specify a list of them.<br />`routes = ["http://example.com/hello", "http://example.com/goodbye"]` | Optional \*\* |
| `webpack_config`                  | Inherited                       | This is the path to a custom webpack configuration file for your worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. You can read more [here](/tooling/wrangler/webpack). | Optional      |
| [`vars`](#vars)                   | Not Inherited                   | An object containing text variables that can be directly accessed in a Worker script. See [environment variables](TODO:link). | Optional      |
| [`kv-namespaces`](#kv-namespaces) | Not Inherited                   | These specify any [Workers KV](/reference/storage/) Namespaces you want to access from inside your Worker. Each namespace you include should have an entry in your `wrangler.toml` that includes: | Optional      |
| [`site`](#site)                   | Not Inherited                   | Determines the local folder to upload and serve from a Worker | Optional      |

\* This key is optional if you are using only a [workers.dev](https://workers.dev) subdomain.

\* \*One key of `route`OR `routes` is only if you are not using a [workers.dev](https://workers.dev) subdomain.

#### vars

Values to use in your Worker script as a text [environment variable](/reference/apis/environment-variables/).

Usage:

```toml
vars = { FOO = "some value", BAR = "some other string" }
```

| Key            | Value                                        |
| -------------- | -------------------------------------------- |
| `FOO`          | The variable to access in your Worker script |
| `"some value"` | The string value the variable resolves to    |

Note: Using secrets should be handled using [wrangler secret](/tooling/wrangler/secret/). The `vars` definition in your `wrangler.toml` must not contain newlines in order to be valid TOML.

#### kv-namespaces

[KV namespaces](/reference/apis/kv) to bind to your Worker and reference in your script.

Usage:

```toml
kv-namespaces = [
    { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279" },
    { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0" }
]
```

| Key       | Value                                                        | Required |
| --------- | ------------------------------------------------------------ | -------- |
| `binding` | After you've created a namespace, you must bind it to your Worker  so it is accessible from within the Worker script via a variable name you specify. | Yes      |
| `id`      | The ID of the namespace you wish to attach to the Worker     | Yes      |

Note: Creating your KV Namespaces should be handled using Wrangler's [KV Commands](/tooling/wrangler/kv_commands). 

You can also define your `kv-namespaces` using [alternative TOML syntax](https://github.com/toml-lang/toml#user-content-table).

#### site

A [Worker site](/sites) normally generated through [`wrangler generate --site`](/tooling/wrangler/commands/#generate) or [`wrangler init --site`](/tooling/wrangler/commands/#init).

Usage:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
```

| Key           | Value                                                                                                     | Example                          | Required |
| ------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------- | -------- |
| `bucket`      | The directory containing your static assets, path relative to your `wrangler.toml`                        | `bucket = "./public"`            | yes      |
| `entry-point` | The location of your Worker script, default is `workers-site`                                             | `entry-point = "./workers-site"` | no       |
| `include`     | A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload.   | `include = ["upload_dir"]`       | no       |
| `exclude`     | A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. | `exclude = ["ignore_dir"]`       | no       |

To learn more about the optional `include` and `exclude` fields, visit [Ignoring Subsets of Static Assets](/tooling/wrangler/sites/#ignoring-subsets-of-static-assets).

You can also define your `site` using [alternative TOML syntax](https://github.com/toml-lang/toml#user-content-inline-table).

##### Storage Limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 10MB limit per page or file.

##### Ignoring Subsets of Static Assets

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) - make sure to be on the [latest version](/quickstart/#updating-the-cli) - and the Workers [Unlimited plan](https://workers.cloudflare.com/sites#plans).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo's optional include and exclude fields](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).
This means that we use gitignore semantics when declaring which directory entries to include or ignore in uploads.

##### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
include = ["included_dir"] # must be an array.
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

##### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
exclude = ["excluded_dir"] # must be an array.
```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

##### Include > Exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

##### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

##### More about include/exclude patterns

You can learn more about the standard patterns used for include and exclude in the [gitignore documentation](https://git-scm.com/docs/gitignore).

##### Customizing your Build

Workers Sites projects use webpack by default. You can [bring your own webpack config](/tooling/wrangler/webpack/#using-with-workers-sites), however it is important to be cognizant of your `entry` and `context` settings.
