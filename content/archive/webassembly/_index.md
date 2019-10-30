---
title: "WebAssembly"
alwaysopen: true
weight: 35
---

WebAssembly is a new feature of the Open Web Platform. It's a bytecode targeted by all sorts of
languages -- a new language layer that offers better, more predictable performance for applications
that need it. It enables applications that were previously excluded from the Web to leverage
the amazing discovery and delivery that the Web Platform offers.

Cloudflare Workers runs in V8 isolates, which support both WebAssembly and JavaScript. This
documentation will get you up and running with Rust-generated WebAssembly.

Languages such as C, C++, AssemblyScript, and Go will eventually be supported, but currently, our
documentation focuses on Rust.

## Wrangler

Wrangler is a CLI tool that seeks to provide an end-to-end developer experience for building Rust-generated
WebAssembly Workers. Install Wrangler using `cargo`:

```
cargo install wrangler
```

### Quickstart

1. Generate a new project:

    ```
    wrangler generate
    ```

2. Move into the new project directory:
    ```

    cd wasm-worker
    ```

3. Build your project:

    ```
    wrangler build
    ```

4. Preview your project:

    ```
    wrangler preview
    ```

5. (optional) Configure with your Cloudflare account:

    ```
    wrangler config <email> <api_key>
    ```

    You must configure your account to be able to use the `publish` step, which will push your Worker live to the
    Cloudflare edge. If you don't configure, you can still use `wrangler` to generate, build, and preview
    a Worker.

6. Check your configuration:

    ```
    wrangler whoami
    ```

7. Publish your project:

    ```
    wrangler publish <zone_id>
    ```

    ... where `<zone_id>` is replaced with the `id` for the Cloudflare zone you are publishing to!
