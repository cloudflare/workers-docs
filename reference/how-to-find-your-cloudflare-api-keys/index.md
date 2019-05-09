# How to find your Cloudflare API keys

To publish Cloudflare Workers projects and serve them from our global cloud network, you'll need to [create a Cloudflare account](https://support.cloudflare.com/hc/en-us/articles/201720164) (TODO: is this true for zoneless workers? different account?).

Once you've signed up (or if you already have an account), you'll need to find a few important keys in Cloudflare's Dashboard UI: your **Account ID**, Zone ID, and your **Global API key**.

The Account ID is according to the *zone* you wish the Worker(s) to deploy to. **To find your Account and Zone IDs, do the following:**

1. Login to Cloudflare with the account you'd like to use for deploying Cloudflare Workers
2. Select the "Home" button on the top navigation bar.
3. Click on a site that you currently host with Cloudflare – this should bring you to the "Overview" tab on the Dashboard.
4. Scroll down and look for the section in the sidebar titled "API": your Account ID and Zone ID will be displayed, as well as the option to "Click to copy" under each key.

**To find your API key, do the following:**

1. Click on the Profile icon at the top-right of the screen, and select "My Profile". Your account email should also be listed underneath the "My Profile" text. Unlike Account ID this will always be the API key that *you* are signed in on, not necassarily the account the owns the zone.
2. On the "My Profile" page, scroll down to "API Keys", and find "Global API Key".
3. Enter your password, and click "View" to see your Global API Key.

![Viewing Cloudflare API keys](./media/api-keys.png)

**Treat your Global API Key like a password!** You'll configure Wrangler to use this key, but by design, Wrangler/other tools do not keep this API key in version control, or inside of your code.

