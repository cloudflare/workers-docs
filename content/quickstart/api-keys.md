---
title: Finding Your Cloudflare API Keys
---

To publish Cloudflare Workers projects and serve them from our global cloud network, [create a Cloudflare account](https://support.cloudflare.com/hc/en-us/articles/201720164) and setup a registered domain ***or*** a Workers.dev subdomain on Cloudflare.

[Wrangler](TODO:wrangler link) uses the following credentials to manage uploading and publishing your Worker scripts to your Cloudflare domain:

* Account ID
* Zone ID  *(Note You do not need your Zone ID for deploying Workers on a `Workers.dev` subdomain)*
* Global API Key

# To find your Account ID and Zone ID

#### Registered Domains

For domains that you have registered on Cloudflare, you need both IDs:

1. Log in to your Cloudflare account and select the desired domain.

2. Select the _Overview_ tab on the navigation bar.

3. Scroll to the _API_ section and select **Click to copy** to copy your Account ID to the clipboard.
   Paste this in a text file for later retrieval.

4. Copy your **Zone ID** to the clipboard.   

   Paste this in a text file for later retrieval.

####  Workers.dev

For workers.dev domains, you will just need the Account ID:

1. Log in to your Cloudflare account and select **Workers**.

2. Scroll to the _API_ section and select **Click to copy** to copy your **Account ID** to the clipboard.
   Paste this in a text file for later retrieval.

# Global API Key

1. Click **Get API Key** below _Account ID_ to jump to your _Profile_ page.

![direct-api-keys](/reference/media/direct-api-keys.png)

2. Scroll to _API Keys_, and click **View** to copy your Global API Key to the clipboard.

![Viewing Cloudflare API keys](/reference/media/api-keys.png)

Paste the API key in the temporary text file

# Configure

1. Copy your Cloudflare registered email address and add to your text file.
2. Save**\*** your credentials text file in a secure location or securely delete it after configuring Wrangler.

**\* IMPORTANT: Treat your Global API Key like a password!** 
You'll configure Wrangler to use this key but it should not be stored in version control or in your code.