# Web Crypto API

## Overview

The Web Crypto API provides a set of low-level functions for common cryptographic tasks. The Workers Runtime implements the full surface of this API, but with some differences in the [supported algorithms](#supported-algorithms) compared to those implemented in most browsers. It is commonly used for [signing requests](TODO: link signed requests article)

### Functions

[`crypto.getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues): Fills the passed [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) with cryptographically sound random values.

## SubtleCrypto

Accessible from `crypto.subtle`.

### Methods

Implements the full API described [here](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods).

### Supported Algorithms

|                           | sign()<br />verify() | encrypt()<br />decrypt() | digest() | deriveBits()<br />deriveKey() | generateKey() | wrapKey()<br />unwrapKey() |
| :------------------------ | :------------------- | :----------------------- | :------- | :---------------------------- | :------------ | :------------------------- |
| RSASSA-PKCS1-v1_5         | ✓                    |                          |          |                               |               |                            |
| ECDSA                     | ✓                    |                          |          |                               |               |                            |
| HMAC <br />(w/ SHA*, MD5) | ✓                    |                          |          |                               | ✓             |                            |
| AES-CBC                   |                      | ✓                        |          |                               |               | ✓                          |
| AES-GCM                   |                      | ✓                        |          |                               | ✓             | ✓                          |
| SHA-1                     |                      |                          | ✓        |                               |               |                            |
| SHA-256                   |                      |                          | ✓        |                               |               |                            |
| SHA-384                   |                      |                          | ✓        |                               |               |                            |
| SHA-512                   |                      |                          | ✓        |                               |               |                            |
| MD5                       |                      |                          | ✓        |                               |               |                            |
| PBKDF2                    |                      |                          |          | ✓                             |               |                            |
