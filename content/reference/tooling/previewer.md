---
title: Editing and Previewing
alwaysopen: true
weight: 20
---

There are two ways to preview and deploy a Workers script: on [a site on Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164) or on a [workers.dev](https://workers.dev/) account. If you'd like to only explore Workers capabilities, you can avoid any setup through the [playground](#playground).

The Worker Playground makes it easy to experiment with Workers. Workers you create in the playground can be tested against any site.

To preview a script, begin by [logging in](https://www.cloudflare.com/a/login) to your Cloudflare dashboard.

---

Workers created in the Playground are only for experimentation and don’t run on all of Cloudflare’s infrastructure around the world. To enable that,
write a Worker inside your Cloudflare configuration dashboard.

## Write a Real Worker

Once you’re ready to write a production Worker, move into the development environment inside the Cloudflare dashboard.

The site which you would like to develop a Worker on should be set up with Cloudflare. If not, [sign up now](https://www.cloudflare.com/) and update your DNS.

Begin by <a href="https://www.cloudflare.com/a/login">logging in</a> to your Cloudflare dashboard.

---

Navigate to the 'Workers' tab:
![Workers Tab](/static/navbar.png)

The previewer tool in the playground works by the same as the previewer in the dashboard, just without deploying any code.

You will see a default Worker script. This script, when deployed does a simple pass-through and does not change any behavior on your site:
![Default Script](/static/default-script.png)

Replace the pre-filled script with the following snippet of code and save it:

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {
  return new Response('hello world')
}
{{< / highlight >}}

This script, instead of loading from your origin, returns a response directly from our edge.

To make your Workers script live, click "Save and Deploy". 

### Dev Tools

For debugging Workers script, check out the developer tools at the bottom of the preview panel. The developer tools for Workers previewer works similar to the developer tools in Chrome or Firefox. 

![console](/reference/tooling/media/console.png)

#### Network tab

Shows the outgoing requests from your Workers script (i.e. any calls to `fetch` that live in your script).

#### Console Logs

Outputs any calls to `console.log` that were called for the current preview run as well as any other preview runs in that session

#### Sources

The sources that make up your Workers script. Note currently there can only be one.

---

### Key Differences from a live Workers script

While the preview tool is powerful in development, the tool must run as a mock proxy service so there are some inherent limitations when compared to a Worker script that is live on a zone or a workers.dev site.

Visit your-site.com/helloWorld on your browser. You will see your Worker returning the response:
![Visit Link](/static/hello-world.png)

* Subrequests ( i.e. fetches inside your Workers script) that call the same hostname as the original request will run in the previewer as an external request (i.e. goes back to the front line of Cloudflare), as those subrequests in production will go directly to the origin.
* Not all [Standard APIs](/reference/runtime/standard_apis) are avalible in the previewer that are in production.
* The output of `console.log` is not accessible in production. Your Workers script can certainly call the function in production; it just won't do anything. For a logging solution please see [best practices for logs](https://blog.cloudflare.com/logs-from-the-edge/).

Check out our [recipes]({{< relref "recipes" >}}) to see what other cool things you can do with Workers.