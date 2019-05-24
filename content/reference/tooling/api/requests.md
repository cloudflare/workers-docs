---
title: Making Requests
weight: 1
---

All requests to the Cloudflare Workers REST API must

- be sent over HTTPS
- Send a JSON body (unless otherwise indicated)
- contain valid identification headers ([Find your Cloudflare Auth info](/quickstart/api-keys)).
  - `X-Auth-Email` - the email address attached to your Cloudflare profile.
  - `X-Auth-Key` - the Global API key attached to your Cloudflare profile.

## API Responses

All Cloudflare APIs respond with a JSON object that has the following shape:

### Response Object

- `success`: A Boolean indicating whether an error occurred
- `result`: A JSON object representing the result of the request
- `errors`: An array of [Error Objects](#error-object). Empty if success is true
- `messages`: An array of strings (unused)

### Error Object

- `code`: A Number representing the error from the API
- `message`: A human readable String providing additional information about the error.

## Cloudflare API Gateway

TODO: some errors can come back from the API gateway (specifically issues with account/zone). Link to documentation about these errors.

