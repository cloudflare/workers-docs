# Cloudflare Workers Template Gallery

TODO: make this pretty display of linking to these templates' wrangler generate command, tutorial, live demo
TODO: replace links to gist with links to repos on Cloudflare's Github

While most of the templates below are near useless alone, they are designed to 
be simple building blocks for building a Worker script.

### Router

[`router.js`](https://gist.github.com/victoriabernard92/e87d23312d9b29b7fabb5e778810dfd4)

Decide which logic to execute based on the request's method and URL. Can be
used for a REST API or any app needing routing logic.

[Live demo](http://workers-tooling.cf/router/bar)

### Static

[`static.js`](https://gist.github.com/victoriabernard92/4e73ed016998acace1db8c780104ba71)

Generate a fully functioning HTML page from cloud storage or from inputting
raw HTML into your work. Also, send static JSON.

[Live demo HTML](http://workers-tooling.cf/static/html)
[Live demo JSON](http://workers-tooling.cf/static/json)

### Sending and Recieving Data

`data.js`

Examples of reading in a POST request body and writing back with a response body. TODO: add to the demo reading in a POST

[Live demo HTML](http://workers-tooling.cf/fetch/html)
[Live demo JSON](http://workers-tooling.cf/fetch/json)

### Redirects

`redirects.js`

Deliever and handle redirects.
[Live demo HTML](TODO: implement and fill in )
