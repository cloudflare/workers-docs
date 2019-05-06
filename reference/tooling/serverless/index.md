

TODO: question for Jonathan:

- why are there three levels of naming? e.g. scriptname = `func-foo-bar` ? 
- are all urls -> routes not have wildcards? 
- is event.http a Request object/ 
- who owns the docs on serverless? 

TODO: missing concepts:

- environment variables in the serverless.yml
- bindings
- webpack
- CLI ref documentation
- rearrange service and additional documentation

# Serverless Plugin

The [Serverless Framework](https://github.com/serverless/serverless) helps you develop and deploy serverless applications using [Cloudflare Workers](https://www.cloudflare.com/products/cloudflare-workers/). It's a CLI that offers structure, automation, and best practices out-of-the-box, allowing you to focus on building sophisticated, event-driven, serverless architectures, comprised of Functions and Events. 

The Serverless Framework manages the infrastructure that turns your version controlled code into a Worker(s) deployed globally with one command. One config file directs where exactly this Worker will live, so you can modify code and have it re-built and re-deployed in moments. No visits to the browser required.

TODO: link to quick start and ref

### Additional Documentation

[The Documentation on Serverless](https://serverless.com/framework/docs/providers/cloudflare/) 

[Plugin on Github](<https://github.com/cloudflare/serverless-cloudflare-workers>)