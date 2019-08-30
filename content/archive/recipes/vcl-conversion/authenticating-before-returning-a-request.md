---
title: "Authenticating Before Returning a Request"
---

Just like VCL, Workers allows for authenticating before returning a request for header-based authentication.

## With VCL:
{{<highlight vcl>}}
sub vcl_recv {

  /* unset state tracking header to avoid client sending it */
  if (req.restarts == 0) {
    unset req.http.X-Authed;
  }

  if (!req.http.X-Authed) {
    /* stash the original URL and Host for later */
    set req.http.X-Orig-URL = req.url;

    /* set the URL to what the auth backend expects */
    set req.url = "/authenticate";

    /* Auth requests won't be cached, so pass */
    return(pass);
  }

  if (req.http.X-Authed == "true") {
    /* we're authed, so proceed with the request */
    /* reset the URL */
    set req.url = req.http.X-Orig-URL;

  } else {
    /* the auth backend refused the request, so 403 the client */
    error 403;
  }

#CDN recv

  ...etc...
}

sub vcl_deliver {

  /* if we are in the auth phase */
  if (!req.http.X-Authed) {

    /* if we got a 5XX from the auth backend, we should fail open */
    if (resp.status >= 500 && resp.status < 600) {
      set req.http.X-Authed = "true";
    }

    if (resp.status == 200) {

      /* the auth backend responded with 200, allow the request and restart */
      set req.http.X-Authed = "true";
    } else if (resp.status == 401) {

      return(deliver);

    } else {

      /* the auth backend responded with non-200, deny the request and restart */
      set req.http.X-Authed = "false";
    }

    restart;
  }

#CDN deliver

  ...etc...
}
{{</highlight>}}

## With Workers:
{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  // Make an authentication request that is identical to the
  // original request, but a GET with no body.
  let authUrl = new URL(request.url)
  authUrl.pathname = "/authenticate"
  let authResponse = await fetch(authUrl, {
    ...request,
    method: "GET",
    body: null
  })

  if (authResponse.status === 200) {
    // Client is authenticated.
    return fetch(request)
  } else if (authResponse.status === 401) {
    // Authentication server wants credentials from the client.
    return authResponse
  } else {
    // Every other response from the authentication server becomes 403.
    return new Response(null, {
      status: 403,
      statusText: "Forbidden",
    })
  }
}
{{</highlight>}}