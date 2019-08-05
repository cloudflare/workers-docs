---
title: "Streaming Responses"
---

A Worker script doesn't need to prepare its entire response body before
delivering a Response to `event.respondWith()`. Using a TransformStream, it is
possible to stream a response body *after* sending the response's front matter
(i.e., HTTP status line and headers). This allows us to minimize:

- The visitor's time-to-first-byte.

- The amount of buffering that must be done in the Worker script.

Minimizing buffering is especially important if you must process or transform
response bodies that are larger than the Worker's memory limit. In these cases,
streaming is the only feasible implementation strategy.

**Note:** The Cloudflare Worker service already streams by default wherever
possible. You only need to use these APIs if you wish to *modify* the response
body in some way, while maintaining streaming behavior. If your Worker script
only passes subrequest responses back to the client verbatim, without reading
their bodies, then its body handling is already optimal, and there is no need
for the techniques described here.

## Streaming pass-through

The two primitives scripts can use to perform active streaming are
TransformStream and the [ReadableStream.pipeTo()](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeTo)
method.

Here's a minimal pass-through example to show their basic usage.

{{< highlight javascript >}}
addEventListener("fetch", event => {
  event.respondWith(fetchAndStream(event.request))
})

async function fetchAndStream(request) {
  // Fetch from origin server.
  let response = await fetch(request)

  // Create an identity TransformStream (a.k.a. a pipe).
  // The readable side will become our new response body.
  let { readable, writable } = new TransformStream()

  // Start pumping the body. NOTE: No await!
  streamBody(response.body, writable)

  // ... and deliver our Response while that's running.
  return new Response(readable, response)
}

async function streamBody(readable, writable) {
  // This function will continue executing after `fetchAndStream()`
  // returns its response.
  return readable.pipeTo(writable)
}
{{</ highlight >}}

Although `streamBody()` is an asynchronous function, we do *not* `await` it, so
that it does not block forward progress of the calling `fetchAndStream()`
function. It will continue to run asynchronously until the response has been
completed or the client disconnects.

This Worker doesn't do anything particularly special --- it is mostly equivalent
to not having a Worker at all. However, it shows that your Worker can continue
running a function (`streamBody()`) after a response has been returned to the
client. The example above just pumps the subrequest response body to the
final response body, but more complicated logic could be inserted, e.g. to add
a prefix or a suffix to the body, or to process it in some way.

## Aggregate and stream multiple requests

This is similar to our [Aggregating Multiple Requests]({{< ref "recipes/aggregating-multiple-requests.md" >}})
recipe, but this time we'll start writing our response as soon as we've
verified that every subrequest succeeded --- no need to wait for the actual
response bodies.

{{< highlight javascript >}}
addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request))
})

/**
 * Make multiple requests, 
 * aggregate the responses and 
 * stream it back as a single response.
 */
async function fetchAndApply(request) {
  const requestInit = {
    headers: { "Authorization": "XXXXXX" }
  }
  const fetches = [
    "https://api.coinbase.com/v2/prices/BTC-USD/spot",
    "https://api.coinbase.com/v2/prices/ETH-USD/spot",
    "https://api.coinbase.com/v2/prices/LTC-USD/spot"
  ].map(url => fetch(url, requestInit))

  // Wait for each fetch() to complete.
  let responses = await Promise.all(fetches)

  // Make sure every subrequest succeeded.
  if (!responses.every(r => r.ok)) {
    return new Response(null, { status: 502 })
  }

  // Create a pipe and stream the response bodies out
  // as a JSON array.
  let { readable, writable } = new TransformStream()
  streamJsonBodies(responses.map(r => r.body), writable)

  return new Response(readable)
}

async function streamJsonBodies(bodies, writable) {
  // We're presuming these bodies are JSON, so we
  // concatenate them into a JSON array. Since we're
  // streaming, we can't use JSON.stringify(), but must
  // instead manually write an initial '[' before the
  // bodies, interpolate ',' between them, and write a
  // terminal ']' after them.

  let writer = writable.getWriter()
  let encoder = new TextEncoder()

  await writer.write(encoder.encode("[\n"))

  for (let i = 0; i < bodies.length; ++i) {
    if (i > 0) {
      await writer.write(encoder.encode(",\n"))
    }
    writer.releaseLock()
    await bodies[i].pipeTo(writable, { preventClose: true })
    writer = writable.getWriter()
  }

  await writer.write(encoder.encode("]"))

  await writer.close()
}
{{</ highlight >}}

The runtime expects to receive TypedArrays on the readable side of the TransformStream.
Therefore, we never pass a string to `writer.write()`, only Uint8Arrays. If you need to
write a string, use a TextEncoder.

## Example

The [fast-google-fonts](https://github.com/cloudflare/worker-examples/tree/master/examples/fast-google-fonts) example on GitHub is a Cloudflare Worker that modifies HTML content. It demonstrates how to handle character encodings and edge cases around processing HTML content in arbitrary chunks as it streams.
