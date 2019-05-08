# Web Crypto API

## Crypto

### Properties

[`Crypto.subtle`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle) (Read only): Returns a [`SubtleCrypto`](#SubtleCrypto) object providing access to common cryptographic primitives, like hashing, signing, encryption or decryption.

### Methods

[`Crypto.getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues): Fills the passed [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) with cryptographically sound random values.

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