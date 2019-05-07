—

1. Make a Google Cloud Storage bucket (public)

2. Serve asset back from worker with correct content types, etc

3. Set caching rules based on type of file (custom caching)

   

```javascript
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

const extensionsToCache = [
  'bmp', 'ejs', 'jpeg', 'pdf', 'ps', 'ttf', 'class', 'eot', 'jpg', 'pict', 'svg', 'webp', 'css', 'eps', 'js', 'pls', 'svgz', 'woff', 'csv', 'gif', 'mid', 'png', 'swf', 'woff2', 'doc', 'ico', 'midi', 'ppt', 'tif', 'xls', 'docx', 'jar', 'otf', 'pptx', 'tiff', 'xlsx'
]

const bucketName = "my-bucket"
const bucketUrl = `http://storage.googleapis.com/${bucketName}`

async function handleRequest(request) {
  let response = await cache.match(request)
  if (!response) {
    const parsedUrl = new URL(request.url)
    const path = parsedUrl.pathname
    response = await fetch(`${bucketUrl}${path}`)
    event.waitUntil(cache.put(event.request, response.clone()))
  }
  return response
}
```

