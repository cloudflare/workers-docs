---
title: Template Gallery
alwaysopen: false
weight: 2
---

<p>These templates are simple building blocks for developing Workers scripts.</p>

<div style="display: flex">
  <div style="flex: 2; margin-right: 16px;">
    <label style="font-weight: normal; color: #666;">Search templates</label>
    <input id="search" placeholder="🔎 Search by template name or other details" style="padding: 10px; width: 100%"></input>
  </div>
  <div style="flex: 1; margin-right: 16px;">
    <label style="font-weight: normal; color: #666;">Type</label>
    <select id="type" style="width: 100%">
      <option>All</option>
      <option>Boilerplates</option>
      <option>Snippets</option>
      <option value="featured_boilerplates">Featured</option>
    </select>
  </div>
</div>

<div id="empty" style="display: none; margin-top: 20px;">
<p>No results were found for your search. Try adjusting your search.</p>
</div>

<div id="results">
  <h2 style="padding-bottom: 20px">Boilerplates</h2>
  {{< boilerplates >}}

  <h2 style="padding-bottom: 20px">Snippets</h2>
  {{< snippets >}}

  <h2 style="padding-bottom: 20px">Featured Projects</h2>
  {{< featured_boilerplates >}}

The gallery is actively growing. The <a href="https://github.com/victoriabernard92/workers-template-creator">template creator</a> allows you to share templates. Host a public repo, and then run <code>wrangler generate https://github.com/<your-repo></code>.

For archived recipes, see <a href="https://developers.cloudflare.com/workers/recipes/">the old docs</a>.

</div>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js" integrity="sha256-VeNaFBVDhoX3H+gJ37DpT/nTuZTdjYro9yBruHjVmoQ=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css">
<script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
<script>
  const boilerplates = JSON.parse(document.querySelector("#boilerplates").innerText)
  const snippets = JSON.parse(document.querySelector("#snippets").innerText)
  const featured_boilerplates = JSON.parse(document.querySelector("#featured_boilerplates").innerText)
</script>
<script src="/js/templates.js"></script>
