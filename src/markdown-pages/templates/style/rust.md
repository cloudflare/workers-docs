#Rust Style Guide

If you are using Wasm and write in Rust, your template should adhere to rustfmt and clippy.

## Configuring rustfmt

Before submitting code in a PR, make sure that you have formatted the codebase
using [rustfmt][rustfmt]. `rustfmt` is a tool for formatting Rust code, which
helps keep style consistent across the project. If you have not used `rustfmt`
before, here's how to get setup:

**1. Use Stable Toolchain**

Use the `rustup override` command to make sure that you are using the stable
toolchain. Run this command in the `cargo-generate` directory you cloned.

```sh
rustup override set stable
```

**2. Add the rustfmt component**

Install the most recent version of `rustfmt` using this command:

```sh
rustup component add rustfmt-preview --toolchain stable
```

**3. Running rustfmt**

To run `rustfmt`, use this command:

```sh
cargo +stable fmt
```

[rustfmt]: https://github.com/rust-lang-nursery/rustfmt
