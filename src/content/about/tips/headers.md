---
title: 'Logging Headers'
weight: 10
---

## Console-logging Headers

**TL;DR:** Use a Map if you just need to log a Headers object to the console:

```javascript
console.log(new Map(request.headers))
```

Use the spread operator if you need to quickly stringify a Headers object:

```javascript
let requestHeaders = JSON.stringify([...request.headers])
```

### The Problem

When debugging Worker scripts, we often want to examine the headers on a request
or response. A common pitfall is to try to log headers to the developer console
via code like this:

```javascript
console.log(request.headers)
```

or this:

```javascript
console.log(`Request headers: ${JSON.stringify(request.headers)}`)
```

Both result in what appears to be an empty object --- the string `{}` --- even
though calling `request.headers.has('Your-Header-Name')` might return true. This
is the same behavior that browsers implement.

The reason this happens is because [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)
objects do not store headers in enumerable JavaScript properties, so the
developer console and JSON stringifier do not know how to read the names and
values of the headers. It's not an empty object _per se_, but rather an opaque
object.

Headers objects are iterable, however, which we can take advantage of to develop
a couple quick one-liners for debug-printing headers.

## Pass Headers objects through a Map

The first common idiom for making Headers `console.log()`-friendly is to
construct a Map object from the Headers object, and log the Map object.

```javascript
console.log(new Map(request.headers))
```

This works because:

- Map objects can be constructed from iterables, like Headers.

- The Map object _does_ store its entries in an enumerable JavaScript property,
  so the developer console can see into it.

### Spread Headers into an array

The Map trick works great for simple calls to `console.log()`, but if we need to
actually stringify our headers, we quickly find out that stringifying a Map
yields nothing more than `[object Map]`, which isn't very helpful.

The JSON stringifier can't help us, either: even though our Map stores its data
in an enumerable property, that property is
[Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)-keyed,
and `JSON.stringify()`
[ignores Symbol-keyed properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description)
--- we end up with an empty `{}` again.

Instead, we can take advantage of the iterability of the Headers object in a new
way by applying the
[spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
(`...`) to it.

```javascript
let requestHeaders = JSON.stringify([...request.headers], null, 2)
console.log(`Request headers: ${requestHeaders}`)
```

This results in something like:

```javascript
Request headers: [
  [
    "accept",
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
  ],
  [
    "accept-encoding",
    "gzip"
  ],
  [
    "accept-language",
    "en-US,en;q=0.9"
  ],
  [
    "cf-ipcountry",
    "US"
  ],
  // ...
]
```

While not as elegant as object literal syntax, this is certainly readable and
useful for debugging purposes.
