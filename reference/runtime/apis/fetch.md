## Fetch API

[Fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) is implemented as expected within a Service Worker, with the exception of some features inapplicable to the edge, such as CORS-related properties.

## Headers

The Headers class matches the specification [here](https://developer.mozilla.org/en-US/docs/Web/API/Headers) with one caveat: we treat strings as USVStrings rather than ByteStrings, meaning we UTF-8-encode input and UTF-8-decode output.

#### Cloudflare Specific Headers:

`CF-Connecting-IP`: Client IP

## Request

### Constructor

`new Request()`

Matches the specification [here](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request), with one caveat: we don't support properties on the initializer dictionary which correspond to unimplemented features, such as `new Request(url, { mode: "cors" })`.

### Properties

`body`

`bodyUsed`

`cf`*

`method`

`url`

`headers`

`redirect`

### Methods

`.arrayBuffer()`

`.clone()`

`.formData()`

`.json()`

`.text()`

*Note: Workers allows you to run custom logic based for any incoming request. In addition to the information available on the `Request` object, such as headers, Cloudflare provides additional attributes of the request using the `request.cf`object.

#### Attributes available on `request.cf`:

`tlsVersion`: the TLS version used on the connection to Cloudflare.

`tlsCipher`: the cipher used on the connection to Cloudflare.

`country`: the two letter country code on the request (this is the same value as the one provided by the `CF-IPCountry` header)

`colo`: the three letter airport code of the colo the request hit.

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