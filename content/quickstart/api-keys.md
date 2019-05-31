---
title: Finding Your Cloudflare API Keys
weight: 5
---

To publish Cloudflare Workers projects and serve them from our global cloud network, [create a Cloudflare account](https://dash.cloudflare.com/sign-up/workers) and setup a registered domain **_or_** a Workers.dev subdomain on Cloudflare.

[Wrangler](/reference/tooling/wrangler) and [other tools](/reference/tooling) use the following credentials to manage uploading and publishing your Worker scripts to your Cloudflare domain:

- Account ID
- Zone ID _(Note You do not need your Zone ID for deploying Workers on a `Workers.dev` subdomain)_
- Global API Key
- Email address

## Account ID and Zone ID

#### Registered Domains

For domains that you have registered on Cloudflare, you need both IDs:

1. Log in to your Cloudflare account and select the desired domain.
2. Select the _Overview_ tab on the navigation bar.
3. Scroll to the _API_ section and select **Click to copy** to copy your Account ID.
4. Copy your **Zone ID**.

#### Workers.dev

For workers.dev domains, you will just need the Account ID:

1. Log in to your Cloudflare account and select **Workers**.

2. Scroll to the _API_ section and select **Click to copy** to copy your **Account ID**.

## Global API Key

1. Click **Get API Key** below the _API_ section to jump to your _Profile_ page.

2. Scroll to _API Keys_, and click **View** to copy your Global API Key **\***.

**\* IMPORTANT: Treat your Global API Key like a password!**
It should not be stored in version control or in your code, use environment variables if possible.
