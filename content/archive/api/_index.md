---
title: "Configuration API"
alwaysopen: true
weight: 40
---

Cloudflare’s API allows you to upload and activate Workers without using our UI. You can use the API to integrate Cloudflare Workers into your CLI, build process, or tooling. If you are on the Enterprise Plan, please check out the [this page](config-api-for-enterprise/) for the configuration API.

## The Basics
Each request you make will need the following:

#### Your Cloudflare Email
This will be the email address you used to signup with Cloudflare. We will refer to this as `YOUR_CLOUDFLARE_EMAIL` in the examples below.

#### Account Authentication Key
You can find your Account Authentication Key by visiting https://dash.cloudflare.com/profile. We will refer to this as `ACCOUNT_AUTH_KEY` in the examples below.
![Account Authentication Key](/archive/static/view-authentication-key.png)

#### Zone ID
You can find your Zone ID by visiting `https://www.cloudflare.com/a/overview/YOUR_DOMAIN`
![Zone ID](/archive/static/zone-id.png)

## Endpoints

### Upload a Worker
`PUT /zones/:zone_id/workers/script`

Upload a Worker (or new version of a Worker).

{{<highlight bash>}}
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY" -H
"Content-Type:application/javascript" --data-binary "@PATH_TO_YOUR_WORKER_SCRIPT"
{{</highlight>}}

### Download a Worker
`GET /zones/:zone_id/workers/script`

Download the latest version of the Worker. The response body is raw JavaScript (not JSON).
{{<highlight bash>}}
curl -X GET "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
{{</highlight>}}

### Delete a Worker
`DELETE /zones/:zone_id/workers/script`

Delete a Worker.

{{<highlight bash>}}
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
{{</highlight>}}

### Create a Route
`POST /zones/:zone_id/workers/filters`

Create a route for your Worker. Note that by setting `enabled` to `true`,
your Worker will run on the provided `pattern`. If you want to create a route
where the Worker will *not* run, set `enabled` to `false`.

{{<highlight bash>}}
curl -X POST "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/filters" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY" -H "Content-type: application/json" -d '{"pattern": "example.com/*", "enabled": true}'
{{</highlight>}}

The response body will be JSON encoded and look similar to:

{{<highlight json>}}
{
    "result": {
        "id": "000000000000000000000"
    }
}
{{</highlight>}}

You can use the returned filter ID to enable, disable, update the pattern, or
delete a route.

### Change an Existing Route
`PUT /zones/:zone_id/workers/filters/:filter_id`

Change an existing route. You can change the pattern as well as the `enabled`
state of an existing route. Note that patterns *must* be unique, and attempting
to change (or create) a route with a pattern that already exists will return
a `409 Conflict`.

{{<highlight bash>}}
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/filters/:filter_id" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY" -H "Content-type: application/json" -d '{"pattern": "example.com/*", "enabled": false}'
{{</highlight>}}

### Get Assigned Routes
`GET /zones/:zone_id/workers/filters`

Get the list of routes. This is an enveloped JSON list of objects.

{{<highlight bash>}}
curl -X GET "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/filters" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
{{</highlight>}}

### Delete a Route
`DELETE /zones/:zone_id/workers/filters/:filter_id`

Delete a route. You can retrieve the `filter_id` from getting the assigned routes.

{{<highlight bash>}}
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/filters/:filter_id" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
{{</highlight>}}
