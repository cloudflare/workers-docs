---
title: Writing Workers
alwaysopen: false
weight: 20
---

## Get Started in the Playground

The Worker Playground makes it easy to experiment with Workers. Workers you create in the playground can be tested against any site.

### [Launch Playground](https://cloudflareworkers.com/)

---

Workers created in the Playground are only for experimentation and don’t run on all of Cloudflare’s infrastructure around the world. To enable that,
write a Worker inside your Cloudflare configuration dashboard.

## Write a Real Worker

Once you’re ready to write a production Worker, move into the development environment inside the Cloudflare dashboard.

The site which you would like to develop a Worker on should be set up with Cloudflare. If not, [sign up now](https://www.cloudflare.com/) and update your DNS.

Begin by <a href="https://www.cloudflare.com/a/login">logging in</a> to your Cloudflare dashboard.

---

Navigate to the 'Workers' tab:
![Workers Tab](/archive/static/navbar.png)

---

Click the 'Launch Editor' button. It will open the Workers code editor:
![Launch Workers](/archive/static/launch-workers.png)

---

You will see a default Worker script. This script, when deployed does a simple pass-through and does not change any behavior on your site:
![Default Script](/archive/static/default-script.png)

Replace the pre-filled script with the following snippet of code and save it:

```js
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {
  return new Response('hello world')
}
```

This script, instead of loading from your origin, returns a response directly from our edge.

---

To enable this Worker on your site, go to the 'Routes' pane:
![Routes Tab](/archive/static/routes-tab.png)

---

If your domain is ‘example.com’, create a route that says example.com/helloWorld and hit ‘Save’. Replace ‘example.com’ in this example with your actual domain:
![Create a Route](/archive/static/example-route.png)

---

Visit your-site.com/helloWorld on your browser. You will see your Worker returning the response:
![Visit Link](/archive/static/hello-world.png)

---

Check out our [recipes](/archive/recipes) to see what other cool things you can do with Workers.
