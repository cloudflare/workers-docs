## Fetch API

[Fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) is implemented as expected within a Service Worker, with the exception of some features inapplicable to the edge, such as CORS-related properties.

## Headers

The Headers class matches the documents provided by MDN [here](https://developer.mozilla.org/en-US/docs/Web/API/Headers). If you expect to encounter any Unicode values in your headers, we encourage you to URL- or Base64-encode your header values before adding them to a Headers object.

#### Cloudflare Specific Headers:

`CF-Connecting-IP`: Client IP

## Request

### Constructor

`new Request(input [, init])`

#### Constructor Parameters

`input` - Either a USVString containing the URL or an existing Request object. When [modifying a request](TODO: link to 'modifying requests/responses'), if you are changing the URL, you must pass the new URL here; in all other cases it is advised to pass in the Request to be copied.

`init` - An options object containing any custom settings to be applied to the request. The possible options are:

* `method` - The request method, e.g. `GET`, `POST`
* `headers` - A [Headers](#Headers) object
* `body` - Any body you want to add to the request: TODO: Enumerate possible types. A request using the `GET` or `HEAD` method cannot have a body.
* `redirect` - The redirect mode to use: `follow`, `error`, or `manual`. TODO: what is the default?

### Properties

All properties of a Request object are read only; if you wish to [modify a request](TODO: link to modifying a request), you must create a new Request object, passing in the options you wish to modify into its [Constructor](#Constructor).

`body` - A simple getter used to expose a [`ReadableStream`](TODO: link streams api doc) of the body contents.

`bodyUsed` - A Boolean that declares whether the body has been used in a response yet.

`cf`* - An object containing data provided by Cloudflare; see below.

`headers` - Contains the associated [Headers](#Headers) object for the request.

`method` - The request method, e.g. `GET`, `POST`, associated with the request

`redirect` - The redirect mode to use: `follow`, `error`, or `manual`. TODO: what is the default?

`url` -  Contains the URL of the request

#### * Attributes available on `request.cf`:

Workers allows you to run custom logic for any incoming request. In addition to the information available on the `Request` object, such as headers, Cloudflare provides additional attributes of the request using the `request.cf`object.

`tlsVersion`: the TLS version used on the connection to Cloudflare.

`tlsCipher`: the cipher used on the connection to Cloudflare.

`country`: the two letter country code on the request (this is the same value as the one provided by the `CF-IPCountry` header)

`colo`: the three letter airport code of the colo the request hit.

### Methods

[`Request.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone) - Creates a copy of the current `Request` object.

`Request` implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body), so it also has the following methods available to it:

[`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer) - Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer) representation of the request body.

[`Body.blob()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob) - Returns a promise that resolves with a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) representation of the request body.

[`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData) - Returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) representation of the request body.

[`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) - Returns a promise that resolves with a [`JSON`](https://developer.mozilla.org/en-US/docs/Web/API/JSON) representation of the request body.

[`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text) - Returns a promise that resolves with an [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text) representation of the request body.

## Response

### Constructor

Matches the specification [here](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response).

### Properties

`body`

`bodyUsed`

`headers`

`ok`

`redirected`

`status`

`statusText`

`url`

`webSocket`*

### Methods

`arrayBuffer`

`clone`

`formData`

`json`

`text`

`redirect`

## Global

`fetch`
