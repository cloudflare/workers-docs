---
title: Configuration API
alwaysopen: true
---

## Endpoint References

* [Scripts](./scripts)
* [Bindings](./bindings)
* [Routes](./routes)

## Making Requests

All requests to this API must

- be sent over HTTPS
- Send a JSON body (unless otherwise indicated)
- contain valid identification headers:
  _ `X-Auth-Email` - the email address attached to your profile in the Cloudflare dashboard.
  _ `X-Auth-Key` - the Global API key attached to your profile in the Cloudflare dashboard.

[Find your Cloudflare Auth info](../how-to-find-your-cloudflare-api-keys).

## API Responses

TODO: All cloudflare api's respond with a JSON object that has the same shape; all errors also have the same shape. Document that shape.

## Cloudflare API Gateway

TODO: some errors can come back from the API gateway (specifically issues with account/zone). Link to documentation about these errors.

