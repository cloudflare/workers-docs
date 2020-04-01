---
title: Scripts
weight: 2
---

- [Object Specification](#object-specification)
- [Upload or Update a Workers Script](#upload-or-update-a-workers-script)
  * [With Resource Bindings](#with-resource-bindings)
- [List all Scripts for an account](#list-all-scripts-for-an-account)
- [Download a Script](#download-a-script)
- [Delete a Script](#delete-a-script)

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
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
     -H  "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/javascript" \
     --data "addEventListener('fetch', event => { event.respondWith(fetch(event.request)) })"
```

##### Sample Response:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "script": "addEventListener('fetch', event => { event.respondWith(fetch(event.request)) })",
    "etag": "ea95132c15732412d22c1476fa83f27a",
    "size": 1024,
    "modified_on": "2017-01-01T00:00:00Z"
  }
}
```


### With Resource Bindings

If you are including Resources in your Worker, you need to specify their Bindings as a part of your upload. This API uses a multipart form, rather than straight bytes, to send its data:

#### The basic multipart form (Script only)

```sh
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
     -H  "Authorization: Bearer $CF_API_TOKEN" \
     -F "metadata=@metadata.json;type=application/json" \
     -F "script=@script.js;type=application/javascript"
```

Where the file `metadata.json` looks like this:

```json
{
  "body_part": "script",
  "bindings": []
}
```

#### Add a KV Namespace Binding

If your Worker uses a [KV namespace](/reference/storage/overview/), you will want to add a `kv_namespace` binding object to the `"bindings"` array in `metadata.json`:

```json
{
  "body_part": "script",
  "bindings": [
    {
      "type": "kv_namespace",
      "name": "MY_NAMESPACE",
      "namespace_id": ":namespace_id"
    }
  ]
}
```

The `namespace_id` value should correspond to the identifier associated with the namespace you want to use. The `name` value should correspond to the global variable you will use to access your namespace from your Worker code.

#### Add a Wasm Module

If your Worker uses a [Wasm Module](/templates/boilerplates/rustwasm/), you will want to add a `wasm_module` binding object to the `"bindings"` array in metadata.json:

```json
{
  "body_part": "script",
  "bindings": [
    {
      "type": "wasm_module",
      "name": "WASM",
      "part": "wasm"
    }
  ]
}
```

The `name` value should correspond to the global variable you will use to access your namespace from your Worker code.

You will also need to add your Wasm module as a file part to your request, and name it the same as the `part` field in the binding. This will change the above request to:

```sh
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
     -H  "Authorization: Bearer $CF_API_TOKEN" \
     -F "metadata=@metadata.json;type=application/json" \
     -F "script=@script.js;type=application/javascript" \
     -F "wasm=@module.wasm;type=application/wasm" # link your wasm module in place of module.wasm
```

#### Add a Secret Text Binding

*Note: Secrets are persisted between deploys of a Worker. You only need to include secrets in API calls when you are adding or changing the secret's content.*

If your Worker script uses [secrets](reference/apis/environment-variables#secrets), add a corresponding `secret_text` binding to the `"bindings"` array in `metadata.json`:

```json
{
  "body_part": "script",
  "bindings": [
    {
      "type": "secret_text",
      "name": "MY_SECRET",
      "text": "secret things are secret"
    }
  ]
}
```

* `text` : the text you want to store
* `name`:  the global variable to access your secret from your Worker code

#### Add a Plain Text Binding

If your Worker uses plain text environment variables, you will want to add a `plain_text` binding object for each one to the `"bindings"` array in `metadata.json`:

```json
{
  "body_part": "script",
  "bindings": [
    {
      "type": "plain_text",
      "name": "ENV_VAR",
      "text": "plain text things are not secret"
    }
  ]
}
```

* `text` : the text you want to store
* `name`:  the global variable to access your secret from your Worker code

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart/#configure)
- `script_name`: the name you want to assign to your script. Must follow the Workers [script naming conventions](#script-naming-conventions).

##### Headers

[Find Your Auth Info](/quickstart/#configure)

- `Authorization`
- `Content-Type` application/javascript
- `If-None-Match` [Optional] a [Script Object](#object-specification) etag

##### Payload (script only)

A valid JavaScript blob

##### Payload (script and bindings)

A multipart form containing a valid JavaScript file, a `metadata.json` file specifying any bindings, and any Wasm module files.

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
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts" \
     -H "Authorization: Bearer $CF_API_TOKEN"
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

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart/#configure)

##### Query Parameters

- `include_subdomain_availability`:

##### Headers

[Find Your Auth Info](/quickstart/#configure)

- `Authorization`

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
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Accept: application/javascript"
```

##### Sample Response:

```
addEventListener('fetch', event => { event.respondWith(fetch(event.request) }))
```

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart/#configure)
- `script_name`: the name of the script to download

##### Headers

[Find Your Auth Info](/quickstart/#configure)

- `Authorization`
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
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
     -H "Authorization: Bearer $CF_API_TOKEN"
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

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart/#configure)
- `script_name`: the name of the script to be deleted.

##### Headers

[Find Your Auth Info](/quickstart/#configure)

- `Authorization`

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
