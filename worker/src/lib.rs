#![feature(async_await)]

use js_sys::Promise;

use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::futures_0_3::*;

use serde::{Deserialize, Serialize};

use std::path::{PathBuf, Path};
use std::ffi::OsStr;

#[derive(Debug, Serialize, Deserialize)]
struct Response {
    status_code: u16,
    content_type: String,
    body: String,
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
        let body = future
            .await
            .expect("couldn't fetch page data")
            .as_string()
            .expect("couldnt get a string");

        let content_type = determine_content_type(&path)?;

        let response = Response {
            body,
            status_code: 200,
            content_type,
        };

        JsValue::from_serde(&response).map_err(|_| JsValue::from_str("couldn't convert to serde"))
    })
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

fn determine_content_type(path: &Path) -> Result<String, JsValue> {
    let ext = path
        .extension()
        .and_then(OsStr::to_str)
        .unwrap_or("");

    let content_type = match ext {
        "html" => "text/html",
        "css" => "text/css",
        "ttf" => "application/font-sfnt",
        "yml" => "text/yaml",
        "eot" => "application/vnd.ms-fontobject",
        "json" => "application/json",
        "md" => "text/markdown",
        "webm" => "video/webm",
        "otf" => "application/font-sfnt",
        "js" => "text/javascript",
        "xml" => "text/xml",
        "svg" => "image/svg+xml",
        "scss" => "text/x-sass",
        "woff" => "application/font-woff",
        "woff2" => "font/woff2",
        "png" => "image/png",
        "jpg" => "image/jpeg",
        "mp4" => "video/mp4",
        _ => "text/plain",
    };

    Ok(content_type.to_string())
}
