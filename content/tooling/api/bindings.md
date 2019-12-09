---
title: Bindings
weight: 3
---

## Object Specification

- `name`: a javascript variable name for the binding
- `type`: the class of resource the binding provides (currently wasm_module)


## Upload Bindings

Resource bindings must be uploaded alongside your other Worker assets via the [upload scripts endpoint](/tooling/api/scripts/#upload-or-update-a-workers-script-with-resource-bindings).

## List Bindings

`GET accounts/:account_identifier/workers/script/:script_name/bindings`

##### Sample Request:

```sh
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/script/$SCRIPT_NAME/bindings" \
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
      "name": "myBinding",
      "type": "wasm_module"
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

- `Authorization`

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
