---
title: Fetch
weight: 2
---

## Overview

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asyncronously fetching resources by providing a definition of a request and response. You will frequently find yourself interacting with request objects included as part of a [FetchEvent](/reference/runtime/apis/fetch-event), making your own requests using the global `fetch` method, and constructing your own responses.

\**Note: The Fetch API is only available inside of [the Request Context](/reference/workers-concepts/request-context).*

## Global

The `fetch` method is implemented on the ServiceWorkerGlobalScope and matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

## Headers

The Headers class matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/Headers). If you expect Unicode values in your headers, URL or Base64 encode your header values before adding them to a Headers object.

#### Cloudflare Specific Headers

`CF-Connecting-IP`: The client IP

## Request

### Constructor

#### Syntax

```javascript
new Request(input [, init])
```

#### Constructor Parameters

* `input`: Either a USVString that contains the URL or an existing `Request` object. Note that the `url` property is immutable, so when [modifying a request](/reference/workers-concepts/modifying-requests) and changing the URL, you must pass the new URL in this parameter.

* `init` (optional): An options object that contains custom settings to apply to the request. Valid options are:
	* `method`: The request method, such as `GET` or `POST`
	* `headers`: A [Headers](#headers) object
	* `body`: Any text to add to the request
	**Note:** Requests using the `GET` or `HEAD` methods cannot have a body.
	* `redirect`: The redirect mode to use: `follow`, `error`, or `manual`. Defaults to `manual`.

		* `follow`
		* `error`
		* `manual`

### Properties

All properties of a `Request` object are read only. To [modify a request](/reference/workers-concepts/modifying-requests), you must create a new `Request` object and pass the options to modify to its [constructor](#Constructor).

* `body`: A simple getter that exposes a [`ReadableStream`](/reference/runtime/apis/streams) of the contents.
* `bodyUsed`: A Boolean that declares if the body has been used in a response.
* `cf`: An object that contains data provided by Cloudflare (see `request.cf` below).
* `headers`: Contain the associated [`Headers`](#headers) object for the request.
* `method`: The request method, such as `GET` or `POST`, associated with the request.
* `redirect`: The redirect mode to use: `follow`, `error`, or `manual`. Default to `manual`.
* `url`: Contains the URL of the request.

#### The `cf` Object

In addition to the properties on the standard [`Request`](#request) object, you can use a `request.cf` object to control how Cloudflare features are applied as well as other custom information provided by Cloudflare. 

Note: Currently, settings in the cf object cannot be tested in the playground.

Special information from an incoming request to help with your app's logic:

* `asn`: ASN of the incoming request.(e.g. `395747`)
* `city`**: City of the incoming request.(e.g. `"Austin"`)
* `clientTrustScore`: ClientTrustScore of the incoming request.(e.g. `94`)
* `colo`: The three-letter airport code of the data center that the request hit. (e.g. `"DFW"`)
* `continent`**: Continent of the incoming request.(e.g. `"NA"`)
* `country`: Country of the incoming request. The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header. (e.g. `"US"`)
* `httpProtocol`**: HTTP Protocol (e.g. `"HTTP/2"`)
* `latitude`**: Latitude of the incoming request.(e.g. `"30.27130"`)
* `longitude`**: Longitude of the incoming request.(e.g. `"-97.74260"`)
* `postalCode`**: PostalCode of the incoming request.(e.g. `"78701"`)
* `region`**: If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request. If not known, this is an empty string. (e.g. `"Texas"`)
* `regionCode`**: If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the first level region associated with the IP address of the incoming request. 1 If not known, this is an empty string. (e.g. `"TX"`)
* `requestPriority`**: Request Priority(e.g. `"weight=256;exclusive=1"`)
* `timezone`**: Timezone of the incoming request.(e.g. `"America/Chicago"`)
* `tlsCipher`: The cipher for the connection to Cloudflare. (e.g. `"AEAD-AES128-GCM-SHA256"`)
* `tlsClientAuth`: Only set when using Cloudflare Access. Object with the following properties:
  * `certIssuerDNLegacy`
  * `certIssuerDN`
  * `certIssuerDNRFC2253`
  * `certSubjectDNLegacy`
  * `certVerified`
  * `certNotAfter`
  * `certSubjectDN`
  * `certFingerprintSHA1`
  * `certNotBefore`
  * `certSerial`
  * `certPresented`
  * `certSubjectDNRFC2253`
* `tlsVersion`: The TLS version of the connection to Cloudflare ( e.g. `TLSv1.3`)

Cloudflare features you can set on outbound requests: 

* `cacheEverything`:(e.g. `false`)
* `scrapeShield`:(e.g. `false`)
* `apps`: (e.g. `false`)
* `minify`: (e.g. `false`)
* `mirage`: (e.g. `false`)
* `resolveOverride`***: Redirects the request to an alternate origin server. You can use this, for example, to implement load balancing across several origins.(e.g.`us-east.example.com`)
  * *Note - For security reasons, the hostname set in `resolveOverride` must be proxied on the same Cloudflare zone of the incoming request. Otherwise, the setting is ignored. CNAME hosts are allowed, so to resolve to a host under a different domain or a DNS only domain first declare a CNAME record within your own zone’s DNS mapping to the external hostname, set proxy on Cloudflare, then set resolveOverride to point to that CNAME record.*

\*\* Only avalible for Business or Enterprise Plans.
\*\*\* Only avalible for Enterprise Plans. 

<!-- * cache_api?  -->

A Workers script runs after Cloudflare security features, but before everything else. Therefore, a Workers script cannot affect the operation of security features (since they already finished), but it can affect other features, like Polish or ScrapeShield, or how Cloudflare caches the response.

Updating the `cf` object is similar to [modifying a request](/reference/workers-concepts/modifying-requests/). You can add the `cf` object to a `Request` by passing a custom headers object to [`fetch`](/reference/runtime/apis/fetch/). 
```javascript
// Disable ScrapeShield for this request.
fetch(event.request, { cf: { scrapeShield: false } })
```
Note: Invalid or incorrectly-named settings in the cf object will be silently ignored. Be careful to test that you are getting the behavior you want. 
}


### Methods

* [`Request.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone): Creates a copy of the current `Request` object.
* `Request`: Implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body) and has the following methods:
	* [`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer): Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer) representation of the request body.
	* [`Body.blob()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob): Returns a promise that resolves with a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) representation of the request body.
	* [`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData): Returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) representation of the request body.
	* [`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json): Returns a promise that resolves with a [`JSON`](https://developer.mozilla.org/en-US/docs/Web/API/JSON) representation of the request body.
	* [`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text): Returns a promise that resolves with an [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text) representation of the request body.

## Response

### Constructor

#### Syntax

```javascript
new Response(body, init)
```

#### Parameters

* `body` (optional): An object that defines the body text for the response. Can be `null` or one of these values:
	* [`BufferSource`](https://developer.mozilla.org/en-US/docs/Web/API/BufferSource)
	* [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
	* [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
	* [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
	* [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString)
* `init` (optional): An `options` object that contains custom settings to apply to the response. Valid options are:
	* `status`: The status code for the reponse, such as, `200`.
	* `statusText`: The status message associated with the status code, like, `OK`.
	* `headers`: Any headers to add to your response that are contained within a [`Headers`](#headers) object or object literal of [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/API/ByteString) key/value pairs.

### Properties

* `body`: A simple getter used to expose a [`ReadableStream`](/reference/runtime/apis/streams) of the body contents.
* `bodyUsed`: A Boolean value that declares if the body was used in a response.
* `headers`: Contains the associated [Headers](#headers) object for the request.
* `ok`: Contains a Boolean value to indicate if the response was successful (status in the range 200-299).
* `redirected`: Indicates if the response is the result of a redirect, that is, its URL list has more than one entry.
* `status`: Contains the status code of the response (for example, `200` to indicate success).
* `statusText`: Contains the status message that corresponds to the status code (for example, `OK` for `200`).
* `url`: Contains the URL of the response. The value of the `url` property is the final URL obtained after any redirects.
* `webSocket`: This is present in successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a worker intercepts the request and then forwards it to the origin and the origin replies with a successful WebSocket upgrade response, the worker sees `response.webSocket`. This establishes a WebSocket connection proxied through a worker. Note that you cannot intercept data flowing over a WebSocket connection.

### Methods

* [`Response.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone): Creates a clone of a [`Response`](#response) object.
* [`Response.redirect()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect): Creates a new response with a different URL.
* [`Response`](#response): Implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body) and has the following methods available:
	* [`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer).
	* [`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
	* [`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with the result of parsing the body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).
	* [`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text).
