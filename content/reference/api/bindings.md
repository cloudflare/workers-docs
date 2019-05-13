---
title: Bindings
weight: 2
---

## Object Specifications

- `name`: a javascript variable name for the binding
- `type`: the class of resource the binding provides (currently wasm_module)

## List Bindings

`GET zones/:zone_identifier/workers/script/bindings`

##### Sample Request:

```sh
curl -X GET "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/workers/script/bindings" \
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
      "name": "myBinding",
      "type": "wasm_module"
    }
  ]
}
```

#### Request

##### URL Parameters

- `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID]
- `script_name`: the name of the script to be deleted.

##### Headers

- `X-Auth-Email` [Find your Auth Email]
- `X-Auth-Key` [Find Your Auth Key]

##### Payload n/a

#### Response

##### Body (JSON)

- `success`: Boolean
- `result`: An array of [Binding Objects](TODO). Empty if success is false
- `errors`: An array of [Error Objects](TODO). Empty if success is true
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

