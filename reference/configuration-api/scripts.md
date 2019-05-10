---
title: Scripts
---

## Object Specifications

### Script

* `id`: The name of the script. Must follow [script naming conventions](#script-naming-conventions).
* `etag`: Hashed script content; can be used in an If-None-Match header on update.
* `script`: Raw script content, as a string
* `size`: Size of script, in bytes. Must be below the [script size limit](#TODO: link to plans and limitations)
* `modified_on`: ISO_8601 timestamp of when the script was last modified.

#### Script Naming Conventions

Script names must:
* start with a letter
* end with a letter or digit
* include only letters, digits, underscore, and hyphen
* be 63 characters or less.

## Upload or Update a Workers Script

`PUT accounts/:account_id/workers/scripts/:script_name`

##### Sample Request:

``` sh
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/workers/scripts/example-script" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/javascript" \
--data "addEventListener('fetch', event => { event.respondWith(fetch(event.request) }))"
```

##### Sample Response:

``` json
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

* `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID]
* `script_name`: the name you want to assign to your script. Must follow the Workers [script naming conventions](TODO).

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]
* `Content-Type` application/javascript
* `If-None-Match` [Optional] a [Script Object](TODO) etag

##### Payload (text blob)

A valid JavaScript blob

#### Response

##### Body

* `success`: Boolean
* `result`: A [Script Object](TODO) of the resulting script. Empty if success is false
* `errors`: An array of [Error Objects](TODO). Empty if success is true
* `messages`: An array of strings (unused)

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## List all Scripts for an account

`GET accounts/:account_id/workers/scripts`

##### Sample Request:

``` sh
curl -X GET "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/workers/scripts" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
```

##### Sample Response:

``` json
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

* `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID]

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]

##### Payload n/a

#### Response

##### Body

* `success`: Boolean
* `result`: An array of [Script Objects](TODO). Empty if success is false; does not include raw script text.
* `errors`: An array of [Error Objects](TODO). Empty if success is true
* `messages`: An array of strings (unused)

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## Download a Script

`GET accounts/:account_id/workers/scripts/:script_name`

##### Sample Request:

``` sh
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

* `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID]
* `script_name`: the name of the script to download

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]
* `Accept` application/javascript

##### Payload n/a

#### Response

##### Body (Text Blob)

Raw script content, as a string

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint

## Delete a Script

`DELETE accounts/:account_id/workers/scripts/:script_name`

##### Sample Request:

``` sh
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/workers/scripts/example-script" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
```

##### Sample Response:

```
addEventListener('fetch', event => { event.respondWith(fetch(event.request) }))
```

#### Request

##### URL Parameters

* `account_id`: the identifier associated with your Cloudflare account. [Find your Cloudflare Account ID]
* `script_name`: the name of the script to be deleted.

##### Headers

* `X-Auth-Email` [Find your Auth Email]
* `X-Auth-Key` [Find Your Auth Key]

##### Payload n/a

#### Response

##### Body n/a

TODO: Update based on the code (this _does_ return a response body).

##### Errors

TODO: enumerate possible error responses (especially http status codes) from this endpoint
