---
title: Routes
weight: 4
---

## Object Specification

Sample Object

```json
{
  "id": "9a7806061c88ada191ed06f989cc3dac",
  "pattern": "example.net/*",
  "script": "example-script"
}
```

- `id`: an identifier tag; returned in body on Create
- `pattern`: string representation of a route. must follow [route conventions](/about/routes)
- `script` [optional]: Name of the script to apply when the route is matched. The route acts as a placeholder when this is blank/missing.

## Create Route

`POST zones/:zone_id/workers/routes`

##### Sample Request:

```sh
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes" \
     -H  "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"pattern":"example.net/*","script":"example-script"}'
```

##### Sample Response:

```
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "9a7806061c88ada191ed06f989cc3dac"
  }
}
```

#### Request

##### URL Parameters

- `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID](/quickstart/#configure)

##### Headers ([Find Your Auth Info](/quickstart/#configure))

- `Authorization`
- `Content-type`: application/json

##### Payload

- `pattern`: string representation of a route. must follow [route conventions](/about/routes)
- `script` [optional]: Name of the script to apply when the route is matched. The route acts as a placeholder when this is blank/missing.

#### Response

##### Body

- `success`: Boolean
- `result`: A [Route Object](#object-specification) of the resulting script. Only contains the route tag. Empty if success is false
- `errors`: An array of [Error Objects](/tooling/api/#error-object). Empty if success is true
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

###### Failed to Parse Request Body

```
status: 400
error: {
	code: 10026,
	message: "workers.api.error.parse_body"
}
```

###### Invalid Route Pattern

```
status: 400
error: {
	code: 10022,
	message: varies; see below
}
```

Possible error messages include: (where `[pattern]` is the given route pattern)

- `Route pattern must include zone name: [pattern]`
- `Route pattern may only contain wildcards at the beginning of the hostname and the end of the path: [pattern]`
- `Route pattern should not have query parameters [pattern]`
- `Could not understand route pattern [pattern], please try a different pattern`

See [Route Patterns](/about/routes).

###### Missing Script

```
status: 400
error: {
	code: 10019,
	message: "workers.api.error.invalid_route_script_missing"
}
```

###### Duplicate Route

```
status: 409
error: {
	code: 10020,
	message: "workers.api.error.duplicate_route"
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

## List Routes

`GET zones/:zone_id/workers/routes`

##### Sample Request:

```sh
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes" \
     -H  "Authorization: Bearer $CF_API_TOKEN"
```

##### Sample Response:

```
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "9a7806061c88ada191ed06f989cc3dac",
      "pattern": "example.net/*",
      "script": "example-script"
    }
  ]
}
```

#### Request

##### URL Parameters

- `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID](/quickstart/#configure)

##### Headers ([Find Your Auth Info](/quickstart/#configure))

- `Authorization`

##### Payload

n/a

#### Response

##### Body

- `success`: Boolean
- `result`: An array of [Route Objects](#object-specification) of all routes associated with the zone. Empty if success is false
- `errors`: An array of [Error Objects](/tooling/api/request##error-object). Empty if success is true
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

###### Internal Error

```
status: 500
error: {
	code: 10013,
	message: "workers.api.error.unknown"
}
```

## Get a route

`GET zones/:zone_id/workers/routes/:route_id`

##### Sample Request:

```sh
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes/$ROUTE_ID" \
     -H  "Authorization: Bearer $CF_API_TOKEN"
```

##### Sample Response:

```
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "9a7806061c88ada191ed06f989cc3dac",
    "pattern": "example.net/*",
    "script": "example-script"
  }
}
```

#### Request

##### URL Parameters

- `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID](/quickstart/#configure)
- `route_id`: the id of the [Route Object](#object-specification) being requested.

##### Headers ([Find Your Auth Info](/quickstart/#configure))

- `Authorization`

##### Payload

n/a

#### Response

##### Body

- `success`: Boolean
- `result`: A [Route Object](#object-specification) of the requested script. Empty if success is false
- `errors`: An array of [Error Objects](/tooling/apis/requests#error-object). Empty if success is true
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

###### Route Not Found

```
status: 404
error: {
	code: 10005,
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

## Update

`PUT zones/:zone_id/workers/routes/:route_id`

##### Sample Request:

```sh
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes/$ROUTE_ID" \
     -H  "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"pattern":"example.net/*","script":"example-script"}'
```

##### Sample Response:

```
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "9a7806061c88ada191ed06f989cc3dac"
  }
}
```

#### Request

##### URL Parameters

- `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID](/quickstart/#configure)
- `route_id`: the id of the [Route Object](#object-specification) being updated.

##### Headers ([Find Your Auth Info](/quickstart/#configure))

- `Authorization`
- `Content-type`: application/json

##### Payload

- `pattern`: string representation of a route. must follow [route conventions](/about/routes)
- `script` [optional]: Name of the script to apply when the route is matched. The route acts as a placeholder when this is blank/missing.

#### Response

##### Body

- `success`: Boolean
- `result`: A [Route Object](#object-specification) of the updated script. Empty if success is false
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

###### Failed to Parse Request Body

```
status: 400
error: {
	code: 10026,
	message: "workers.api.error.parse_body"
}
```

###### Invalid Route Pattern

```
status: 400
error: {
	code: 10022,
	message: varies; see below
}
```

Possible error messages include: (where `[pattern]` is the given route pattern)

- `Route pattern must include zone name: [pattern]`
- `Route pattern may only contain wildcards at the beginning of the hostname and the end of the path: [pattern]`
- `Route pattern should not have query parameters [pattern]`
- `Could not understand route pattern [pattern], please try a different pattern`

See [Route Patterns](/about/routes).

###### Missing Script

```
status: 400
error: {
	code: 10019,
	message: "workers.api.error.invalid_route_script_missing"
}
```

###### Duplicate Route

```
status: 409
error: {
	code: 10020,
	message: "workers.api.error.duplicate_route"
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

## Delete

`DELETE zones/:zone_id/workers/routes/:route_id`

##### Sample Request:

```sh
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes/$ROUTE_ID" \
     -H  "Authorization: Bearer $CF_API_TOKEN"
```

##### Sample Response:

```
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "9a7806061c88ada191ed06f989cc3dac"
  }
}
```

#### Request

##### URL Parameters

- `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID](/quickstart/#configure)
- `route_id`: the id of the [Route Object](#object-specification) being updated.

##### Headers ([Find Your Auth Info](/quickstart/#configure))

- `Authorization`

##### Payload (n/a)

#### Response

##### Body

- `success`: Boolean
- `result`: A [Route Object](#object-specification) of the removed script. Only contains the route tag. Empty if success is false
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

###### Route Not Found

```
status: 404
error: {
	code: 10005,
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
