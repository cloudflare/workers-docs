---
title: 'Enterprise API'
weight: 20
---

Cloudflare’s API allows you to upload and activate Workers without using our UI. You can use the API to integrate Cloudflare Workers into your CLI, build process, or tooling. If you are on a Free/Pro/Biz plan, please check out the [this page](/archive/api/) for the configuration API.

## The Basics

Each request you make will need the following:

#### Your Cloudflare Email

This will be the email address you used to signup with Cloudflare. We will refer to this as `YOUR_CLOUDFLARE_EMAIL` in the examples below.

#### Account Authentication Key

You can find your Account Authentication Key by visiting https://dash.cloudflare.com/profile. We will refer to this as `ACCOUNT_AUTH_KEY` in the examples below.
![Account Authentication Key](/archive/static/view-authentication-key.png)

#### Account ID

You can find your account id by grabbing it from the URL when using the dashboard.

Alternatively, you can use the API to `GET` the `/accounts` endpoint to get a list of all the accounts you are a member of, and their corresponding account IDs.

For long-time Cloudflare API users: please note that `account_id`s retain the value of `org_id`. While we advise that you update `/organizations/` to `/accounts/`, the string that follows will remain unchanged.

### Upload a Worker

`PUT /accounts/:account_id/workers/scripts/:script_name`

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/:account_id/workers/scripts/:script_name" -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY" -H "Content-Type:application/javascript" --data-binary "@PATH_TO_YOUR_WORKER_SCRIPT"
```

### Download a Worker

`GET /accounts/:account_id/workers/scripts/:script_name`

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/:account_id/workers/scripts/:script_name" -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "Content-Type:application/javascript" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
```

### Delete a Worker

`DELETE /accounts/:account_id/workers/scripts/:script_name`

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/:account_id/workers/script/:script_name" -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "Content-Type:application/javascript" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
```

### Get a list of scripts

`GET /accounts/:account_id/workers/scripts`

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/:account_id/workers/scripts" -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "Content-Type:application/javascript" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
```

### Get Routes

`GET /zones/:zone_id/workers/routes`

```bash
curl -H "Content-Type: application/javascript" -H "X-Auth-Email: YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key: ACCOUNT_AUTH_KEY" -X GET https://api.cloudflare.com/client/v4/zones/:zone_id/workers/routes
```

### Create a Route

`POST /zones/:zone_id/workers/routes`

```bash
curl -X POST https://api.cloudflare.com/client/v4/zones/:zone_id/workers/routes -H "Content-Type: application/json" -H "X-Auth-Email: YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key: ACCOUNT_AUTH_KEY" -d '{"pattern": "example.com/*", "script": "script_name"}'
```

### Change an Existing Route

`PUT /zones/:zone_id/workers/routes/:route_id`

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/routes/:route_id" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY" -H "Content-type: application/json" -d '{"pattern": "example.com/*", "script": "script_name}'
```

### Delete a Route

`DELETE /zones/:zone_id/workers/routes/:route_id`

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/routes/:route_id" -H
"X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" -H "X-Auth-Key:ACCOUNT_AUTH_KEY"
```
