# Serverless.yml

The `serverless.yml` file is what molds the Worker(s) of your project. Using the [Server Cloudflare Workers plugin](TODO link), a `serverless.yml` will look like: 

```yml
# serverless.yml
service:
    name: hello
    config:
      accountId: CLOUDFLARE_ACCOUNT_ID 
      zoneId: CLOUDFLARE_ZONE_ID 

provider:
  name: cloudflare

plugins:
  - serverless-cloudflare-workers

functions: ..
```

#### Services

A **Service** is the Serverless Framework's unit of organization. You can think of it as a project file, though you can have multiple services for a single application. It's where you define your Functions and the routes they will live on, all in one file entitled `serverless.yml`: 

```yml
# serverless.yml
service:
    name: hello
    config:
      accountId: CLOUDFLARE_ACCOUNT_ID 
      zoneId: CLOUDFLARE_ZONE_ID 

provider:
  name: cloudflare

plugins:
  - serverless-cloudflare-workers

functions: ..
```

`name`: the project name which will prefix the function and script names that will show on Cloudflare as script name (e.g script with the name `hello` will look like a script with the name `hello-blah-foo` on Cloudflare)

`config`:

- `accountId`: the account that *owns* the zone that you wish to deploy Workers too. Note: this may not be the account ID you are signed in as, but will be the account ID you see in the URL once you've selected the zone

- `zoneId`: the zone desired to deploy Workers to

  To find your zoneId and accountId, please see [API documentation on resource IDs](https://api.cloudflare.com/#getting-started-resource-ids)

#### Functions

A Function is a Cloudflare Worker - a single script including its bindings, routes and other config. It's an independent unit of deployment, like a microservice. It's merely code, deployed on Cloudflare’s 155+ PoPs [points of presence](TODO: can we reference this PoPsnumber somewhere instead of hard coding it? ), that is most often written to perform a single job as a Worker.

 `serverless.yml`: (TODO: make this yml pretty)

```
  functions:
      functionName:
          worker: scriptName
          script: filename
          webpack: true
          environment:
              CLOUDFLARE_AUTH_KEY: <your-api-key>
              CLOUDFLARE_AUTH_EMAIL: <your-email>
          resources: ...
          events: ...
```

`worker`: the name of which the script will be as in this case`scriptName`

`script`: the path to the script from the current directory 

`webpack`(*optional*): specifies what webpack operation to perform on this individual Worker script. See webpack

`environment`(*optional*) : any environment variables set before deploy this will be passed as a binding as a secret [TODO: link to kv secrets ]to the scripts deployed. If `CLOUDFLARE_AUTH_KEY` and `CLOUDFLARE_AUTH_EMAIL` are omitted make sure to set them in your environment variables. **Please don't commit a file with your API key**. See more in Auth[TODO: link]

`resources`(*optional*) : see Resources below

`events`(*optional*) : Any routing for a Worker is configured here. See Events below

##### Webpack

The webpack option under functions allows you to easily use multiple scripts or libraries and not worry about a complicated build pipeline.

It can accept a boolean or a string. Possible behaviors:

`boolean`: will automatically bundle the function if set to "true" with the global webpack config

`string`:  a function level webpack configuration in addition to a global webpack configuration. This helps you to process bundling different for an individual function than the global webpack config . To use this, set the webpack config path to the function level `webpack` variable. Setting function level `webpack` variable to `true` will force webpack to bundle the function script with a default web pack configuration. Setting `webpack` key to `false` will turn off webpack for the function. (i.e the function script will not be fetched from dist folder)

Simply add `webpack: true | <config path>` to your config block.

For example in your script you can now use `import`:

```
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

import hello from './includeMe';

async function handleRequest(request) {
  return new Response(hello.hello())
}
```

If your handler script looks like the above, the includeMe script will be packed into the final script on deployment.

[View the Cloudflare Workers events section for more information on HTTP events](https://serverless.com/framework/docs/providers/cloudflare/events).

##### Resources

```
    resources:
      wasm:
      kv:
```

[TODO: fill in ]

##### Events

Anything that triggers a Cloudflare Worker to execute is regarded by the Framework as an **Event**. 

```
    events:
    	- http:
          url: example.com/hello/user
          method: GET
          headers:
            someKey: someValue
```

Each event implements two behaviors:

 `serverless invoke <functionname>` will deploy your worker and run the HTTP request(s) specified by the event(s) against this deployed worker. This is useful for defining specific hooks into your application for testing.

 `serverless deploy` will parse out all the `url`(s) from the events in a function and deploy routes all pointing to that specific script. The routes will not contain wildcards, but be the [TODO verify this] You cannot have multiple routes that are identical

TODO: link to CLI section

### 