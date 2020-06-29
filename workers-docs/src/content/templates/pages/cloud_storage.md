---
title: 'Cloud Storage'
hidden: true
---

# Guide

You can fetch your 3rd-party object storage assets with a Cloudflare Worker so that they can be cached in the Cloudflare CDN.

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

This URL pattern — along with the underlying DNS record for the subdomain — ensures that the request is treated as a Cloudflare-proxied resource that is cacheable. Make sure that the Cloudflare orange cloud is active for the new subdomain or workers.dev domain.

However, adding this DNS record doesn’t guarantee that the resource will be returned by the object storage service when requested via the new subdomain. This is because object storage services typically reject HTTP requests that do not contain a host name that matches the proprietary host name assigned to your object storage instance.

As such, you still need to ensure that the asset is correctly fetched from the object storage service by using the expected URL. To do that, a Cloudflare Worker is necessary as described in Task 2 below.

# Step 2 - Use a Cloudflare Worker to fetch object storage assets
Fetch the resource from storage. Inside your Workers script write:

  ```
  return await fetch("https://myassets.s3.amazonaws.com" + path)
  ```

This retrieves resources from an object storage instance while applying the expected hostname to the URL.
