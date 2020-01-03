---
hidden: true
---

{{< template-page "modify_req_props" >}}

# Rundown
One gotcha that Workers developers commonly encounter is with the ergonomics of the `Request` and `Response` constructors.

Unlike in the browser, it is common that a Workers developer needs to change one or more parts of an intercepted Request before passing it into a `fetch` call. It is common for developers to attempt to manually declare each part of the new Request/Response, an approach that is prone to error.

**The best practice is to always use the original request to construct the new request, thereby cloning all the attributes except those you intend to change.**

<div class="grey copy-group">
  <img class="copy-trigger" src="/svg/copy-box.svg" id="img" />
  <code class="copy">let newRequest = new Request(event.request, {..some changes..})
return fetch(newRequest)
  </code>
</div>

## Change `RequestInit`
 Request's object properties - [`RequestInit`](/reference/apis/request#constructor-parameters) - 
 should be set through a method (e.g. `headers.set`) or the constructor.

 This acts as a merge, preserving all parts of the original request except the part we want to update.
<div class="grey copy-group">
  <img class="copy-trigger" src="/svg/copy-box.svg" id="img" />
  <code class="copy">let newRequestInit = {
// Change method
method: 'POST',
// Change body
body: JSON.stringify({ bar: 'foo' }),
// Change the redirect mode.
redirect: 'follow',
//Change headers, note this method will erase existing headers
headers: {
  'Content-Type': 'application/json',
},
// Change a Cloudflare feature on the outbound response
cf: { apps: false },
}
const newRequest = new Request(request, newRequestInit)</code>
</div>

## Change headers
Because the `RequestInit` object only merges at the top level, passing a `headers` object in this way will overwrite all existing headers, rather than merging them as you might want to do. 

To that end, you can either...

Clone the headers, modify the new Headers object, then pass it in to `RequestInit`:
<div class="grey copy-group">
  <img class="copy-trigger" src="/svg/copy-box.svg" id="img" />
  <code class="copy">const headers = new Headers(event.request.headers)
headers.add('X-Example', 'bar')
fetch(new Request(even.trequest, { headers } ))
  </code>
</div>

Use the instance-level methods on the Headers class to make the modifications directly on the request:
<div class="grey copy-group">
  <img class="copy-trigger" src="/svg/copy-box.svg" id="img" />
  <code class="copy">const newRequest = new Request(event.request)
// Set headers using method
newRequest.headers.set('X-Example', 'bar')
newRequest.headers.set('Content-Type', 'application/json')</code>
</div>

## Change URL
To change the URL we still want to follow the best practice of inheriting all props from original request,
but now the URL should be the first argument. Applying the URL also requires a constructor
since once a Request has been constructed, its URL is immutable.
<div class="grey copy-group">
  <img class="copy-trigger" src="/svg/copy-box.svg" id="img" />
  <code class="copy">let url = request.url
// Change just the host
url = new URL(url)
url.hostname = someHost
const newRequest = new Request(url, new Request(request, newRequestInit))</code>
</div>

This works due to the fact that, while a Request object happens to contain all of the attributes of the options object that is passed to the constructor, the options object does not include the URL. 