---
title: HTMLRewriter
---

## Overview

The `HTMLRewriter` class allows developers to build comprehensive and expressive HTML parsers inside of Cloudflare Workers application. It can be thought of as a jQuery-like experience directly inside of your Workers application, allowing developers to build deeply functional applications, leaning on a powerful JavaScript API to parse and transform HTML.

## HTMLRewriter

The `HTMLRewriter` class should be instantiated once in your Workers script, with a number of handlers attached using the `on` and `onDocument` functions:

```js
new HTMLRewriter.on('*', new ElementHandler()).onDocument(new DocumentHandler())
```

## Selectors

| Pattern                        | Represents                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `*`                            | any element                                                                                                           |
| `E`                            | any element of type E                                                                                                 |
| `E:not(s)`                     | an E element that does not match either compound selector s                                                           |
| `E.warning`                    | an E element belonging to the class warning                                                                           |
| `E#myid`                       | an E element with ID equal to myid.                                                                                   |
| `E[foo]`                       | an E element with a foo attribute                                                                                     |
| `E[foo="bar"]`                 | an E element whose foo attribute value is exactly equal to bar                                                        |
| `E[foo="bar" i]`               | an E element whose foo attribute value is exactly equal to any (ASCII-range) case-permutation of bar                  |
| `E[foo="bar" s]`               | an E element whose foo attribute value is exactly and case-sensitively equal to bar                                   |
| `E[foo~="bar"]`                | an E element whose foo attribute value is a list of whitespace-separated values, one of which is exactly equal to bar |
| `E[foo^="bar"]`                | an E element whose foo attribute value begins exactly with the string bar                                             |
| `E[foo$="bar"]`                | an E element whose foo attribute value ends exactly with the string bar                                               |
| `E[foo*="bar"]`                | an E element whose foo attribute value contains the substring bar                                                     |
| <code>E[foo&#124;="en"]</code> | an E element whose foo attribute value is a hyphen-separated list of values beginning with en                         |
| `E F`                          | an F element descendant of an E element                                                                               |
| `E > F`                        | an F element child of an E element                                                                                    |

## Handlers

There are two handler types that can be used with `HTMLRewriter`: _element handlers_, and _document handlers_.

### Element Handlers

An element handler responds to any incoming element, when attached using the `.on` function of an `HTMLRewriter` instance. The element handler should respond to `element`, `comments`, and `text`. The below example will process `div` elements with an `ElementHandler` class:

```js
class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    console.log(`Incoming element: ${element.tagName}`)
  }

  comments(element) {
    // An incoming comment
  }

  text(element) {
    // An incoming piece of text
  }
}

async function handleRequest(req) {
  const res = await fetch(req)

  return new HTMLRewriter().on('div', new ElementHandler()).transform(res)
}
```

### Document Handlers

A document handler represents the incoming HTML document. As of now, a document handler can have a single function, `doctype`:

```js
class DocumentHandler {
  doctype(element) {
    // An incoming doctype, such as <!DOCTYPE html>
  }
}
```

### Element

The `element` argument, used in element and document handlers, is a representation of a DOM element. A number of methods exist on an element to query and manipulate it:

#### Properties

- `tagName`: a string representing the name of the tag, such as `"h1"` or `"div"`. This property can be assigned different values, to modify an element's tag.
- `attributes`: an iterator that returns a `[name, value]` pair of the tag's attributes. This property is read-only.
- `removed`: a boolean indicating whether the element has been removed or replaced by one of the previous handlers.

#### Methods

- `getAttribute(name: String): String | null`: Returns the value for a given attribute name on the element, or `null` if it isn't found.
- `hasAttribute(name: String): Boolean`: Returns a boolean indicating whether an attribute exists on the element.
- `setAttribute(name: String, value: String): Element`: Sets an attribute to a provided value, creating the attribute if it doesn't exist.
- `removeAttribute(name: String): Element`: Removes the attribute.
- `before(content: Content, contentOptions?: ContentOptions): Element`: Inserts content before the element.
- `after(content: Content, contentOptions?: ContentOptions): Element`: Inserts content right after the element.
- `prepend(content: Content, contentOptions?: ContentOptions): Element`: Inserts content right after the start tag of the element.
- `append(content: Content, contentOptions?: ContentOptions): Element`: Inserts content right before the end tag of the element.
- `replace(content: Content, contentOptions?: ContentOptions): Element`: Removes the element and inserts content in place of it.
- `remove(): Element`: Removes the element with all its content.
- `removeAndKeepContent(): Element`: Removes the start tag and end tag of the element, but keeps its inner content intact.
- `setInnerContent(content: Content, contentOptions?: ContentOptions): Element`: Replaces content of the element.

#### Types

For the methods and properties specified above, there are a few "types" that arguments should conform to:

- `Content`: `String`. Content inserted in the output stream should be a string.
- `ContentOptions`: `{ html: Boolean }`. Controls the way the HTMLRewriter treats inserted content. If the `html` boolean is set to true, content is treated as raw HTML. If the `html` boolean is set to false, or not provided, content will be treated as text, and proper HTML escaping will be applied to it.

### Text chunks

Since we perform zero-copy streaming parsing, text chunks are not the same thing as text nodes in the lexical tree. A lexical tree text node can be represented by multiple chunks, as they arrive over the wire from the origin.

Consider the following markup: `<div>Hey. How are you?</div>`. It's possible that the Workers script won't receive the entire text node from the origin at once; instead, the `text` element handler will be invoked for each received part of the text node. For example, the handler might be invoked with "Hey. How ", then "are you?". When the last chunk arrives, the text's `lastInTextNode` property will be set to true. Developers should make sure to concatenate these chunks together.

#### Properties

- `text: String`: Read-only, text content of the chunk. Could be empty if the chunk is the last chunk of the text node.
- `lastInTextNode: Boolean`: Read-only, specifies whether the chunk is the last chunk of the text node.

### Comments

```js
class DocumentHandler {
  comments(element) {
    // An incoming comment element, such as <!-- My comment -->
  }
}
```

#### Properties

- `text: String`: Read-only, text content of the chunk. Could be empty if the chunk is the last chunk of the text node.

## Building with `HTMLRewriter`

The `HTMLRewriter` class can be used to transform incoming HTML responses in a variety of ways. Below are a few examples of things that can be built with the `HTMLRewriter` in Cloudflare Workers:

### Transforming Mixed Responses

By looking for incoming `a` and `img` tags, an `HTMLRewriter` instance can rewrite any HTTP requests into secure HTTPS requests:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class ElementHandler {
  element(element) {
    switch (element.tagName) {
      case 'a':
        const href = element.getAttribute('href')
        element.setAttribute('href', href.replace(/^http:/, 'https:'))
      case 'img':
        const src = element.getAttribute('src')
        element.setAttribute('src', src.replace(/^http:/, 'https:'))
      default:
        console.log(`Unknown tag received: ${element.tagName}`)
    }
  }
}

async function handleRequest(req) {
  const res = await fetch(req)

  return new HTMLRewriter()
    .on('a', new ElementHandler())
    .on('img', new ElementHandler())
    .transform(res)
}
```

### Inserting HTML

It's common to use the Workers runtime to insert arbitrary HTML into a webpage, before serving it to the user. Previously, developers would get the HTML body of a response, and use text replacement (e.g. `text.replace()`) to insert HTML. The `HTMLRewriter` class allows a more declarative and safer approach to this problem. Take, for instance, appending a collection of `script` tags to the end of an HTML `body`:

```js
const scripts = [
  "<script src='https://myservice.com/1.js'></script>",
  "<script src='https://myservice.com/2.js'></script>",
  "<script src='https://myservice.com/3.js'></script>",
]

class BodyAppender {
  element(element) {
    element.append(scripts.join('\n'))
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(req) {
  const res = await fetch(req)

  return new HTMLRewriter().on('body', new BodyAppender()).transform(res)
}
```
