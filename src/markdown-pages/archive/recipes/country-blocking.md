---
title: "Country Blocking"
---

You can use Cloudflare Workers to determine an end user's country and block them from accessing your content.

A full list of country codes can be found [here](https://support.cloudflare.com/hc/en-us/articles/205072537).

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(blockCountries(event.request))
})

//Add countries to this Set to block them
const countries = new Set([  
  "US", // United States
  "SG", // Singapore 
  "BR"  // Brazil
])

async function blockCountries(request) {
  // Get country value from request headers
  let country = request.headers.get('cf-ipcountry')

  // Find out if country is on the block list
  let countryBlocked = countries.has(country)

  // If it's on the blocked list, give back a 403
  if (countryBlocked){
    return new Response("This page not available in your country",
        { status: 403, statusText: "Forbidden" })
  }

  // Catch-all return of the original response
  return await fetch(request)
}
{{< / highlight >}}