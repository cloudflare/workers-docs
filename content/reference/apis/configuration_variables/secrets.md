---
title: 'Secrets'
weight: 2
---

Once a secret is set using [wrangler](/tooling/wrangler/secret) or in the UI, it becomes available to your Worker script. 

Example where `SECRET` is set it is not directly accessible to the script but can be set as a header in a fetch.

```
let headers = new Headers({ Auth: SECRET })
```

TODO: verify this because I have no idea
The word "capability" here is used in the sense of [Capability-based Security](https://en.wikipedia.org/wiki/Capability-based_security).

Examples include:

- **Authenticated HTTP** capabilities allow the script to make fetch() requests that have added authorization headers, without allowing the script itself to access those header values. They may also impose restrictions or overrides on what URLs are allowed to be fetched.

- - **Cloudflare API** capabilities provide access to [api.cloudflare.com](http://api.cloudflare.com/) with some pre-configured authorization level.
  - **OAuth** capabilities provide access to a third-party API using credentials obtained via OAuth. When configuring the worker, the developer carries out an OAuth handshake to grant "offline" access to an external account or resource (e.g. their Github account). The Worker is then provided with an authenticated HTTP capability that automatically adds OAuth 2 access tokens to outgoing requests.
  - **Basic Auth** capabilities are similar to OAuth, but where the remote server uses HTTP basic authentication. The developer configures the capability by providing a hostname, username, and password.
  - **Manual Auth** capabilities let the developer configure any arbitrary headers to inject into requests. (This would be needed for third-party APIs that, like the Cloudflare API, do not follow industry standards.)

- **Pipeline** capabilities point to other stages of the zone's own [PipelineDef](https://stash.cfops.it/projects/EW/repos/edgeworker/browse/src/edgeworker/logistics/pipeline.capnp). The can be used to make HTTP requests that go somewhere that has no public internet address at all.

- - **Out-of-band Apps** are Cloudflare Apps installed on the zone whose workers do not run as part of the normal request pipeline, but which can be explicitly invoked by some worker that is in the pipeline. For example, the Sentry app might provide the ability to explicitly invoke it to report an exception.
  - **Tunnels** are origin servers which have connected to the zone via Argo Tunnel, but which are not mapped to a hostname. Instead of addressing them by URL, the Worker addresses them by capability. This provides a higher level of security by making it far harder to accidentally expose the worker to the internet.

- **Storage Bucket** capabilities provide access to a Key/Value storage bucket managed by Cloudflare. (This is being built by the Haven project.)

Caveats:

- Secrets are will not print out via `console.log` in the previewer
- 