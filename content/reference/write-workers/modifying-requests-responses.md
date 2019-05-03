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

### Changing the Redirect Mode

The `redirect` property is just one of the many options available in the `RequestInit` passed to the `Request()` constructor. In this case, we can pass in the original request as the first argument to the constructor, and the partial RequestInit object containing the desired redirect mode. This acts as a merge, preserving all parts of the original request except the part we want to update.

```javascript
// overwrite the old request with a clone of itself
// with only the `redirect` property overwritten.
request = new Request(request, { redirect: "follow" })
```

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

### Adding a Header

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