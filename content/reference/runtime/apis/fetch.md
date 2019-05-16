---
title: Fetch API
---

## Overview

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronous fetching of resources by providing a definition of a `Request` and a `Response`. You will frequently find yourself interacting with the request objects included as part of a [FetchEvent](../fetch-event), making your own requests using the global `fetch` method, and constructing your own responses. Check out our [article](TODO: Link modifying requests/responses) about best practices for modifying a request or response.

## Global

The `fetch` method is implemented on the ServiceWorkerGlobalScope, and matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

## Headers

The Headers class matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/Headers). If you expect Unicode values in your headers, URL or Base64 encode your header values before adding them to a Headers object.

#### Cloudflare-specific Headers

`CF-Connecting-IP`: Client IP

## Request

### Constructor

#### Syntax

```javascript
new Request(input [, init])
```

#### Constructor Parameters

* `input`: This is either a `USVString` containing the URL or an existing request object. Note that the `url` property is immutable, so when [modifying a request](TODO: link to modifying requests/responses) and changing the URL, you must pass the new URL in this parameter.

* `init` (optional): An options object that contains custom settings to apply to the request. Valid options:

	* `method`: The request method such as, `GET` and `POST`
	* `headers`: A [Headers](#headers) object
	* `body`: Any body text to add to the request: TODO: Enumerate possible types. 
	**Note:** Requests using the `GET` or `HEAD` methods cannot have a body.
	* `redirect`: The redirect mode to use. Valid options (TODO: what is the default?):	
		
		* `follow`
		* `error`
		* `manual` 

### Properties

All request object properties are read-only. To [modify a request](TODO: link to modifying a request), create a new `Request` object and pass the options to modify into its [Constructor](#Constructor).

* `body`: A simple getter method that exposes a [`ReadableStream`](../streams) of the body contents.

* `bodyUsed`: A Boolean value that declares if `body` has been used in a response.

* `cf`\*: An object that contains data provided by Cloudflare; see [The `cf` Object](#cfObject).

* `headers`: Contain the associated [Headers](#headers) object for the request.

* `method`: The request method associated with the request such as, `GET`or `POST`. 

* `redirect`: The redirect mode to use: Valid options (TODO: what is the default?):
		* `follow`
		* `error`
		* `manual` 
* `url`: Contains the URL of the request.

#### The `cf` Object<a name="cfObject"></a>

Workers allow you to run custom logic for incoming requests. Cloudflare provides attributes of the request using the `request.cf` object, in addition to the information available on the `Request` object, such as headers.

* `tlsVersion`: The TLS version used on the connection to Cloudflare.

* `tlsCipher`: The TLS cipher used on the connection to Cloudflare.

* `country`: A two-letter country code in the request (the same value that in the `CF-IPCountry` header).

* `colo`: The three-letter airport code of the colo the request hit.

### Methods

* [`Request.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone): Creates a copy of the current `Request` object.

* `Request`: Implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body) and has the following methods available:

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

#### Constructor Parameters

* `body` (optional): An object defining a body for the response. Can be `null` or one of these valid options:

	* [`BufferSource`](https://developer.mozilla.org/en-US/docs/Web/API/BufferSource)
	* [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
	* [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
	* [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
	* [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString)
* `init` (optional): An options object that contains custom settings to apply to the response. Valid options:
	* `status`: The status code for the reponse, for example, `200`.
	* `statusText`: The status message associated with the status code, such as, `OK`.
	* `headers`: Any headers you want to add to your response contained within a [`Headers`](#headers) object or a literal object of [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/API/ByteString) key/value pairs.

### Properties

* `body`: A simple getter method that exposes a [`ReadableStream`](../streams) of the body contents.
* `bodyUsed`: A Boolean that declares if the body has been used in a response.
* `headers`: Contain the associated [Headers](#headers) object for the request.
* `ok`: Contains a boolean stating if the response was successful (status in the range 200-299).
* `redirected`: Indicates if the response is the result of a redirect; that is, its URL list has more than one entry.
* `status`: Contains the status code of the response (such as, `200` for a success).
* `statusText`: Contains the status message corresponding to the status code (such as, `OK` for `200`).
* `url`: Contains the URL of the response. The value of the `url` property is the final URL obtained after any redirects.
* `webSocket`: Present on successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a worker intercepts the request and forwards it to the origin and the origin replies with a successful WebSocket upgrade response, the worker can observe the presence of `response.webSocket`. This establishes a WebSocket connection proxied through a worker. 
	**Note:** You cannot intercept the data flowing over the WebSocket connection.

### Methods

* [`Response.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone): Creates a clone of a [`Response`](#response) object.
* [`Response.redirect()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect): Creates a new response with a different URL.
* [`Response`](#response) implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body), and has the following methods available:

	* [`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer): Takes a [`Response`](#response) stream and reads it to completion. It returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer).
	* [`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData): Takes a [`Response`](#response) stream and reads it to completion. It returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
	* [`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json): Takes a [`Response`](#response) stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).
	* [`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text): Takes a [`Response`](#response) stream and reads it to completion. It returns a promise that resolves with a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text).