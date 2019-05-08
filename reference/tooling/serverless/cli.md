
# Cloudflare Workers - Create
Creates a new Serverless service in the current working directory based on the provided template. [Read full documentation on the main serverless docs site](https://www.serverless.com/framework/docs/providers/cloudflare/cli-reference/deploy).

**Create service in current working directory:**

```bash 
serverless create --template cloudflare-workers
```

Or for Enterprise Cloudflare accounts:

```bash 
serverless create --template cloudflare-workers-enterprise
```

**Create service in new folder:**

```bash
serverless create --template cloudflare-workers --path my-service
```

Or for Enterprise Cloudflare accounts:

```bash 
serverless create --template cloudflare-workers-enterprise --path my-service
```

## Options
- `--template` or `-t` The name of one of the available templates. Required if --template-url and --template-path are not present.
- `--template-url` or `-u` The name of one of the available templates. Required if --template and --template-path are not present.
- `--template-path` The local path of your template. Required if --template and --template-url are not present.
- `--path` or `-p` The path where the service should be created.
- `--name` or `-n` the name of the service in `serverless.yml`.
## Provided lifecycle events
- `create:create`
## Available Templates for Cloudflare Workers
To see a list of available templates run `serverless create --help`
These are the current available templates for Cloudflare Workers:

- cloudflare-workers
- cloudflare-workers-enterprise
- cloudflare-workers-rust

## Examples
### Creating a new service
```bash
serverless create --template cloudflare-workers --name my-special-service
```

This example will generate scaffolding for a service with `Cloudflare` as a provider. The scaffolding will be generated in the current working directory.

### Creating a named service in a (new) directory
```bash
serverless create --template cloudflare-workers --path my-new-service
```

This example will generate scaffolding for a service with `Cloudflare` as a provider. The scaffolding will be generated in the `my-new-service` directory. This directory will be created if not present. Otherwise, Serverless will use the already present directory.
Additionally, Serverless will rename the service according to the path you provide. In this example, the service will be renamed to `my-new-service`.

### Creating a new service using a local template
```bash
serverless create --template-path path/to/my/template/folder --path path/to/my/service --name my-new-service
```
This will copy the `path/to/my/template/folder` folder into `path/to/my/service` and rename the service to `my-new-service`.




# Cloudflare Workers - Deploy
In order to be able to deploy any Cloudflare Workers, You will need to set your Global API key from Cloudflare as an environmental variable named `CLOUDFLARE_AUTH_KEY`, and your Cloudflare account email as an environmental variable named `CLOUDFLARE_AUTH_EMAIL`. You can get your Global API key from your [Cloudflare profile](https://dash.cloudflare.com/profile) page. You will also need to set `accountId` and `zoneId` in `serverless.yml` under `service.config`. The first part of the path when you open [Cloudflare dashboard](https://dash.cloudflare.com/) as a logged in user is your `accountId`, e.g. `dash.cloudflare.com/{accountId}`. And the `zoneId` can be found from the overview tab after selecting the desired zone from the [Cloudflare dashboard](https://dash.cloudflare.com/).

Environmental variables are variables that live inside your terminal.

For Mac and Linux users, you can set environmental variables like this:

```bash
export CLOUDFLARE_AUTH_KEY=YOUR_API_KEY_HERE
export CLOUDFLARE_AUTH_EMAIL=YOUR_CLOUDFLARE_EMAIL
```

And for Windows (CMD) users, you can set environmental variables like this:

```bash
set CLOUDFLARE_AUTH_KEY=YOUR_API_KEY_HERE
set CLOUDFLARE_AUTH_EMAIL=YOUR_CLOUDFLARE_EMAIL
```

You’ll need to redefine your environmental variables after each time you close your terminal.

The `serverless deploy` command deploys your entire service via the Cloudflare Workers API. Run this command when you have made service changes (i.e., you edited `serverless.yml`).
Use `serverless deploy -f my-function` when you have made code changes and you want to quickly upload your updated code to Cloudflare.

```bash
serverless deploy
```

This is the simplest deployment usage possible. With this command, Serverless will deploy your service to Cloudflare.

## Options
- `--verbose` or `-v`: Shows all stack events during deployment, and display any Stack Output.
- `--function` or `-f`: Invokes `deploy function` (see above). Convenience shortcut

## Provided lifecycle events
- `deploy:deploy`
- `deploy:function:deploy`

<!--
title: Serverless Framework Commands - Cloudflare Workers - Invoke
menuText: invoke
menuOrder: 3
description: Invoke a Cloudflare Workers Function using the Serverless Framework
layout: Doc
-->

<!-- DOCS-SITE-LINK:START automatically generated  -->
### [Read this on the main serverless docs site](https://www.serverless.com/framework/docs/providers/cloudflare-workers/cli-reference/invoke)
<!-- DOCS-SITE-LINK:END -->


# Cloudflare Workers - Invoke
Invokes a deployed function. It allows you to send an event to a deployed function, which can be useful for testing. Cloudflare Workers only support `GET` requests for now. The optional `headers` field allows you to specify headers that will be sent to your Worker along with your request.

```bash
serverless invoke --function functionName
```

In the following example, you could run:

```bash
serverless invoke --function helloWorld
```

```yml
# serverless.yml
 ...
functions:
  helloWorld:
    # What the script will be called on Cloudflare (this property value must match the function name one line above)
    name: helloWorld
    # The name of the script on your machine, omitting the .js file extension
    script: helloWorld
    events:
      - http:
          url: example.com/hello/user
          # Defines the method used by serverless when the `invoke` command is used. Cloudflare Workers only support GET requests for now
          method: GET
          headers:
            greeting: hi
```

## Options
* `--function` or `-f` The name of the function in your service that you want to invoke. Required.
* `--data` or `-d` String data to be passed as an event to your function. By default data is read from standard input.
* `--path` or `-p` The path to a json file with input data to be passed to the invoked function. This path is relative to the root directory of the service.

## Provided lifecycle events
- `invoke:invoke`

## Examples

### Cloudflare Workers
```bash
serverless invoke --function functionName
```

This example will invoke your deployed function on the configured Cloudflare Workers API URL endpoint. This will output the result of the request in your terminal.

#### Function invocation with data
```bash
serverless invoke --function functionName
```

# Cloudflare Workers - Remove
The `serverless remove` command will remove the deployed service, defined in your current working directory, from the provider.

```bash
serverless remove
```
It will remove the Cloudflare Worker functions from the Cloudflare.
## Provided lifecycle events
- `remove:remove`

#Plugin

For other commands related to what's going on under the hood of the Serverless plugin see the [Cloudflare Serverless Docs](<https://serverless.com/framework/docs/providers/cloudflare/cli-reference/plugin-install/>)

