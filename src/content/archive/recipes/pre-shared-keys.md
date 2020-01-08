
---
title: "Pre-shared keys"
---

This Worker provides a way to quickly block access to content of your choosing, if the requester does not supply a header with a correct pre-shared key.

While this simple implementation is helpful, it is not meant to replace more secure scripts such as [signed requests](https://developers.cloudflare.com/workers/recipes/signed-requests/) using the WebCrypto API.

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
 
async function handleRequest(request) {
  // Example test: curl --header "X-Custom-PSK: mypresharedkey" https://mydomain.com/route

  var presharedAuthHeaderKey = 'X-Custom-PSK';
  var presharedAuthHeaderValue = 'mypresharedkey';

  let psk = request.headers.get(presharedAuthHeaderKey);

  if (psk === presharedAuthHeaderValue) {
    console.log('Correct preshared header key supplied. Forwarding request.');
    return fetch(request);
  } else {
    console.log('Incorrect preshared header key supplied. Rejecting request.')
    return new Response('Sorry, this page is not available.',
        { status: 403, statusText: 'Forbidden' });
  }
}
{{</highlight>}}