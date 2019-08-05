---
title: "Static Site Hosting"
---

You can serve the files you have in Cloud Storage as a website using Cloudflare Workers:

{{<highlight javascript>}}
async function handleRequest(request) {
  const parsedUrl = new URL(request.url)
  let path = parsedUrl.pathname

  let lastSegment = path.substring(path.lastIndexOf('/'))
  if (lastSegment.indexOf('.') === -1) {
    path += '/index.html'
  }

  return fetch("https://cloudflare-example-space.nyc3.digitaloceanspaces.com" + path)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
{{</highlight>}}
