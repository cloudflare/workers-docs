---
title: Commands
weight: 1
---

- [👯 `generate`](#generate)
- [📥 `init`](#init)
- [🦀⚙️ `build`](#build)
- [🔧 `config`](#config)
- [☁️ 🆙 `publish`](#publish)
  - [workers.dev](#publishing-to-workersdev)
  - [Registered domain](#publishing-to-your-own-domain)
  - [Multiple domains](#publishing-the-same-code-to-multiple-places)
- [👂 `dev`](#dev-alpha-)
- [🦚 `tail`](#tail)
- [🔬 `preview`](#preview)
  - [Making it work with WSL](#making-preview-work-with-wsl2)
- [🗂️ `kv`](#kv)
- [🤫 `secret`](#secret)

## Install

You have many options to install wrangler!

### Install with `npm`

```bash
wrangler generate $name $template [--type=${webpack|javascript|rust}] [--site]
```

### Install with `cargo`

```bash
cargo install wrangler
```

If you don't have `cargo` or `npm` installed, you will need to follow these [additional instructions](#additional-installation-instructions).

## Additional Installation Instructions

Wrangler can be installed both through [npm](https://www.npmjs.com/get-npm) and through Rust's package manager, [Cargo](https://github.com/rust-lang/cargo).

### Using `npm`

1. If you don't already have npm on your machine, install it using [npm's recommended method](https://www.npmjs.com/get-npm), a node.js version manager.

   If you have already installed npm with a package manager, it is possible you will run into an `EACCES` error while installing wrangler. This is related to how many system packagers install npm. You can either uninstall npm and reinstall using the npm recommended install method (a version manager), or use one of our other install methods.

2. Install Wrangler by running:

   ```bash
   npm i @cloudflare/wrangler -g
   ```

### Using `cargo`

1. Install `cargo`:

   Rustup, a tool for installing Rust, will also install Cargo. On Linux and macOS systems, `rustup` can be installed as follows:

   ```bash
   curl https://sh.rustup.rs -sSf | sh
   ```

   Additional installation methods are available [here](https://forge.rust-lang.org/other-installation-methods.html).

2. Install `wrangler`:

   ```bash
   cargo install wrangler
   ```

   Installing wrangler on linux requires some [OpenSSL-related packages](https://docs.rs/openssl/0.10.24/openssl/#automatic) to be installed. If you don't want to deal with this, you can use vendored OpenSSL.

   ```bash
   cargo install wrangler --features vendored-openssl
   ```

### Manual Install

1. Download the binary tarball for your platform from our [releases page](https://github.com/cloudflare/wrangler/releases). You don't need to download wranglerjs, wrangler will install that for you.

2. Unpack the tarball and place the binary `wrangler` somewhere on your `PATH`, preferably `/usr/local/bin` for linux/macOS or `Program Files` for windows.

### generate

Scaffold a project, including boilerplate for a Rust library and a Cloudflare Worker.
You can pass a name and template to this command optionally.

```bash
wrangler generate [$name] [$template] [--type=${"webpack" | "javascript" | "rust"}] [--site]
```

|             |                                                              | Optional | Default value                                                |
| ----------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| `$name`     | Name of Worker                                               | True     | Worker                                                       |
| `$template` | Template to base new project off of                          | True     | [`worker-template`](https://github.com/cloudflare/worker-template) |
| `type`      | Type of project                                              | True     | "webpack"                                                    |
| `--site`    | Same of `template` but based off of default [site template](TODO: add link) | True     | N/A                                                          |

### init

Creates a skeleton `wrangler.toml` in an existing directory. This can be used as an alternative to `generate` if you prefer to clone a repository yourself.

```bash
wrangler init [$name]  [--type=${"webpack" | "javascript" | "rust"}] [--site]
```

|             |                                                              | Optional | Default value                                                |
| ----------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| `$name`     | Name of Worker                                               | True     | The name of working directory                                |
| `$template` | Template to base new project off of                          | True     | [`worker-template`](https://github.com/cloudflare/worker-template) |
| `--type`    | Type of project                                              | True     | "webpack"                                                    |
| `--site`    | Same of `template` but based off of default [site template](TODO: add link) |          | N/A                                                          |

### build

Build your project. This command looks at your `wrangler.toml` file and runs the build steps associated
with the`"type"` declared in your `wrangler.toml`.

```bash
wrangler build [--env $ENVIRONMENT_NAME]
```

|         |                                                              | Optional | Default value             |
| ------- | ------------------------------------------------------------ | -------- | ------------------------- |
| `--env` | Build a specific  environment. Note typically isn't needed. For more information see the [environments documentation](/tooling/wrangler/configuration/environments). | True     | The top level environment |

### config

Configure your global Cloudflare user. This is an interactive command that will prompt you for your API token:

```bash
wrangler config [--api-key]
```

|             |                                                              | Optional | Default value |
| ----------- | ------------------------------------------------------------ | -------- | ------------- |
| `--api-key` | To provide your email and global API key (this is not recommended for security reasons) instead of a token. | True     | N/A           |

You can also [use environment variables](/tooling/wrangler/configuration/) to authenticate.

### publish

Publish your Worker to Cloudflare. Several keys in your `wrangler.toml` determine whether you are publishing to a workers.dev subdomain or your own registered domain, proxied through Cloudflare.

```bash
wrangler publish [--env $ENVIRONMENT_NAME]
```

To use this command, the following fields are required in your `wrangler.toml`.

| Key        | Value                                                                     | Example                                           |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------- |
| name       | the name of your worker                                                   | `name = "your-worker"`                            |
| type       | build type (webpack, rust, or javascript)                                 | `type = "webpack"`                                |
| account_id | your Cloudflare account ID, this can be found in the Cloudflare dashboard | `account_id = "a655bacaf2b4cad0e2b51c5236a6b974"` |

From here, you have two options, you can choose to publish to your own domain or you can choose to publish to [\<your-worker\>.\<your-subdomain\>.workers.dev](https://workers.dev).

#### Subdomain

If you want to publish to [workers.dev](https://workers.dev), you will first need to have a [workers.dev](https://workers.dev) subdomain registered. You can register a subdomain by executing:

```bash
  wrangler subdomain $name
```

| Key     | Value                                                        |
| ------- | ------------------------------------------------------------ |
| `$name` | Name of the workers.dev subdomain you wish to deploy to (e.g. `name.workers.dev`) |

After you have registered a subdomain, add `workers_dev` to your `wrangler.toml`.

| Key         | Value | Example              |
| ----------- | ----- | -------------------- |
| workers_dev | true  | `workers_dev = true` |

#### Publishing to your own domain

If you would like to publish to your own domain, you will need to specify these three fields in your `wrangler.toml`.

| Key             | Value                                     | Example                                                                                           |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| zone_id         | Your Cloudflare zone ID\*                 | `zone_id = "b6558acaf2b4cad1f2b51c5236a6b972"`                                                    |
| route OR routes | The route(s) you would like to publish to | `route = "example.com/my-worker/*"` or <br /> `routes = ["example.com/foo/*", example.com/bar/*]` |

\*Note: Your Cloudflare Zone ID can be found in the [Cloudflare dashboard](https://dash.cloudflare.com).

#### Publishing the same code to multiple places

If you would like to be able to publish your code to multiple places, please see the documentation for [environments](/tooling/wrangler/configuration/environments).

### dev (alpha)

#### Disclaimer

This feature is still in alpha! The way this tool works in the future _will_ change, _**proceed with caution**_.

#### Usage

`wrangler dev` will start a server on `localhost` that connects to Cloudflare's servers and executes your Worker on incoming HTTP requests. After starting `wrangler dev` in a directory with a project, you can send it HTTP requests to test your Worker with clients such as cURL, Postman, or your browser.

You should run `wrangler dev` from your Worker directory, and if your Worker makes any requests to a backend, you should specify the host with `--host example.com`.

From here you can send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see console.log messages and exceptions appearing in your terminal. If either of these things _don't_ happen, or you think the output is incorrect, please [file an issue](https://github.com/cloudflare/wrangler).

If you have feedback about `wrangler dev` or general questions, we will respond [here](https://github.com/cloudflare/wrangler/issues/1047).

### tail

Starts a log tailing session for a deployed Worker.

```bash
wrangler tail [--port  PORT] [--metrics-port PORT]
```

#### Dependencies

Wrangler tail uses cloudflared under the hood. If you are already using cloudflared, be sure you have installed the latest version. Otherwise, follow the [getting started guide](https://developers.cloudflare.com/argo-tunnel/quickstart/) for Argo Tunnel.
`wrangler tail` will register a tailing session for your Worker, and start a server on `localhost` with a [tunnel](https://developers.cloudflare.com/argo-tunnel/quickstart/) that listens for incoming log requests from your Worker.

#### Usage

After starting `wrangler tail` in a directory with a project, you will receive a live feed of console and exception logs for each request your Worker receives.

Like all Wrangler commands, run `wrangler tail` from your Worker's root directory (i.e. the directory with your `wrangler.toml`).

## Optional Flags

- `--port PORT`: the port for your local log server
- `--metrics-port PORT`: the port for serving [metrics information](https://developers.cloudflare.com/argo-tunnel/reference/arguments/#metrics) about the tunnel.

### preview

Preview your project using the [Cloudflare Workers preview service](https://cloudflareworkers.com/).

By default, `wrangler preview` will only bundle your project a single time. To enable live preview,
where Wrangler will continually update the preview service with the newest version of your project,
pass the `--watch` flag:

```bash
wrangler preview --watch
```

You can optionally pass `get` or `post` and a `body` to this command. This will send a request to your
worker on the preview service and return the response in your terminal. For example:

GET requests can be sent with

```bash
wrangler preview
```

or

```bash
wrangler preview get
```

POST requests can be sent with

```bash
wrangler preview post hello=hello
```

Additionally, you can preview different environments. This is useful if you have different builds for different environments (like staging vs. production), but typically isn't needed. For more information see the [environments documentation](/tooling/wrangler/configuration/environments).

#### Previewing on Windows Subsytem for Linux (WSL 1/2)

##### Setting \$BROWSER to your browser binary

WSL is a Linux environment, so `wrangler` attempts to invoke `xdg-open` in order to open your browser. To make `wrangler preview` work with WSL, you should set your `$BROWSER` to the path of your browser binary.

eg. `$ export BROWSER='/mnt/c/tools/firefox.exe'`
Spaces in filepaths are not common in Linux, and some programs like `xdg-open` break on [paths with spaces](https://github.com/microsoft/WSL/issues/3632#issuecomment-432821522). You can work around this by linking the binary to your `/usr/local/bin`.

eg. $ ln -s '/mnt/c/Program Files/Mozilla Firefox/firefox.exe' firefox
      $ export BROWSER=firefox

##### Setting \$BROWSER to `wsl-open`

Another option is to install [wsl-open](https://github.com/4U6U57/wsl-open#standalone) and set the `$BROWSER` env variable to `wsl-open`, via `wsl-open -w`. This ensures that `xdg-open` uses `wsl-open` when it attempts to open your browser.

If you're using WSL 2, you will need to install `wsl-open` via their [standalone method](https://github.com/4U6U57/wsl-open#standalone) rather than through `npm`. This is because their npm package has not yet been updated with WSL 2 support.

### ➡️ `route`

List or delete a route associated with a zone:

```bash
wrangler route list
```

Will return a json response from the [List Routes API](/tooling/api/routes/#list-routes). Each entry includes the route id, pattern, and associated Worker name for a route. Piping this through a tool such as `jq` will pretty up the output.

```bash
wrangler route delete longhashedrouteid
```

Will remove the route specified by the indicated route id. Route IDs can be found by running the list routes command (above).

Both commands accept a `--env` flag in case you are working on a project that spans zones. For more information see the [environments documentation](/tooling/wrangler/configuration/environments).

### kv

Interact with your Cloudflare Workers KV store. [Check out the docs.](/tooling/wrangler/kv_commands)

### secret

## Interact with your secrets. [Check out the docs.](/tooling/wrangler/secrets)

title: KV
weight: 4

---

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Concepts](#concepts)
- [`kv:namespace`](#kv-namespace)
- [`kv:key`](#kv-key)
- [`kv:bulk`](#kv-bulk)

## KV

The `kv` subcommand allows you to store application data in the Cloudflare network to be accessed from Workers, using
[Workers KV](https://www.cloudflare.com/products/workers-kv/).
KV operations are scoped to your account, so in order to use any of these commands, you need to:

- have a Wrangler project set up with your `account_id` configured in the `wrangler.toml`
- call commands from within a Wrangler project directory.

### Getting Started

To use Workers KV with your Worker, the first thing you must do is create a KV namespace. This is done with
the `kv:namespace` subcommand.

The `kv:namespace` subcommand takes as a new binding name as an argument. It will create a Worker KV namespace
whose title is a concatenation of your Worker's name (from `wrangler.toml`) and the binding name you provide:

```console
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "worker-MY_KV"
✨  Success: WorkersKvNamespace {
    id: "e29b263ab50e42ce9b637fa8370175e8",
    title: "worker-MY_KV",
}
✨  Add the following to your wrangler.toml:
kv-namespaces = [
         { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

Make sure to add the `kv-namespaces` output above to your `wrangler.toml`. You can now
access it from a Worker with code like:

```js
let value = await MY_KV.get('my-key')
```

The full KV API for Workers can be found [here](/reference/storage/).

To put a value to your KV namespace via Wrangler, use the `kv:key put` subcommand.

```console
$ wrangler kv:key put --binding=MY_KV "key" "value"
✨  Success
```

You can also specify which namespace to put your key-value pair into using `--namespace-id` instead of `--binding`:

```console
$ wrangler kv:key put --namespace-id=e29b263ab50e42ce9b637fa8370175e8 "key" "value"
✨  Success
```

Additionally, KV namespaces can be used with [environments](/tooling/wrangler/configuration/environments)! This is useful for when you have code that refers to
a KV binding like `MY_KV`, and you want to be able to have these bindings point to different namespaces (like
one for staging and one for production). So, if you have a `wrangler.toml` with two environments:

```toml
[env.staging]
kv-namespaces = [
         { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]

[env.production]
kv-namespaces = [
         { binding = "MY_KV", id = "a825455ce00f4f7282403da85269f8ea" }
]
```

To insert a value into a specific KV namespace, you can use

```console
$ wrangler kv:key put --env=staging --binding=MY_MV "key" "value"
✨  Success
```

Since `--namespace-id` is always unique (unlike binding names), you don't need to pass environment variables for them (they will be unused).

There are way more helpful Wrangler subcommands for interacting with Workers KV, like ones for bulk uploads and deletes--check them out below!

## Concepts

Most `kv` commands require you to specify a namespace. A namespace can be specified in two ways:

1. With a `--binding`:
   ```sh
   wrangler kv:key get --binding=MY_KV "my key"
   ```
1. With a `--namespace_id`:
   ```sh
   wrangler kv:key get --namespace-id=06779da6940b431db6e566b4846d64db "my key"
   ```

Most `kv` subcommands also allow you to specify an environment with the optional `--env` flag. This allows you to publish workers running the same code but with different namespaces. For example, you could use separate staging and production namespaces for KV data in your `wrangler.toml`:

```toml
type = "webpack"
name = "my-worker"
account_id = "<account id here>"
route = "staging.example.com/*"
workers_dev = false

kv-namespaces = [
    { binding = "MY_KV", id = "06779da6940b431db6e566b4846d64db" }
]

[env.production]
route = "example.com/*"
kv-namespaces = [
    { binding = "MY_KV", id = "07bc1f3d1f2a4fd8a45a7e026e2681c6" }
]
```

With the wrangler.toml above, you can specify `--env production` when you want to perform a KV action on the namespace `MY_KV` under `env.production`. For example, with the wrangler.toml above, you can get a value out of a production KV instance with:

```console
wrangler kv:key get --binding "MY_KV" --env=production "my key"
```

To learn more about environments, check out the [environments documentation](/tooling/wrangler/configuration/environments).

<span id="kv-namespace"></span>

## `kv:namespace`

### `create`

Creates a new namespace.

Takes an optional `--env` [environment](/tooling/wrangler/configuration/environments) argument.

#### Usage

```console
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "worker-MY_KV"
✨  Success: WorkersKvNamespace {
    id: "e29b263ab50e42ce9b637fa8370175e8",
    title: "worker-MY_KV",
}
✨  Add the following to your wrangler.toml:
kv-namespaces = [
         { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

<span id="kv-list">

### `list`

Outputs a list of all KV namespaces associated with your account id.

#### Usage

The example below uses the `jq` command line tool to pretty-print output.

```console
$ wrangler kv:namespace list | jq '.'
[
    {
        "id": "06779da6940b431db6e566b4846d64db",
        "title": "TEST_NAMESPACE"
    },
    {
        "id": "32ac1b3c2ed34ed3b397268817dea9ea",
        "title": "STATIC_CONTENT"
    }
]
```

</span>
<span id="kv-delete">

### `delete`

Deletes a given namespace.

Requires `--binding` or `--namespace-id` argument.

Takes an optional `--env` [environment](/tooling/wrangler/configuration/environments) argument.

#### Usage

```console
$ wrangler kv:namespace delete --binding=MY_KV
Are you sure you want to delete namespace f7b02e7fc70443149ac906dd81ec1791? [y/n]
yes
🌀  Deleting namespace f7b02e7fc70443149ac906dd81ec1791
✨  Success
```

</span>
<span id="kv-key">

## `kv:key`

### `put`

Writes a single key/value pair to the given namespace.

Requires `--binding` or `--namespace-id` argument.

Optional params include:

1. `--env`: The [environment](/tooling/wrangler/configuration/environments) argument.
1. `--ttl`: Number of seconds for which the entries should be visible before they expire. At least 60. Takes precedence over 'expiration' option.
1. `--expiration`: Number of seconds since the UNIX epoch, indicating when the key-value pair should expire.
1. `--path`: Read value from the file at a given path. _This is good for security-sensitive operations, like uploading keys to KV; uploading from a file prevents a key value from being saved in areas like your terminal history._

#### Usage

```console
$ wrangler kv:key put --binding=MY_KV "key" "value" --ttl=10000
✨  Success
```

```console
$ wrangler kv:key put --binding=MY_KV "key" value.txt --path
✨  Success
```

</span>
<span id="kv-list">

### `list`

Outputs a list of all keys in a given namespace.

Requires `--binding` or `--namespace-id` argument.

Optional params include:

1. `--env`: The [environment](/tooling/wrangler/configuration/environments) argument.
1. `--prefix`: A prefix to filter listed keys.

#### Usage

The example below uses the `jq` command line tool to pretty-print output.

```console
$ wrangler kv:key list --binding=MY_KV --prefix="public" | jq '.'
[
    {
        "name": "public_key"
    },
    {
        "name": "public_key_with_expiration",
        "expiration": "2019-09-10T23:18:58Z"
    }
]
```

</span>
<span id="kv-get">

### `get`

Reads a single value by key from the given namespace.

Requires `--binding` or `--namespace-id` argument.

Takes an optional `--env` [environment](/tooling/wrangler/configuration/environments) argument.

#### Usage

```console
$ wrangler kv:key get --binding=MY_KV "key"
value
```

### `delete`

Removes a single key value pair from the given namespace.

Requires `--binding` or `--namespace-id` argument.

Takes an optional `--env` [environment](/tooling/wrangler/configuration/environments) argument.

#### Usage

```console
$ wrangler kv:key delete --binding=MY_KV "key"
Are you sure you want to delete key "key"? [y/n]
yes
🌀  Deleting key "key"
✨  Success
```

</span>
<span id="kv-bulk">

## `kv:bulk`

### `put`

Requires `--binding` or `--namespace-id` argument.

Writes a file full of key/value pairs to the given namespace. Takes as an argument a JSON file with a list of key-value pairs to upload (see JSON spec above). An example of JSON input:

```json
[
  {
    "key": "test_key",
    "value": "test_value",
    "expiration_ttl": 3600
  }
]
```

The schema below is the full schema for key-value entries uploaded via the bulk API:

| **Name**                       | **Description**                                                                                                                                                                          | Optional |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `key`<br />(String)            | A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.                                                                                     | no       |
| `value`<br />(String)          | A UTF-8 encoded string to be stored, up to 10 MB in length.                                                                                                                              | no       |
| `expiration`<br />(Number)     | The time, measured in number of seconds since the UNIX epoch, at which the key should expire.                                                                                            | yes      |
| `expiration_ttl`<br />(Number) | The number of seconds for which the key should be visible before it expires. At least 60.                                                                                                | yes      |
| `base64`<br />(Boolean)        | Whether or not the server should base64 decode the value before storing it. Useful for writing values that wouldn't otherwise be valid JSON strings, such as images. Defaults to `false` | yes      |

If both `expiration` and `expiration_ttl` are specified for a given key, the API will prefer `expiration_ttl`.

The `put` command also takes an optional `--env` [environment](/tooling/wrangler/configuration/environments) argument.

#### Usage

```console
$ wrangler kv:bulk put --binding=MY_KV allthethingsupload.json
✨  Success
```

</span>
<span id="=kv-delete">

### `delete`

Requires `--binding` or `--namespace-id` argument.

Deletes all specified keys within a given namespace.
Takes as an argument a JSON file with a list of key-value pairs to delete (see JSON spec above). An example of JSON input:

```json
[
  {
    "key": "test_key",
    "value": "test_value",
    "expiration_ttl": 3600
  }
]
```

The `delete` command also takes an optional `--env` [environment](/tooling/wrangler/configuration/environments) argument.

#### Usage

```console
$ wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json
Are you sure you want to delete all keys in allthethingsdelete.json? [y/n]
yes
✨  Success
```

</span>

Workers Sites require the latest version of [Wrangler](https://github.com/cloudflare/wrangler) and the Workers [Unlimited plan](https://workers.cloudflare.com/sites#plans).

## Sites

- **`wrangler generate proj --site`** : Creates a project with a Worker serving a generic HTML file and favicon with the directory structure:

  ```
  ├── public # files to serve
  |  ├── favicon.ico
  |  └── index.html
  ├── workers-site
  |  ├── index.js # Workers script that serves the assets
  |  ├── package-lock.json
  |  └── package.json # defines dependencies used by Workers script
  └── wrangler.toml
  ```

  Auto-fills `wrangler.toml` with `entry-point` (defaults to `workers-site`) and `bucket` (defaults to `public`).

- **`wrangler init proj --site`**: Creates a `wrangler.toml` and `workers-site` folder. You'll need to add a value for `bucket` based on the local path of folder you'd like to be serve.

## Secrets

### `put`

Interactive command to create or replace a secret

```bash
wrangler secret put <name> --env ENVIRONMENT_NAME
Enter the secret text you'd like assigned to the variable name on the script named my-worker-ENVIRONMENT_NAME:
```

- `name`: the variable name to be accessible in the script
- `--env`: (optional) binds the secret to the script of the specific [environment](/tooling/wrangler/configuration/environments/)

### `delete`

Interactive command to delete a secret from a specific script

```bash
wrangler secret delete <name> --env ENVIRONMENT_NAME
```

- `name`: the variable name to be accessible in the script
- `--env`: (optional) binds the secret to the script of the specific [environment](/tooling/wrangler/configuration/environments/)

### `list`

List all the secret names bound to a specific script

```bash
wrangler secret list --env ENVIRONMENT_NAME
```

- `--env`: (optional) binds the secret to the script of the specific [environment](/tooling/wrangler/configuration/environments/)
