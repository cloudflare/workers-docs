---
title: Template Gallery
alwaysopen: true
weight: 3
---

<p>These templates are simple building blocks for developing Workers scripts.</p>

<div style="display: flex">
  <div style="flex: 2; margin-right: 16px;">
    <label style="font-weight: normal; color: #666;">Search templates</label>
    <input id="search" style="padding: 10px; width: 100%"></input>
  </div>
  <div style="flex: 1; margin-right: 16px;">
    <label style="font-weight: normal; color: #666;">Type</label>
    <select id="type" style="width: 100%">
      <option>All</option>
      <option>Boilerplates</option>
      <option>Snippets</option>
      <option>Featured</option>
    </select>
  </div>
  <div style="flex: 1; margin-right: 16px;">
    <label style="font-weight: normal; color: #666;">Categories</label>
    <select id="categories" style="width: 100%">
      <option>All</option>
      <option>Originless</option>
      <option>Middleware</option>
      <option>Enterprise</option>
      <option>Paid</option>
      <option>Free</option>
    </select>
  </div>
</div>

<h2>Boilerplates</h2>
{{< boilerplates >}}

<h2>Snippets</h2>
{{< snippets >}}

<h2>Featured Projects</h2>
{{< featured_boilerplates >}}

<div id="templates"></div>

The gallery is actively growing. The [template creator](https://github.com/victoriabernard92/workers-template-creator) allows you to share templates. Host a public repo, and then run `wrangler generate https://github.com/<your-repo>`.

For archived recipes, see [the old docs](https://developers.cloudflare.com/workers/recipes/).

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.core.min.js" integrity="sha256-yEkk5ZYVs/fZgvxWU+sCb8bHTk9jScxIaZQD+CZ4vcg=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css">
<script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
<script>
  const boilerplates = JSON.parse(document.querySelector("#boilerplates").innerText)
  const snippets = JSON.parse(document.querySelector("#snippets").innerText)
  const featured_boilerplates = JSON.parse(document.querySelector("#featured_boilerplates").innerText)
</script>
<script src="/js/templates.js"></script>
