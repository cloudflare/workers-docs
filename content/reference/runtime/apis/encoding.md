---
title: Encoding API
---

## TextEncoder

Takes a stream of code points as input and emits a stream of bytes. Passing an encoding type to the constructor will be ignored, and a utf-8 TextEncoder will be created.

### Constructor

[`TextEncoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder): Returns a newly constructed `TextEncoder` that will generate a byte stream with utf-8 encoding. Takes no parameters, throws no exceptions.

### Properties

[`encoding`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encoding) (Read only): A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) containing the name of the encoder, that is a string describing the method the `TextEncoder` will use. Always `utf-8`.

### Methods

[`encode()`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode): Takes a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) as input, and returns a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Typed_arrays/Uint8Array) containing utf-8 encoded text.

## TextDecoder

The **TextDecoder** interface represents a decoder for `utf-8`. A decoder takes a stream of bytes as input and emits a stream of code points.

### Constructor

[`TextDecoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder): Returns a newly constructed `TextDecoder` that will generate a code point stream.

### Properties

[`encoding`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/encoding)(Read only): Is a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) containing the name of the decoder, that is a string describing the method the `TextDecoder` will use.

`TextDecoder.fatal` (Read only): Is a `Boolean` indicating whether the error mode is fatal.

`TextDecoder.ignoreBOM` (Read only): Is a `Boolean` indicating whether the byte order marker is ignored.

### Methods

[`decode()`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode): Returns a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) containing the text decoded with the method of the specific `TextDecoder` object.
