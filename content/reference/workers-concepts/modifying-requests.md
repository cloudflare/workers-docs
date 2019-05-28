# Rewriting Requests and Responses

One gotcha that Workers customers commonly encounter is with the ergonomics of the `Request` and `Response` constructors. Unlike in the browser, it is common that a Workers developer needs to change one or more parts of an intercepted Request before passing it into a `fetch` call, or to construct a new Response from the result of a `fetch` call before returning it. It is common for developers to attempt to manually declare each part of the new Request/Response, an approach that is prone to error. **The best practice is to always use the original request to construct the new request, thereby cloning all the attributes except those you intend to change.**

For example, one might want to change the redirect mode to "follow" (to resolve redirects server-side), change the hostname, and add a header. This might look like:

```javascript
addEventListener("fetch", event => {
  let request = event.request
      
  // Change the redirect mode.
  request = new Request(request, { redirect: "follow" })

  // Change URL.
  let url = new URL(event.request.url)
  url.hostname = "example.com"
  request = new Request(url, request)

  // Add a header.
  request.headers.add("X-Example", "foo")

  event.respondWith(fetch(request))
})
```

### Method 1: Overwrite Specific Properties

The `redirect` property is just one of the many options available in the `RequestInit` passed to the `Request()` constructor. In this case, we can pass in the original request as the first argument to the constructor, and the partial RequestInit object containing the desired redirect mode. This acts as a merge, preserving all parts of the original request except the part we want to update.

```javascript
// overwrite the old request with a clone of itself
// with only the `redirect` property overwritten.
request = new Request(request, { redirect: "follow" })
```

This method is the most appropriate for most properties, especially with properties like `method` which are immutable for a constructed request.

#### Modifying a Request

 When modifying a [request](/reference/runtime/apis/fetch#request), use this method for the following property updates:

* `method`
* `body`
* `redirect`

#### Modifying a Response

 When modifying a [response](/reference/runtime/apis/fetch#response), use this method for the following property updates:

* `status`
* `statusText`

### Changing the URL

Once a Request has been constructed, its URL is immutable. If you want to modify the URL of a Request while keeping all of its other properties the same, you need to create a new Request with the desired URL and the existing Request as its constructor arguments:

```javascript
// bad
// clone the URL from the old request
let url = new URL(event.request.url)
// set a new hostname on the URL
url.hostname = "example.com"
// this will not throw an error, but it won't change the
// request URL, either
event.request.url = url

// good
// clone the URL from the old request
let url = new URL(event.request.url)
// set a new hostname on the URL
url.hostname = "example.com"
// construct a new Request object for the new URL,
// passing the old request as the initialization object.
request = new Request(url, request)
```

This works due to the fact that, while a Request object happens to contain all of the attributes of the options object that is passed to the constructor, the options object does not include the URL. That can only be set using the first argument to the constructor.

### Modifying Specific Headers

Because the `RequestInit` object only merges at the top level, passing a `headers` object in this way will overwrite all existing headers, rather than merging them as you might want to do. To that end, you can either clone the headers and add to the resulting Headers object, then pass it in to `RequestInit`, or use the instance-level methods on the Headers class to make the modifications directly on the request.

```javascript
// use an instance method to add a header
request.headers.add("X-Example", "foo")

// or
// clone the headers, modify them, and pass to a new Request
let headers = event.request.headers
headers.add("X-Example", "foo")
request = new Request(request, { headers })
```

#### Modifying a FetchEvent's request headers

The `request` object that comes as part of a [FetchEvent](/reference/runtime/apis/fetch-event) is a little bit different from other request objects, in that it has immutable headers. Authors need to clone this request before modifying headers:

```javascript
addEventListener("fetch", event => {
  let newRequest = new Request(event.request)
  newRequest.headers.add("X-Example", "foo")
  
  // do something with your newRequest
})
```

