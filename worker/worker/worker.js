addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
    const { wasm_entry } = wasm_bindgen;
    await wasm_bindgen(wasm)
    try {
      var parsedUrl = new URL(request.url);
      var pathname = parsedUrl.pathname;

      // chop off the start when passing the url to wasm
      const response = await wasm_entry(parsedUrl.pathname.substring(1), POSTS)

      let res = new Response(response.body, {status: response.status_code})
      res.headers.set("Content-type", response.content_type)

      return res
    } catch (err) {
      console.log(err)
      let res = new Response(err.body, {status: err.status})
      res.headers.set("Content-type", "text/html")
      return res
    }
}
