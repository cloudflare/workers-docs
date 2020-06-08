---
title: Commands
weight: 2
---

- [👯 `generate`](#generate)
- [📥 `init`](#init)
- [🦀⚙️ `build`](#build)
- [🔧 `config`](#config)
- [☁️ 🆙 `publish`](#publish)
  * [workers.dev](#publishing-to-workersdev)
  * [Registered domain](#publishing-to-your-own-domain)
  * [Multiple domains](#publishing-the-same-code-to-multiple-places)
- [👂 `dev`](#dev-alpha-)
- [🦚 `tail`](#tail)
- [🔬 `preview`](#preview)
  * [Making it work with WSL](#making-preview-work-with-wsl2)
- [🗂️ `kv`](#kv)
- [🤫 `secret`](#secret)


###  generate

  Scaffold a project, including boilerplate for a Rust library and a Cloudflare Worker.
  You can pass a name and template to this command optionally.

  ```bash
  wrangler generate <name> <template> --type=["webpack", "javascript", "rust"] --site
  ```

  All of the arguments and flags to this command are optional:

  - `name`: defaults to `worker`
  - `template`: defaults to the [`https://github.com/cloudflare/worker-template`](https://github.com/cloudflare/worker-template)
  - `type`: defaults to ["webpack"](/tooling/wrangler/webpack)
  - `--site`: generates a [Workers Site](/sites) from an existing static site

###  init

  Creates a skeleton `wrangler.toml` in an existing directory. This can be used as an alternative to `generate` if you prefer to clone a repository yourself.

  ```bash
  wrangler init <name> --type=["webpack", "javascript", "rust"] --site
  ```

  All of the arguments and flags to this command are options:

  - `name`: defaults to the name of your working directory
  - `type`: defaults to ["webpack"](/tooling/wrangler/webpack).
  - `--site`: generates a [Workers Site](/sites) from an existing static site

### build

  Build your project. This command looks at your `wrangler.toml` file and runs the build steps associated
  with the `"type"` declared there.

  Additionally, you can build different environments. This is useful if you have different builds for different environments, but typically isn't needed. For more information see the [environments documentation](/tooling/wrangler/configuration/environments).

### config

  Configure your global Cloudflare user. This is an interactive command that will prompt you for your API token:

  ```bash
  wrangler config
  Enter API token:
  superlongapitoken
  ```
  You can also provide your email and global API key (this is not recommended for security reasons):
  ```bash
  wrangler config --api-key
  Enter email:
  testuser@example.com
  Enter global API key:
  superlongapikey
  ```

  You can also [use environment variables](/tooling/wrangler/configuration/) to configure these values.

### publish

  Publish your Worker to Cloudflare. Several keys in your `wrangler.toml` determine whether you are publishing to a workers.dev subdomain or your own registered domain, proxied through Cloudflare.

  ```bash
  wrangler publish
  ```

  To use this command, the following fields are required in your `wrangler.toml`.

| Key        | Value                                                        | Example                                           |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------- |
| name       | the name of your worker                                      | `name = "your-worker"`                            |
| type       | build type (webpack, rust, or javascript)                    | `type = "webpack"`                                |
| account_id | your Cloudflare account ID, this can be found in the Cloudflare dashboard | `account_id = "a655bacaf2b4cad0e2b51c5236a6b974"` |

  From here, you have two options, you can choose to publish to your own domain or you can choose to publish to [\<your-worker\>.\<your-subdomain\>.workers.dev](https://workers.dev).

#### Publishing to workers.dev

  If you want to publish to [workers.dev](https://workers.dev), you will first need to have a [workers.dev](https://workers.dev) subdomain registered. You can register a subdomain by executing:

```bash
  wrangler subdomain <name>
```

  After you have registered a subdomain, add `workers_dev` to your `wrangler.toml`.

| Key         | Value | Example              |
| ----------- | ----- | -------------------- |
| workers_dev | true  | `workers_dev = true` |

#### Publishing to your own domain

  If you would like to publish to your own domain, you will need to specify these three fields in your `wrangler.toml`.

| Key             | Value                                     | Example                                        |
| -----------     | ----------------------------------------- | ---------------------------------------------- |
| zone_id         | Your Cloudflare zone ID*                  | `zone_id = "b6558acaf2b4cad1f2b51c5236a6b972"` |
| route OR routes | The route(s) you would like to publish to | `route = "example.com/my-worker/*"` or <br /> `routes = ["example.com/foo/*", example.com/bar/*]` |

  *Note: Your Cloudflare Zone ID can be found in the [Cloudflare dashboard](https://dash.cloudflare.com).

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
   * `--port PORT`: the port for your local log server
   * `--metrics-port PORT`: the port for serving [metrics information](https://developers.cloudflare.com/argo-tunnel/reference/arguments/#metrics) about the tunnel.

#### Parsing with jq

`wrangler tail` outputs each request as a JSON object, making it difficult to read directly. Parsing requests with [jq](https://stedolan.github.io/jq) makes it easy to pretty-print with colorization, as well as select and format output as needed.

  For example, this `jq` command will flatten `console.log()` statements:

  ```shell
  wrangler tail | jq -r \
       '# loop through all logs
    .logs[] as $log |
        # loop through messages in each log
    $log.message[] as $message |
        # set variables for clarity in format string
    .event.request.headers."cf-connecting-ip" as $ip |
    ($log.timestamp / 1000 | todate) as $datetime |
        # Format the output
    "[\($datetime)][\($log.level)][\($ip)] \($message)"'
  ``` 
  
  Output:
  ```
  [2020-06-06T18:59:55Z][log][1.2.3.4] a log message
  [2020-06-06T18:59:55Z][log][1.2.3.4] another log message
  ```

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

##### Setting $BROWSER to your browser binary
  WSL is a Linux environment, so `wrangler` attempts to invoke `xdg-open` in order to open your browser. To make `wrangler preview` work with WSL, you should set your `$BROWSER` to the path of your browser binary.

  eg. `$ export BROWSER='/mnt/c/tools/firefox.exe'
  `
  Spaces in filepaths are not common in Linux, and some programs like `xdg-open` break on [paths with spaces](https://github.com/microsoft/WSL/issues/3632#issuecomment-432821522). You can work around this by linking the binary to your `/usr/local/bin`.

  eg. $ ln -s '/mnt/c/Program Files/Mozilla Firefox/firefox.exe' firefox
      $ export BROWSER=firefox

##### Setting $BROWSER to `wsl-open`
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

  Interact with your secrets. [Check out the docs.](/tooling/wrangler/secrets)
