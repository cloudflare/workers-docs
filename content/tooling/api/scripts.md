---
title: Scripts
weight: 2
---

## Object Specification

### Script

- `id`: The name of the script. Must follow [script naming conventions](#script-naming-conventions).
- `etag`: Hashed script content; can be used in an If-None-Match header on update.
- `script`: Raw script content, as a string
- `size`: [Size of script](/about/limits), in bytes.
- `modified_on`: ISO_8601 timestamp of when the script was last modified.

#### Script Naming Conventions

Script names must:

- start with a letter
- end with a letter or digit
- include only letters, digits, underscore, and hyphen
- be 63 characters or less.

## Upload or Update a Workers Script

`PUT accounts/:account_id/workers/scripts/:script_name`

##### Sample Request:

```sh
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/workers/scripts/example-script" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/javascript" \
--data "addEventListener('fetch', event => { event.respondWith(fetch(event.request) }))"
```

##### Sample Response:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "script": "addEventListener('fetch', event => { event.respondWith(fetch(event.request) }))",
    "etag": "ea95132c15732412d22c1476fa83f27a",
    "size": 1024,
    "modified_on": "2017-01-01T00:00:00Z"
  }
}
```

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart#finding-your-cloudflare-api-keys)
- `script_name`: the name you want to assign to your script. Must follow the Workers [script naming conventions](#script-naming-conventions).

##### Headers ([Find Your Auth Info](/quickstart#finding-your-cloudflare-api-keys))

- `X-Auth-Email`
- `X-Auth-Key`
- `Content-Type` application/javascript
- `If-None-Match` [Optional] a [Script Object](#object-specification) etag

##### Payload (text blob)

A valid JavaScript blob

#### Response

##### Body

- `success`: Boolean
- `result`: A [Script Object](#object-specification) of the resulting script. Empty if success is false
- `errors`: An array of [Error Objects](/tooling/api/requests#error-object). Empty if success is true
- `messages`: An array of strings (unused)

##### Errors

###### Missing Account/Zone Identifier

```
status: 404
error: {
	code: 10005,
	message: "workers.api.error.not_found"
}
```

###### Exceeded [Script Limit](/about/limits)

```
status: 403
error: {
	code: 10037,
	message: "workers.api.error.exceeded_allowed_number_of_scripts"
}
```

###### Invalid Script

```
status: 400
error: {
	code: 10021,
	message: varies
}
```

###### Etag Unsupported (w/ If-None-Match header)

```
status: 400
error: {
	code: 10029,
	message: "workers.api.error.etag_unsupported"
}
```

###### Etag Precondition Failed

```
status: 412
error: {
	code: 10018,
	message: "workers.api.error.etag_precondition_failed"
}
```

###### Script Too Large

```
status: 400
error: {
	code: 10027,
	message: "workers.api.error.script_too_large"
}
```

###### Internal Error

```
status: 500
error: {
	code: 10013,
	message: "workers.api.error.unknown"
}
```

## List all Scripts for an account

`GET accounts/:account_id/workers/scripts`

##### Sample Request:

```sh
curl -X GET "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/workers/scripts" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
```

##### Sample Response:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "this-is_my_script-01",
      "etag": "ea95132c15732412d22c1476fa83f27a",
      "created_on": "2017-01-01T00:00:00Z",
      "modified_on": "2017-01-01T00:00:00Z"
    }
  ]
}
```

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart#finding-your-cloudflare-api-keys)

##### Query Parameters

- `include_subdomain_availability`:

##### Headers ([Find Your Auth Info](/quickstart#finding-your-cloudflare-api-keys))

- `X-Auth-Email`
- `X-Auth-Key`

##### Payload n/a

#### Response

##### Body

- `success`: Boolean
- `result`: An array of [Script Objects](#object-specification). Empty if success is false; does not include raw script text.
- `errors`: An array of [Error Objects](/tooling/api/requests#error-object). Empty if success is true
- `messages`: An array of strings (unused)

##### Errors

###### Missing Account/Zone Identifier

```
status: 404
error: {
	code: 10005,
	message: "workers.api.error.not_found"
}
```

###### Malformed Parameter

Occurs when query param (e.g. `include_subdomain_availability`) is not parsable as the correct type

```
status: 400
error: {
	code: 10006,
	message: "workers.api.error.malformed_param"
}
```

###### Internal Error

```
status: 500
error: {
	code: 10013,
	message: "workers.api.error.unknown"
}
```

## Download a Script

`GET accounts/:account_id/workers/scripts/:script_name`

##### Sample Request:

```sh
curl -X GET "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/workers/scripts/example-script" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Accept: application/javascript"
```

##### Sample Response:

```
addEventListener('fetch', event => { event.respondWith(fetch(event.request) }))
```

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart#finding-your-cloudflare-api-keys)
- `script_name`: the name of the script to download

##### Headers ([Find Your Auth Info](/quickstart#finding-your-cloudflare-api-keys))

- `X-Auth-Email`
- `X-Auth-Key`
- `Accept` application/javascript

##### Payload n/a

#### Response

##### Body (Text Blob)

Raw script content, as a string

##### Errors

###### Missing Account/Zone Identifier

```
status: 404
error: {
	code: 10005,
	message: "workers.api.error.not_found"
}
```

###### Missing Script Name

```
status: 404
error: {
	code: 10005,
	message: "workers.api.error.missing_script_name"
}
```

###### Script Not Found

```
status: 404
error: {
	code: 10007,
	message: "workers.api.error.not_found"
}
```

###### Internal Error

```
status: 500
error: {
	code: 10013,
	message: "workers.api.error.unknown"
}
```

## Delete a Script

`DELETE accounts/:account_id/workers/scripts/:script_name`

##### Sample Request:

```sh
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/workers/scripts/example-script" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
```

##### Sample Response:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "ea95132c15732412d22c1476fa83f27a"
  }
}
```

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart#finding-your-cloudflare-api-keys)
- `script_name`: the name of the script to be deleted.

##### Headers ([Find Your Auth Info](/quickstart#finding-your-cloudflare-api-keys))

- `X-Auth-Email`
- `X-Auth-Key`

##### Payload n/a

#### Response

##### Body

- `success`: Boolean
- `result`: An object containing the id (etag) of the deleted script
- `errors`: An array of [Error Objects](/tooling/api/requests#error-object). Empty if success is true
- `messages`: An array of strings (unused)

##### Errors

###### Missing Account/Zone Identifier

```
status: 404
error: {
	code: 10005,
	message: "workers.api.error.not_found"
}
```

###### Missing Script Name

```
status: 404
error: {
	code: 10005,
	message: "workers.api.error.missing_script_name"
}
```

###### Script Not Found

```
status: 404
error: {
	code: 10007,
	message: "workers.api.error.not_found"
}
```

###### Internal Error

```
status: 500
error: {
	code: 10013,
	message: "workers.api.error.unknown"
}
```
