---
hidden: true
---

{{< template-page "cloud_storage" >}}

# Guide

You can fetch your object storage assets with a Cloudflare Worker so that they can be cached in the Cloudflare CDN.

- [Overview](#overview)
    + [About object storage service URLs](#about-object-storage-service-urls)
- [Step 1 - Modify your Cloudflare DNS to add a subdomain](#step-1-modify-your-cloudflare-dns-to-add-a-subdomain)
- [Step 2 - Use a Cloudflare Worker to fetch object storage assets](#step-2-use-a-cloudflare-worker-to-fetch-object-storage-assets)

# Overview
There are cases when a website runs in a traditional origin web server such as Apache, NGINX, or Microsoft IIS, but has references to resources stored in a cloud object storage service like Amazon S3, DigitalOcean Spaces, or Microsoft Azure Storage. 

If this is your case, you can fetch and cache object storage assets by modifying your Cloudflare DNS settings first, and then using a Cloudflare Worker. 

### About object storage service URLs
Object storage services make assets available via a proprietary web address or URL that would not match your domain or host name. For example, to request an image file from an Amazon S3 Bucket, the URL would look something like:

```
https://myassets.s3.amazonaws.com/image1.jpg
```
This asset is in a different domain from the resources stored in your origin web server, such as your website homepage, which might have a URL like:

```
https://www.mydomain.com/index.html
```
If you want to refer to `image1.jpg` within `index.html` and wish for the Cloudflare CDN to cache this image, you cannot use the default object storage URL in your reference. Instead, the host name in the image’s URL needs to be resolvable through your Cloudflare DNS settings.

# Step 1 - Modify your Cloudflare DNS to add a subdomain
In order to cache any object storage asset, Cloudflare needs to fetch it via a URL containing a host name that matches a Cloudflare-proxied subdomain defined in your DNS app settings.

You can add this new subdomain as a CNAME DNS record to act as an alias for the host name expected by your object storage service. For example, you can configure the new DNS record with values similar to:


- **Type**: CNAME
- **Name**: assets
- **Value**: myassets.s3.amazonaws.com

Now the pages served from your standard origin web server could refer to your object storage asset as:

```
https://assets.mydomain.com/image1.jpg
```
This URL pattern — along with the underlying DNS record for the subdomain — ensures that the request is treated as a Cloudflare-proxied resource that is cacheable. Make sure that the Cloudflare orange cloud is active for the new subdomain.

However, adding this DNS record doesn’t guarantee that the resource will be returned by the object storage service when requested via the new subdomain. This is because object storage services typically reject HTTP requests that do not contain a host name that matches the proprietary host name assigned to your object storage instance.

As such, you still need to ensure that the asset is correctly fetched from the object storage service by using the expected URL. To do that, a Cloudflare Worker is necessary as described in Task 2 below.

# Step 2 - Use a Cloudflare Worker to fetch object storage assets
The Cloudflare Developer portal features documentation to help you make the most of Cloudflare’s services. It has a section dedicated to Cloudflare Workers where you can find recipes for different solutions.

Cloudflare Workers is an add-on service (available in all user plans) that when enabled appears in the Cloudflare dashboard. For subscription information, visit Cloudflare Pricing.
The recipe Static Site Hosting illustrates how to fetch resources from an object storage instance by applying the expected hostname to the URL.

To add this worker to your domain:

1. Copy the sample script from the recipe above.

2. Open the Cloudflare dashboard and select your site.

3. Click the **Workers** app.

4. Under **Service Workers**, click **Launch Editor**. 

5. If this is your first script, the script editor opens in edit mode; otherwise, you need to click **Add Script**.

6. Paste the script and modify it to ensure that that the URL in the fetch function at the end uses the same subdomain you specified in the DNS record in Task 1 above. For example: 

```
return await fetch("https://myassets.s3.amazonaws.com" + path)
```
7. Next, click the **Routes** tab to add routes that would trigger the worker when the assets are requested via the Cloudflare subdomain you created. We recommend that you add your domain (with no http or https) so that both protocols are covered, plus a wildcard to represent any resource requested for your object storage instance.  For example:

```
assets.mydomain.com/* 
```
Learn more about Route Pattern Matching from the Cloudflare Workers documentation portal.

8. Click the **Script** tab and then click **Save** to finish.

You can use the **Preview** feature of the Workers script editor to test your script. If the script works as expected, you can perform further tests on your Cloudflare-proxied website and verify that the object storage assets are fetched correctly and cached.

Related resources
Cloudflare Workers
Cloudflare Developers portal
Which file extensions does Cloudflare cache for static content?