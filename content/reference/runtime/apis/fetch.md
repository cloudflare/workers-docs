---
title: Fetch API
---

## Overview

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asyncronously fetching resources by providing a definition of a Request and a Response. You will frequently find yourself interacting with the request objects included as part of a [FetchEvent](TODO: link FetchEvent), making your own requests using the global `fetch` method, and constructing your own Responses. Be sure to check out our [article](TODO: Link modifying requests/responses) about best practices for modifying a request or response.

## Global

The `fetch` method is implemented on the ServiceWorkerGlobalScope, and matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

## Headers

The Headers class matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/Headers). If you expect to encounter any Unicode values in your headers, we encourage you to URL or Base64 encode your header values before adding them to a Headers object.

#### Cloudflare Specific Headers:

`CF-Connecting-IP`: Client IP

## Request

### Constructor

#### Syntax

```javascript
new Request(input [, init])
```

#### Constructor Parameters

`input`: Either a USVString containing the URL or an existing Request object. Note that the `url` property is immutable, so when [modifying a request](TODO: link to 'modifying requests/responses'), if you are changing the URL, you must pass the new URL here.

`init` (optional): An options object () containing any custom settings to be applied to the request. The possible options are:

- `method`: The request method, e.g. `GET`, `POST`
- `headers`: A [Headers](#Headers) object
- `body`: Any body you want to add to the request: TODO: Enumerate possible types. A request using the `GET` or `HEAD` method cannot have a body.
- `redirect`: The redirect mode to use: `follow`, `error`, or `manual`. TODO: what is the default?

### Properties

All properties of a Request object are read only; if you wish to [modify a request](TODO: link to modifying a request), you must create a new Request object, passing in the options you wish to modify into its [Constructor](#Constructor).

`body`: A simple getter used to expose a [`ReadableStream`](TODO: link streams api doc) of the body contents.

`bodyUsed`: A Boolean that declares whether the body has been used in a response yet.

`cf`\*: An object containing data provided by Cloudflare; see `request.cf` below.

`headers`: Contains the associated [Headers](#Headers) object for the request.

`method`: The request method, e.g. `GET`, `POST`, associated with the request

`redirect`: The redirect mode to use: `follow`, `error`, or `manual`. TODO: what is the default?

`url`: Contains the URL of the request

#### The `cf` Object:

Workers allows you to run custom logic for any incoming request. In addition to the information available on the `Request` object, such as headers, Cloudflare provides additional attributes of the request using the `request.cf`object.

`tlsVersion`: the TLS version used on the connection to Cloudflare.

`tlsCipher`: the cipher used on the connection to Cloudflare.

`country`: the two letter country code on the request (this is the same value as the one provided by the `CF-IPCountry` header)

`colo`: the three letter airport code of the colo the request hit.

### Methods

[`Request.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone): Creates a copy of the current `Request` object.

`Request` implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body), so it also has the following methods available to it:

[`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer): Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer) representation of the request body.

[`Body.blob()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob): Returns a promise that resolves with a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) representation of the request body.

[`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData): Returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) representation of the request body.

[`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json): Returns a promise that resolves with a [`JSON`](https://developer.mozilla.org/en-US/docs/Web/API/JSON) representation of the request body.

[`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text): Returns a promise that resolves with an [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text) representation of the request body.

## Response

### Constructor

#### Syntax

```javascript
new Response(body, init)
```

#### Constructor Parameters

`body` (optional): An object defining a body for the response. Can be `null` or one of:

- [`BufferSource`](https://developer.mozilla.org/en-US/docs/Web/API/BufferSource)
- [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
- [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString)

`init` (optional): An options object containing any custom settings that you want to apply to the response. The possible options are:

- `status`: The status code for the reponse, e.g., `200`.
- `statusText`: The status message associated with the status code, e.g., `OK`.
- `headers`: Any headers you want to add to your response, contained within a [`Headers`](#Headers) object or object literal of [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/API/ByteString) key/value pairs.

### Properties

`body`: A simple getter used to expose a [`ReadableStream`](TODO: link streams api doc) of the body contents.

`bodyUsed`: A Boolean that declares whether the body has been used in a response yet.

`headers`: Contains the associated [Headers](#Headers) object for the request.

`ok`: Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

`redirected`: Indicates whether or not the response is the result of a redirect; that is, its URL list has more than one entry.

`status`: Contains the status code of the response (e.g., `200` for a success).

`statusText`: Contains the status message corresponding to the status code (e.g., `OK` for `200`).

`url`: Contains the URL of the response. The value of the `url` property will be the final URL obtained after any redirects.

`webSocket`\*: Present on successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a worker intercepts the request, then forwards it on to the origin, and the origin replies with a successful WebSocket upgrade response, the worker will be able to observe the presence of `response.webSocket`. This establishes a WebSocket connection that is proxied through a Worker, though you cannot actually intercept the data flowing over the WebSocket connection.

### Methods

[`Response.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone): Creates a clone of a `Response` object.

[`Response.redirect()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect): Creates a new response with a different URL.

`Response` implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body), so it also has the following methods available to it:

[`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer): Takes a `Response` stream and reads it to completion. It returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer).

[`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData): Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

[`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json): Takes a `Response` stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

[`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text): Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text).
