---
title: Making Requests
weight: 1
---

## Auth Headers

All requests to the Cloudflare Workers REST API must

- be sent over HTTPS
- Send a JSON body (unless otherwise indicated)
- contain valid identification headers ([Find your Cloudflare Auth info](/quickstart#authentication)).
  - Using API Tokens:
    - `Authorization` - provide an API token in standard `Bearer <token>` format.
  - Using Email and Global API Key
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

## Authentication/Authorization Errors

### No route for that URI

All API endpoint paths are prefixed with either `/accounts/:account_id/` or `/zones/:zone_id`. These values are used by Cloudflare's API gateway to authenticate requests before forwarding on to the Workers API. If you receive a response that looks like the following, check your configuration: it is likely you have mis-formatted either your ZoneID or your AccountID:

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "Could not route to /zones/notazone/workers/script/bindings, perhaps your object identifier is invalid?"
    },
    {
      "code": 7000,
      "message": "No route for that URI"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

### Authentication error

If you fail to match the AccountID or ZoneID and your authorization headers, you will receive an error that looks like the following:

```json
{
  "errors": [
    {
      "code": 10000,
      "message": "Authentication error"
    }
  ],
  "success": false
}
```

### Missing Auth Headers

If you fail to include the appropriate [Authentication headers](#auth-headers), you will receive an error that looks like the following:

```json
{
  "errors": [
    {
      "code": 9106,
      "message": "Missing X-Auth-Key, X-Auth-Email or Authorization headers"
    }
  ],
  "success": false
}
```
