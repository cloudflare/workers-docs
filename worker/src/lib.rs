#![feature(async_await)]

use js_sys::Promise;

use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::futures_0_3::*;

use pulldown_cmark::{html, Options, Parser};

use handlebars::Handlebars;

use serde::{Deserialize, Serialize};

use std::path::{PathBuf, Path};
use std::ffi::OsStr;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Debug, Serialize, Deserialize)]
struct YamlHeader {
    title: String,
    description: String,
    layout: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Response {
    status_code: u16,
    content_type: String,
    body: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct RenderContents {
    title: String,
    description: String,
    contents: String,
}

#[wasm_bindgen]
extern "C" {
    pub type Data;

    #[wasm_bindgen(structural, method)]
    pub fn get(this: &Data, key: &str) -> Promise;

    #[wasm_bindgen(structural, method)]
    pub fn put(this: &Data, key: &str, value: &str) -> Promise;
}

#[wasm_bindgen]
pub fn wasm_entry(path: String, data: Data) -> Promise {
    future_to_promise(async move {
        let path = PathBuf::from(path);

        let path = normalize_path(path);

        let future = JsFuture::from(data.get(path.to_str().unwrap()));
        let contents = future
            .await
            .expect("couldn't fetch page data")
            .as_string()
            .expect("couldnt get a string");

        let ext = path
            .extension()
            .and_then(OsStr::to_str)
            .unwrap_or("");

        let body = if ext == "md" {
            render_markdown2(&contents, data).await
        } else {
            contents
        };

        let content_type = determine_content_type(&path)?;

        let response = Response {
            body,
            status_code: 200,
            content_type,
        };

        JsValue::from_serde(&response).map_err(|_| JsValue::from_str("couldn't convert to serde"))
    })
}

fn render_markdown(markdown_input: &str) -> String {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_STRIKETHROUGH);

    let parser = Parser::new_ext(&markdown_input, options);

    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);

    html_output
}

fn normalize_path(path: PathBuf) -> PathBuf {
    let mut path = if path.to_str() == Some("") {
        PathBuf::from("index.html")
    } else {
        path
    };

    let ext = path
        .extension()
        .and_then(OsStr::to_str)
        .unwrap_or("");

    if ext == "html" {
        path.set_extension("md");
    }

    path
}

async fn render_markdown2(contents: &str, data: Data) -> String {
    // parse out yaml header
    let end_of_yaml = contents[4..].find("---").unwrap() + 4;
    let yaml = &contents[..end_of_yaml];

    let YamlHeader {
        title,
        description,
        layout,
    } = serde_yaml::from_str(yaml).expect("Could not parse from yaml");

    // render markdown
    let contents = render_markdown(&contents[end_of_yaml + 5..]);

    // fetch layout
    let layout_name = layout.unwrap_or(String::from("layout.hbs"));
    let future = JsFuture::from(data.get(&layout_name));
    let layout_contents = future
        .await
        .expect("couldn't fetch layout")
        .as_string()
        .expect("couldnt get a string");

    // render layout + body
    let reg = Handlebars::new();

    let data = RenderContents {
        title,
        description,
        contents,
    };

    reg.render_template(&layout_contents, &data)
        .expect("couldn't render handlebars")
}

fn determine_content_type(path: &Path) -> Result<String, JsValue> {
    let ext = path
        .extension()
        .and_then(OsStr::to_str)
        .unwrap_or("");

    let content_type = match ext {
        "md" => "text/html",
        "css" => "text/css",
        _ => "text/plain",
    };

    Ok(content_type.to_string())
}
