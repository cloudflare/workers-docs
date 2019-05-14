---
title: Finding your Cloudflare API keys
---

To publish Cloudflare Workers projects and serve them from our global cloud network, you'll need to [create a Cloudflare account](https://support.cloudflare.com/hc/en-us/articles/201720164).

Once you've signed up (or if you already have an account), you'll need to find a few important keys in Cloudflare's Dashboard UI: your **Account ID** and your **Global API key** – Wrangler will use these to manage uploading and publishing your Workers.

**To find your Account ID, do the following:**

1. Login to Cloudflare with the account you'd like to use for deploying Cloudflare Workers

2. Select the "Home" button on the top navigation bar.

3. On the right side of the screen, select the "Workers" navigation item.

4. On the Cloudflare Workers screen, find the sidebar section titled "API" and copy your Account ID.

![direct-api-keys](/reference/media/direct-api-keys.png)

_Note: if you're deploying Cloudflare Workers scripts to a zone/domain registered on your Cloudflare account, as opposed to a Workers.dev subdomain, you'll need to find your Zone ID in addition to your Account ID:_

1. Click on a site that you currently host with Cloudflare – this should bring you to the "Overview" tab on the Dashboard.

2. Scroll down and look for the section in the sidebar titled "API": your Account ID and Zone ID will be displayed, as well as the option to "Click to copy" under each key.

**To find your API key, do the following:**

1. Click on the Profile icon at the top-right of the screen, and select "My Profile". Your account email should also be listed underneath the "My Profile" text.
2. On the "My Profile" page, scroll down to "API Keys", and find "Global API Key".
3. Enter your password, and click "View" to see your Global API Key.

![Viewing Cloudflare API keys](/reference/media/api-keys.png)

**Treat your Global API Key like a password!** You'll configure Wrangler to use this key, but by design, Wrangler does not keep this API key in version control, or inside of your code.

In addition, you'll also need your **Cloudflare Auth Email**. This is the email you used to sign up for Cloudflare.
