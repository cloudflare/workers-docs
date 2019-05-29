---
title: Overview
---

Cloudflare Workers provides a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

## Discover What You Can Build with Tutorials

- [Quick Start](/quickstart)
Build and publish code from the CLI

- [Build An Application](/tutorials/build-an-application)
Create a Slack Bot for GitHub

- [Build A Serverless Function](/tutorials/build-a-serverless-function)
Deploy a QR code reader

- [Configure Your CDN](./tutorials/configure-your-cdn)
Serve and cache files from cloud storage


## Getting Started through Templates

#### Hello World
```
wrangler generate myApp https://github.com/cloudflare/worker-template
```

Simple Hello World in JS

[Demo](https://cloudflareworkers.com/#6626eb50f7b53c2d42b79d1082b9bd37:https://tutorial.cloudflareworkers.com)

#### Hello World Rust
```
wrangler generate myApp https://github.com/cloudflare/rustwasm-worker-template
```

Simple Hello World in Rust

[Demo](https://cloudflareworkers.com/#1992963c14c25bc8dc4c50f4cab740e5:https://tutorial.cloudflareworkers.com)


#### Router
```
wrangler generate myApp https://github.com/cloudflare/worker-template-router
```
Direct requests to the appropriate handler function

[Demo](https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/bar)

#### Static
```
wrangler generate myApp https://github.com/cloudflare/worker-template-static
```

Generate HTML and JSON

[Demo](https://cloudflareworkers.com/#3160870d853b4df56a711621c7bd4ef3:https://tutorial.cloudflareworkers.com/static/html)

#### Fetch
```
wrangler generate myApp https://github.com/cloudflare/worker-template-fetch
```

Send requests from your Workers application

See more[/templates]

## Reference
[Runtime APIs](/reference/runtime/apis)
Global variables immediately available into your code
[Concepts](/reference/workers-concepts)
The need to know while writing Workers scripts. 
[Tooling](/reference/tooling)
Build and deploy with integrated tools
[API](/reference/tooling/api)
Deploy using the Cloudflare API
