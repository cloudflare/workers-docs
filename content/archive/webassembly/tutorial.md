---
title: "Tutorial"
weight: 20
---

Let's take a look at how `wrangler` can help Cloudflare users build on Workers with Rust and WebAssembly today.

This tutorial will walk you through the steps of generating, building, previewing, configuring, and publishing
a Rust-generated WebAssembly Cloudflare Worker that parses Markdown. Let's get started!

## Installing Wrangler

Wrangler is a CLI tool that provides an end-to-end developer experience for building Rust-generated
WebAssembly Workers. Install Wrangler using `cargo`:

```
cargo install wrangler
```

## Generating

No one likes to write boilerplate, right?

The next step in our project is to set up a new Rust and WebAssembly project and a Worker project. There's not
much boilerplate to write to do this, but to save you the time, `wrangler` has a `generate` command
that will generate a "Hello, World" project for you, with all the Worker, Rust, and WebAssembly goodies you'll
need to get going.

By default, this command will generate a project named `wasm-worker`, but you can provide a name. Let's call
ours `demo`:

```
wrangler generate demo
```

Let's move into that directory (`cd demo`) and take a look at what this gave us:

- `CODE_OF_CONDUCT.md`, `LICENSE_APACHE`, `LICENSE_MIT` are all nice-to-have community assets. Feel free
  to keep them, change them, or remove them entirely. Apache2.0/MIT is the standard licensing in the Rust
  project; you'll find that most Rust projects follow this licensing.
- `Cargo.toml` is our manifest for our Rust WebAssembly library.
- `src` is a directory, with a couple files in it. This is where we'll write our Rust.
- `worker` is also a directory. It contains a `worker.js` file where we'll write our Worker's JavaScript and pull
  in our Rust WebAssembly library. There's another file in there, `metadata_wasm.json`. This file is metadata for
  the WebAssembly we'll publish to Cloudflare.

This `generate` feature gives us a fully functioning "Hello, World" Cloudflare Worker, ready to publish. Let's
preview it with Cloudflare. Then we'll go back and make it more interesting.

### Workers Playground

At the moment, it's not yet possible to run your Cloudflare Worker locally on your machine, but we do offer a hosted
preview - and you don't need to have a Cloudflare user account to use it! To run the preview, use the
`preview` command:

```
wrangler preview
```

Using the preview command will open a browser window with your Cloudflare Worker loaded in the Cloudflare preview
UI. Assuming everything went well, it should look like this:

![Cloudflare UI with working RustWasm Worker](/archive/static/rustwasm0.png)

You can also send and receive requests to your Worker from the command line by passing `get` or `post` as arguments:

```bash
$ wrangler preview get
👷‍♀️ GET https://00000000000000000000000000000000.cloudflareworkers.com
👷‍♀️ Your worker responded with: Hello, wasm-worker!

$ wrangler preview post hello=hello
👷‍♀️ POST https://00000000000000000000000000000000.cloudflareworkers.com
👷‍♀️ Your worker responded with: Hello, wasm-worker!
```

### Building

Let's make our Worker more interesting. We'll pull in a dependency from the `crates.io` ecosystem called `pulldown-cmark`.
We'll add this to our `Cargo.toml`:

```
## Cargo.toml

[dependencies]
pulldown-cmark = "0.4.0"
```

Now we'll leverage the code in the `string-to-string` example from the `pulldown-cmark` GitHub repository. Let's change
our `src/lib.rs` to look like this:

```rust
// src/lib.rs

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;
use pulldown_cmark::{Parser, Options, html};

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub fn parse() -> String {
    let markdown_input: &str = "Hello world, this is a ~~complicated~~ *very simple* example.";
    println!("Parsing the following markdown string:\n{}", markdown_input);

    // Set up options and parser. Strikethroughs are not part of the CommonMark standard
    // and we therefore must enable it explicitly.
    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);
    let parser = Parser::new_ext(markdown_input, options);

    // Write to String buffer.
    let mut html_output: String = String::with_capacity(markdown_input.len() * 3 / 2);
    html::push_html(&mut html_output, parser);

    // Check that the output is what we expected.
    let expected_html: &str = "<p>Hello world, this is a <del>complicated</del> <em>very simple</em> example.</p>\n";
    assert_eq!(expected_html, &html_output);

    format!("\nHTML output:\n{}", &html_output)
}
```

Now we'll update our `worker.js` to use the new code we've written:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
    const { parse } = wasm_bindgen;
    await wasm_bindgen(wasm)
    const output = parse()
    let res = new Response(output, {status: 200})
    res.headers.set("Content-type", "text/html")
    return res
}
```

Whenever we `preview` or `publish`, `wrangler` will build our project. But if you just want to `build` and not
`preview` or `publish`, you can run the `build` command:

```
wrangler build
```

This will compile your Rust to WebAssembly. It'll show you any compiler errors you have so you can fix them!
To preview this code in the Cloudflare UI, you can run:

```
wrangler preview
```

If everything worked, you should see:

![Cloudflare UI with working RustWasm Worker](/archive/static/rustwasm1.png)

### Configuration

Our Worker is working! Before we publish, we'll need to configure `wrangler` to use our Cloudflare account
information. To do this, we'll use the `config` command, passing in a Cloudflare account email address and API key:

```
$ wrangler config <email> <apikey>

✨ Successfully configured. You can find your configuration file at: /Users/ag_dubs/.wrangler/config/default.toml. ✨
```

`wrangler` stores your information in a configuration file in a `.wrangler` directory in the home directory on your
machine. It'll use this information to interact with Cloudflare APIs to get more information about your account and
publish your Worker.

We can confirm that you are properly configured by running the `whoami` command:

```
wrangler whoami
```

### Publishing

Finally, let's publish our Worker. To do so we'll use the `publish` command:

```
wrangler publish <zone_id>
```

... where `<zone_id>` is replaced with your Cloudflare zone ID.

If successful, you should be able to go to your zone in the Cloudflare UI, launch the Workers editor, and see your
functioning Worker. Congrats! You did it!
