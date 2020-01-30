---
title: Bindings
weight: 3
---

## Object Specification

- `name`: a javascript variable name for the binding
- `type`: the class of resource the binding provides (currently wasm_module, kv_namespace, secret, plain_text, or text_blob)


## Upload Bindings

Resource bindings must be uploaded alongside your other Worker assets via the [upload scripts endpoint](/tooling/api/scripts/#upload-or-update-a-workers-script-with-resource-bindings).

## List Bindings

`GET accounts/:account_identifier/workers/scripts/:script_name/bindings`

##### Sample Request:

```sh
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/bindings" \
     -H "X-Auth-Email: $CF_EMAIL_ADDRESS" \
     -H "X-Auth-Key: $CF_API_KEY"
```

##### Sample Response:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "name": "myBinding",
      "type": "wasm_module"
    },
    {
      "name": "__STATIC_CONTENT",
      "namespace_id": "2a88a930ebc145aaf48da80926a26d28",
      "type": "kv_namespace"
    },
    {
      "name": "__STATIC_CONTENT_MANIFEST",
      "type": "text_blob"
    }
  ]
}
```

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID](/quickstart/#configure)
- `script_name`: the name of the script to be deleted.

##### Headers

[Find Your Auth Info](/quickstart/#configure)

This endpoint does not yet support token-based authentication, so you will need to provide your account Email address and Global API Key.

- `X-Auth-Email`
- `X-Auth-Key`

##### Payload n/a

#### Response

##### Body (JSON)

- `success`: Boolean
- `result`: An array of [Binding Objects](#object-specification). Empty if success is false
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

###### Internal Error

```
status: 500
error: {
	code: 10013,
	message: "workers.api.error.unknown"
}
```
