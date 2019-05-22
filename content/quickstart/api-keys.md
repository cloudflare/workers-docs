---
title: Finding Your Cloudflare API Keys
---

To publish Cloudflare Workers projects and serve them from our global cloud network, [create a Cloudflare account](https://support.cloudflare.com/hc/en-us/articles/201720164) and register your domain/zone.

On your Cloudflare _Overview_ Dashboard, you'll find your **Account ID** and **Zone ID**, and a link to view your **Global API Key**. [Wrangler](TODO:wrangler link) uses these credentials to manage uploading and publishing your Workers to your registered Cloudflare domain/zone.

**Note:** You do not need your Zone ID for deploying Workers on the `Workers.dev` subdomain. 

**To find your Account ID, Zone ID, and Global API Key:**

1. Log in to your Cloudflare account and select the desired domain.
2. Select the _Overview_ tab on the navigation bar.
3. Scroll to the _API_ section and select **Click to copy** to copy your Account ID to the clipboard.
	Paste this in a text file for later retrieval.
4. (optional) Copy your **Zone ID** to the clipboard.
	Paste this in the text file.

	**IMPORTANT: Treat your Global API Key like a password!** 
	You'll configure Wrangler to use this key but it is not stored in version control or in your code.

5. Click **Get API Key** below _Account ID_ to jump to your _Profile_ page.

![direct-api-keys](/reference/media/direct-api-keys.png)

6. Scroll to _API Keys_, and click **View** to copy your Global API Key to the clipboard.

![Viewing Cloudflare API keys](/reference/media/api-keys.png)
	Paste this in your text file.

7. Close the _View_ window to return to your _Profile_ page.
8. (optional) Scroll up to copy your Cloudflare registered email address to the clipboard, and paste them in your text file.
9. **Save** your credentials text file in a secure location or securely delete it after configuring Wrangler.
10. [Configure Wrangler](TODO: link to wrangler).