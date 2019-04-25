# Routes

TODO: summarize the route concept.

## Object Specifications

Sample Object

``` json
{
  "id": "9a7806061c88ada191ed06f989cc3dac",
  "pattern": "example.net/*",
  "script": "example-script"
}
```

* `id`: an identifier tag; returned in body on Create
* `pattern`: string representation of a route. must follow the pattern: `/^[a-z0-9_][a-z0-9-_]*$/`
* `script` [optional]: Name of the script to apply when the route is matched. The route acts as a placeholder when this is blank/missing.

## Create Route

`POST zones/:zone_id/workers/routes`

##### Sample Request:

``` sh
curl -X POST "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/workers/routes" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
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

* `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID]

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]
* `Content-type`: application/json

##### Payload

* `pattern`: a string representation of the url pattern to be linked
* `script` [optional]: Name of the script to apply when the route is matched. The route acts as a placeholder when this is blank/missing.

#### Response

##### Body

* `success`: Boolean
* `result`: A [Route Object](TODO) of the resulting script. Only contains the route tag. Empty if success is false
* `errors`: An array of [Error Objects](TODO). Empty if success is true
* `messages`: An array of strings (unused)

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## List Routes

`GET zones/:zone_id/workers/routes`

##### Sample Request:

``` sh
curl -X GET "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/workers/routes" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
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

* `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID]

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]

##### Payload
n/a

#### Response

##### Body

* `success`: Boolean
* `result`: An array of [Route Objects](TODO) of all routes associated with the zone. Empty if success is false
* `errors`: An array of [Error Objects](TODO). Empty if success is true
* `messages`: An array of strings (unused)

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## Get a route

`GET zones/:zone_id/workers/routes/:route_id`

##### Sample Request:

``` sh
curl -X GET "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/workers/routes/9a7806061c88ada191ed06f989cc3dac" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
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

* `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID]
* `route_id`: the id of the [Route Object](TODO) being requested.

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]

##### Payload
n/a

#### Response

##### Body

* `success`: Boolean
* `result`: A [Route Object](TODO) of the requested script. Empty if success is false
* `errors`: An array of [Error Objects](TODO). Empty if success is true
* `messages`: An array of strings (unused)

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## Update

`PUT zones/:zone_id/workers/routes/:route_id`

##### Sample Request:

``` sh
curl -X POST "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/workers/routes" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
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

* `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID]
* `route_id`: the id of the [Route Object](TODO) being updated.

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]
* `Content-type`: application/json

##### Payload

* `pattern`: a string representation of the url pattern to be linked
* `script` [optional]: Name of the script to apply when the route is matched. The route acts as a placeholder when this is blank/missing.

#### Response

##### Body

* `success`: Boolean
* `result`: A [Route Object](TODO) of the updated script. Empty if success is false
* `errors`: An array of [Error Objects](TODO). Empty if success is true
* `messages`: An array of strings (unused)

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## Delete

`DELETE zones/:zone_id/workers/routes/:route_id`

##### Sample Request:

``` sh
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/workers/routes/9a7806061c88ada191ed06f989cc3dac" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
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

* `zone_id`: the identifier associated with the zone you are adding routes for. [Find your Cloudflare Zone ID]
* `route_id`: the id of the [Route Object](TODO) being updated.

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]

##### Payload (n/a)

#### Response

##### Body

* `success`: Boolean
* `result`: A [Route Object](TODO) of the removed script. Only contains the route tag. Empty if success is false
* `errors`: An array of [Error Objects](TODO). Empty if success is true
* `messages`: An array of strings (unused)

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## Object Specifications

### Routes

Sample Object

``` json
{
  "id": "9a7806061c88ada191ed06f989cc3dac",
  "pattern": "example.net/*",
  "script": "example-script"
}
```

* `id`: an identifier tag; returned in body on Create
* `pattern`: a string representation of the url pattern to be linked
* `script` [optional]: Name of the script to apply when the route is matched. The route acts as a placeholder when this is blank/missing.
