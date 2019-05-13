---
title: Streaming
---

## Overview

A Worker script doesn’t need to prepare its entire response body before delivering a Response to `event.respondWith()`. Using a TransformStream, it is possible to stream a response body _after_ sending the response’s front matter (i.e., HTTP status line and headers). This allows us to minimize:

- The visitor’s time-to-first-byte.
- The amount of buffering that must be done in the Worker script.

Minimizing buffering is especially important if you must process or transform response bodies that are larger than the Workers script's memory limit. In these cases, streaming is the only feasible implementation strategy.

**Note:** The Cloudflare Workers service already streams by default wherever possible. You only need to use these APIs if you wish to _modify_ the response body in some way, while maintaining streaming behavior. If your Workers script only passes subrequest responses back to the client verbatim, without reading their bodies, then its body handling is already optimal, and there is no need for the techniques described here.

### Streaming Pass-Through

The two primitives developers can use to perform active streaming are TransformStream and the [ReadableStream.pipeTo()](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeTo) method.

Here’s a minimal pass-through example to show their basic usage.

```javascript
addEventListener('fetch', event => {
  event.respondWith(fetchAndStream(event.request))
})

async function fetchAndStream(request) {
  // Fetch from origin server.
  let response = await fetch(request)

  // Create an identity TransformStream (a.k.a. a pipe).
  // The readable side will become our new response body.
  let { readable, writable } = new TransformStream()

  // Start pumping the body. NOTE: No await!
  response.body.pipeTo(writable)

  // ... and deliver our Response while that's running.
  return new Response(readable, response)
}
```

Although we call `response.body.pipeTo(writable)`, we do _not_ `await` it, so that it does not block forward progress of the remainder of the `fetchAndStream()` function. It will continue to run asynchronously until the response has been completed or the client disconnects.

This Worker doesn’t do anything particularly special — it is mostly equivalent to not having a Worker at all. However, it shows that your Worker can continue running a function (`response.body.pipeTo(writable)`) after a response has been returned to the client. The example above just pumps the subrequest response body to the final response body, but more complicated logic could be inserted, e.g. to add a prefix or a suffix to the body, or to process it in some way.

## Reference

### TransformStream

#### Properties

- `readable`: An instance of a `ReadableStream`.
- `writable`: An instance of a `WritableStream`.

### ReadableStream

_Note: A `ReadableStream` is returned as the `readable` property inside of a `TransformStream`. On the Workers platform, `ReadableStream` can't be created directly using the `ReadableStream` constructor._

#### Properties

- `locked`: A boolean indicating whether the readable stream is locked to a reader.

#### Methods

- `pipeTo(destination)`: Pipe the readable stream to a given writable stream, `destination`. Returns a promise that is fulfilled when the write operation has succeeded, or rejected if the operation fails.

- `getReader`: Get an instance of `ReadableStreamDefaultReader`, and locks the `ReadableStream` to that reader instance. The `getReader` method accepts an object argument indicating _options_, currently, we support one, `mode`, which can be set to `byob` to create a `ReadableStreamBYOBReader`:

  ```javascript
  let reader = readable.getReader({ mode: 'byob' })
  ```

### ReadableStreamDefaultReader

#### Properties

- `closed`: A promise that indicates whether the reader is closed, or not. The promise will be fulfilled when the reader stream is closed, and will reject if there is an error in the stream.

#### Methods

- `read`: A promise that returns the next available chunk of data being passed through the reader queue.
- `cancel(reason)`: Cancel the stream, passing an optional `reason` string (intended to be human-readable) to indicate the reason for the cancellation. Note: any data that has not yet been read will be lost.
- `releaseLock`: Release the lock on the readable stream. A lock can't be released if the reader still has pending read operations: a `TypeError` will be thrown and the reader will remain locked.

### ReadableStreamBYOBReader

_Note: An instance of `ReadableStreamBYOBReader`, created by passing the mode `byob` to `getReader` on an instance of `ReadableStream`, is functionally identical to `ReadableStreamDefaultReader`, with the exception of the `read` method._

#### Methods

- `read(buffer)`: Returns a promise with the next available chunk of data, read into a passed-in buffer.

### WritableStream

_Note: A `WritableStream` is returned as the `writable` property inside of a `TransformStream`. On the Workers platform, `WritableStream` can't be created directly using the `WritableStream` constructor._

#### Properties

- `locked`: A boolean indicating whether the writable stream is locked to a writer.

#### Methods

- `abort(reason)`: Abort the stream, passing an optional `reason` string (intended to be human-readable) to indicate the reason for the cancellation. Returns a promise, which fulfills with response `undefined`. Note: any data that has not yet been written will be lost.

- `getWriter`: Get an instance of `WritableStreamDefaultWriter`, and locks the `WritableStream` to that writer instance.

### WritableStreamDefaultWriter

#### Properties

- `desiredSize`: Returns the desired size needed to fill the stream's internal queue, as an integer. Will always return 1, 0 (if the stream is closed), or `null` (if errored).
- `closed`: A promise that indicates whether the writer is closed, or not. The promise will be fulfilled when the writer stream is closed, and will reject if there is an error in the stream.

#### Methods

- `abort(reason)`: If the writer is active, aborting it will behave similarly to `WritableStream`'s `abort` method. An optional `reason` string can be passed (intended to be human-readable) to indicate the reason for the cancellation. Returns a promise, which fulfills with `undefined`. Note: any data that has not yet been written will be lost.
- `close`: Attempt to close the writer. Remaining writes will finish processing, before the writer is closed. Returns a promise that fulfills with undefined if the writer successfully closes and processes remaining writes, or rejected if any errors are encountered.
- `releaseLock`: Releases the writer's lock on the stream. Once released, the writer will no longer be active. This method can be called _before_ all pending `write(chunk)` calls have been resolved: this allows you to queue a write operation, release the lock, and begin piping into the writable stream from another source:

```javascript
let writer = writable.getWriter()
// Write a preamble.
writer.write(new TextEncoder().encode('foo bar'))
// While that's still writing, pipe the rest of the body from somewhere else.
writer.releaseLock()
await someResponse.body.pipeTo(writable)
```

- `write(chunk)`: Writes a chunk of data to the writer. Returns a promise to indicate whether the operation has succeeded or failed.
