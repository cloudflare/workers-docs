---
title: 'FAQ'
weight: 80
---

## General

### How fast are Workers?

Even though they’re written in JavaScript, your Workers ultimately execute as dynamically
compiled machine code. Most simple Workers can be expected to respond within a
millisecond, adding no measurable delay to your requests and responses.

### How many requests-per-second can I expect Workers to handle?

Workers run on Cloudflare’s globally distributed network of thousands of servers.
There is no explicit limit to how many requests you can process per second. Workers
can automatically scale to handle millions of requests per second.

### Is Workers production-ready?

Yes.

### How much do Workers cost?

Workers are billed based on usage. They cost $0.50 per million requests, with a $5 monthly
minimum (covers your first 10 million requests).

### How long can a Worker run for? Are there other resource limits?

An individual Worker script may consume up to:

- 5-50 milliseconds CPU time per request, depending on Cloudflare Plan
- 128MB memory at any given time

For more information, see [Resource Limits]({{< ref "archive/writing-workers/resource-limits.md" >}}).

### Why JavaScript? Isn’t it slow?

Workers leverages the years of development which has gone into the V8
JavaScript engine used by Google Chrome. This allows Workers to both respond to
requests quickly and provide a highly secure environment for shared computation.

JavaScript is also one of the most commonly used programming languages, enabling as many
people as possible to create with Workers. Additionally, many alternative languages can
compile to JavaScript, making it possible to choose options like TypeScript as well.

### Can Workers replace VCL?

Often, yes. JavaScript, being a full programming language, can generally do anything
a configuration language like VCL can do (and more).

### Can I use npm with Workers?

Workers has no explicit support for npm, but you can use any build tool or
package manager you need to create your Worker script. Just upload to us
the final, built, script with all dependencies included.

### Can I store data with a Worker?

We don’t currently have a distributed datastore which can receive data from Workers.

It is, however, possible to make arbitrary requests from a Worker, including after
they have responded to your visitors. This makes it possible to make requests to
your origin or alternative data storage tools as needed.

### How should I load data in my Worker?

We don’t currently provide an API for loading data in Workers. There are, however,
[several techniques]({{< ref "archive/writing-workers/storing-data.md" >}}) for loading data
in a Worker.

### Will my Worker’s response be cached by Cloudflare?

No. Workers are applied to requests _before_ they reach Cloudflare's cache. This means your
Worker’s responses are not cached. Any subrequests they make using the Fetch API will
be able to utilize the cache, though. This even includes requests to sites that are not
powered by Cloudflare, as long as the remote server returns appropriate caching headers.

### Are requests/responses streamed?

All HTTP messages are streamed wherever possible. Having a Request or a Response object
available only means that the front matter (everything up through the last header) of that
message has been received and is available in memory.

If your Worker script must analyze or transform a request/response body, then you must
buffer at least some portion of the body. For very large bodies, you may wish to use
the [TransformStream API]({{< ref "archive/recipes/streaming-responses.md" >}}) to minimize
your memory footprint and time-to-first-byte.

### What headers are available in my Worker?

Your Worker will provide to you any Workers sent by the client, in addition to a handful
added by Cloudflare. Cloudflare-specific headers will conveniently let you know in what
country the request originated, and what type of device the user is using, and the client’s
IP Address.

For a full listing of the headers added by Cloudflare to all
requests view [our documentation](https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers-).

### Can I log data from my Worker?

`console.log` messages will be shown in the console presented in the Worker editor to make
development easier, but it’s not currently possible to consume these logs from the edge.

It is, however, possible to make arbitrary requests from your Worker, allowing you to log
using an external system.

### How can I `console.log()` headers?

Use a Map object: `console.log(new Map(request.headers))`.

For a deeper explanation of why this works, and other header stringification options,
read our section on [console logging headers]({{< ref "archive/writing-workers/debugging-tips.md#console-logging-headers" >}}).

### My Worker is 500ing, how can I find out why?

In the Worker editor you may see your Worker’s error appear in the console presented on that page.
You can also wrap sections of your Worker in `try {} catch {}` blocks to catch errors and return
the origins response or the error message you prefer.

### How long does it take for my Worker to update after I change the code?

It can take up to 30 seconds for your Worker changes to appear on your production site.

### Is there a cold-start time for my Worker?

The V8 engine was designed to parse website JavaScript as quickly as possible. This allows us to
start up your Worker, even if it’s not already running on a given edge node, very quickly. While it
is dependent on the amount of code in your Worker, in the general case a Worker can be started in
less than five milliseconds.

## Subrequests

### Can my Worker make subrequests to load other sites on the Internet?

Yes, your Worker can use the Fetch API to make arbitrary requests to other Internet resources.

### How many subrequests can I make?

We currently limit the number of subrequests a script can make to 50.

Note that each subrequest in a redirect chain counts against this limit, so the number
of subrequests a script makes may end up being greater than the number of
`fetch(request)` calls that are in the script.

### Can I make a subrequest after my Worker has responded to the user?

Yes, you can use [`event.waitUntil()`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil)
to register asynchronous tasks that may continue after the response has been returned.

### How long can a subrequest take?

There is no individual subrequest duration limit, but all subrequests must be initated in
the first 15 seconds of your script’s execution.

## Security

### Should I trust Workers with sensitive data?

Workers employs multiple layers of sandboxing, one of which is the same V8 JavaScript sandbox
employed by Google Chrome. You can rest assured that other Workers cannot see nor interfere with
your Worker's private data nor code. Moreover, your end users cannot see into nor bypass your
Worker -- to them, your Worker is an extension of your server.

### Is my code public?

The content of your Worker script will not be accessible to the public. However, Cloudflare
employees may view your scripts for a variety of purposes, such as debugging, security audits,
or to provide you with technical support.

### Can I trust Workers to do access control or threat prevention?

Yes, those represent use cases Workers was designed to handle. It is worth noting that
Cloudflare has existing features including the Web Application Firewall and Rate Limiting
which may be more cost effective.

### Is it possible for visitors to access my origin without going through my Worker?

It is possible to secure your origin so it only may receive traffic from Cloudflare, and therefore,
Workers:

#### Only accept connections from our IPs

Lock down the origin server to only accept traffic from [Cloudflare IP’s](https://cloudflare.com/ips). This can be done in your web server’s configuration. Note that you must also ensure that your origin server only answers requests whose `Host` header actually names your server.

#### Validate our requests using SSL

Validate that all requests contain the [Cloudflare client certificate](https://support.cloudflare.com/hc/en-us/articles/204899617-Authenticated-Origin-Pulls). Again, your origin server must also validate the `Host` header.

#### Use Argo Tunnel

Use [Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/) to connect your origin server directly to Cloudflare without exposing it to external connections from the Internet. This is the most secure option. (In this case, `Host` header validation is not necessary.)
