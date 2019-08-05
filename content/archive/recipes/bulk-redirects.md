---
title: "Bulk Redirects (301/302)"
---

Handle a large amount of redirects in Workers instead of Page Rules. Although you can use a Map object in global memory, it's advised to use [Workers KV](/kv/) when you have a considerably large amount of redirects.

## Using Workers KV

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(bulkRedirects(event.request))
})

async function bulkRedirects(request) {
  // Get the incoming request URL and path for parsing
  let url = new URL(request.url)
  let path = url.pathname
  console.log("\nPATH: " + path)

  // Match a URL which should redirect from the map
  // This assumes that you've created a KV Namespace
  // and bound it to the variable "REDIRECTS_KV"
  let location = await REDIRECTS_KV.get(path)
  console.log("Redirect Location: " + location)

  // If it exists, create a redirect and return it
  if (location) {
    console.log("Redirecting to: " + location)
    return Response.redirect(location, 301)
  }

  // If not, return the original request
  return fetch(request)
}
{{< / highlight >}}

## Using a Map object in global memory

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(bulkRedirects(event.request))
})

// Map of redirect KVs
// The key is the incoming request URL
// The value is where the user should be redirected
const redirects = new Map([
  ["https://example.com/redirect1", "https://en.wikipedia.org/wiki/HTTP_301"],  
  ["https://example.com/redirect2", "https://google.com"]
])

async function bulkRedirects(request) {
  // Get the incoming request URL for parsing
  let url = request.url
  console.log("\nURL: " + url)

  // Match a URL which should redirect from the map
  let location = redirects.get(url)
  console.log("Redirect Location: " + location)

  // If it exists, create a redirect and return it
  if (location) {
    console.log("Redirecting to: " + location)
    return Response.redirect(location, 301)
  }

  // If not, return the original request
  return fetch(request)
}
{{< / highlight >}}