---
title: Fetch API
---

## Overview

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asyncronously fetching resources by providing a definition of a request and response. You will frequently find yourself interacting with request objects included as part of a [FetchEvent](../fetch-event), making your own requests using the global `fetch` method, and constructing your own responses. 

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

* `input`: Either a USVString that contains the URL or an existing `Request` object. Note that the `url` property is immutable, so when [modifying a request](TODO: link to 'modifying requests/responses') and changing the URL, you must pass the new URL in this parameter.

* `init` (optional): An options object that contains custom settings to apply to the request. Valid options are:
	* `method`: The request method, such as `GET` or `POST`
	* `headers`: A [Headers](#headers) object
	* `body`: Any text to add to the request: TODO: Enumerate possible types.
	**Note:** Requests using the `GET` or `HEAD` methods cannot have a body.
	* `redirect`: The redirect mode to use: `follow`, `error`, or `manual`. TODO: what is the default?

		* `follow`
		* `error`
		* `manual`

All properties of a `Request` object are read only. To [modify a request](TODO: link to modifying a request), you must create a new `Request` object and pass the options to modify to its [constructor](#Constructor).

* `body`: A simple getter that exposes a [`ReadableStream`](../streams) of the contents.
* `bodyUsed`: A Boolean that declares if the body has been used in a response.
* `cf`: An object that contains data provided by Cloudflare (see `request.cf` below).
* `headers`: Contain the associated [`Headers`](#headers) object for the request.
* `method`: The request method, such as `GET` or `POST`, associated with the request.
* `redirect`: The redirect mode to use: `follow`, `error`, or `manual`. TODO: what is the default?
* `url`: Contains the URL of the request.

#### The `cf` Object

Workers allows you to run custom logic for any incoming request. In addition to the information available on the `Request` object, such as headers, Cloudflare provides attributes for the request using the `request.cf`object.

* `tlsVersion`: The TLS version of the connection to Cloudflare.
* `tlsCipher`: The cipher for the connection to Cloudflare.
* `country`: The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header)
* `colo`: The three-letter airport code of the data center that the request hit.

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
