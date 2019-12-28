---
title: "Handling Errors"
weight: 35
---

As with any programming environment, Workers can have bugs.  Your Worker could include a logical
error, fail to handle an edge case, or otherwise trigger a JavaScript exception.

As Workers are designed to support use-cases where they implement security on top of your site, by default,
your Worker will show a 1101 error message if it encounters a JavaScript exception. It is common, however,
to either want to handle exceptions in a more nuanced way or to return a response to the user as if the
Worker weren't installed at all.

### Catch Errors

You can use a JavaScript `try` block to catch any errors which may occur in your Worker, then return
a response of your choice.

For example, this Worker has protected itself against errors which may occur in the method it calls:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    var response = dangerousThingWhichMightError()
  } catch (e) {
    return new Response("Something didn’t quite work")
  }

  return response
}
```

You can even report to error tracking services like Sentry or Bugsnag inside the catch handler in your Worker.

Keep in mind that due to the asynchronous nature of JavaScript, you need a separate try/catch block inside any
async handler which will be called later in the execution flow.

### Origin Response

Often, if your Worker isn’t doing security-critical activities, it makes sense for it to act as if it’s not
installed at all if it errors. This allows you to install logging, tracking, or other minor Workers without
fearing they may break your underlying site. This behavior can be toggled on by calling `event.passThroughOnException()`:

```javascript
addEventListener('fetch', event => {
  event.passThroughOnException()

  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // An error here will return the origin response, as if the Worker wasn’t present.
  return fetch(request)
}
```
