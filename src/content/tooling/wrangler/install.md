---
title: Install
weight: 1
---

You have many options to install wrangler!

### Install with `npm`

```bash
npm i @cloudflare/wrangler -g
```

### Install with `cargo`

```bash
cargo install wrangler
```

If you don't have `cargo` or `npm` installed, you will need to follow these [additional instructions](#additional-installation-instructions).

## Additional Installation Instructions

Wrangler can be installed both through [npm](https://www.npmjs.com/get-npm) and through Rust's package manager, [Cargo](https://github.com/rust-lang/cargo).

### Using `npm`

1. If you don't already have npm on your machine, install it using [npm's recommended method](https://www.npmjs.com/get-npm), a node.js version manager.

   If you have already installed npm with a package manager, it is possible you will run into an `EACCES` error while installing wrangler. This is related to how many system packagers install npm. You can either uninstall npm and reinstall using the npm recommended install method (a version manager), or use one of our other install methods.

2. Install Wrangler by running:

   ```bash
   npm i @cloudflare/wrangler -g
   ```

### Using `cargo`

1. Install `cargo`:

   Rustup, a tool for installing Rust, will also install Cargo. On Linux and macOS systems, `rustup` can be installed as follows:

   ```bash
   curl https://sh.rustup.rs -sSf | sh
   ```

   Additional installation methods are available [here](https://forge.rust-lang.org/other-installation-methods.html).

2. Install `wrangler`:

   ```bash
   cargo install wrangler
   ```

   Installing wrangler on linux requires some [OpenSSL-related packages](https://docs.rs/openssl/0.10.24/openssl/#automatic) to be installed. If you don't want to deal with this, you can use vendored OpenSSL.

   ```bash
   cargo install wrangler --features vendored-openssl
   ```

### Manual Install

1. Download the binary tarball for your platform from our [releases page](https://github.com/cloudflare/wrangler/releases). You don't need to download wranglerjs, wrangler will install that for you.

2. Unpack the tarball and place the binary `wrangler` somewhere on your `PATH`, preferably `/usr/local/bin` for linux/macOS or `Program Files` for windows.
