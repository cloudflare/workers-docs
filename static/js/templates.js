let boilerplates, snippets, featured_boilerplates
const grabTemplates = async () => {
  // search the DOM for an element we tagged earlier with all the
  // templates' JSON
  const templates = JSON.parse(document.querySelector('#templates').innerText)
  boilerplates = templates.filter(el => el.type === 'boilerplate')
  snippets = templates.filter(el => el.type === 'snippet')
  featured_boilerplates = templates.filter(
    el => el.type === 'featured_boilerplate',
  )
}
// Process templates JSON into lunr-supported JS objects
const constructCorpus = () => {
  const toLunr = (item, type) => ({ type, ...item })
  return [
    ...Object.values(boilerplates).map(item => toLunr(item, 'boilerplates')),
    ...Object.values(featured_boilerplates).map(item =>
      toLunr(item, 'featured_boilerplates'),
    ),
    ...Object.values(snippets).map(item => toLunr(item, 'snippets')),
  ]
}
let results, corpus
window.addEventListener('DOMContentLoaded', async event => {
  await grabTemplates()
  corpus = constructCorpus()
  results = corpus

  document.querySelector('#search').addEventListener('input', evt => {
    const value = evt.target.value
    handleNewSearchValue(value)
  })
  // Set up select element using Choices library
  const typeElem = document.querySelector('#type')
  const type = new Choices(typeElem)
  typeElem.addEventListener('change', searchFilters)

  // Handle ?q query param and set default search with it,
  // if it exists
  const url = new URL(window.location)
  const initialSearch = url.searchParams.get('q')
  if (initialSearch) {
    handleNewSearchValue(initialSearch)
  }
  // Construct the search index using lunr
  const idx = lunr(function() {
    this.ref('id')
    this.field('title')
    this.field('description')
    this.field('type')
    this.field('tags')

    corpus.forEach(function(doc) {
      this.add(doc)
    }, this)
  })
  window.idx = idx
})

// Search based on a query, updating `results`
const search = query => {
  if (query) {
    const opts = idx.search(`${query}*`).map(result => result.ref)
    results = corpus.filter(item => opts.includes(item.id))
  } else {
    results = corpus
  }
  if (results.length) {
    processSearch()
  } else {
    processEmpty()
  }
}

// Update the UI with search results
const processSearch = () => {
  const resultsContainer = document.querySelector('#results')
  resultsContainer.style.display = 'block'

  const empty = document.querySelector('#empty')
  empty.style.display = 'none'
  empty.style.marginBottom = null

  const templates = document.querySelectorAll('.template-card')
  templates.forEach(
    elem =>
      (elem.style = `display: ${!results.find(result => result.id === elem.id)
        ? 'none'
        : ''}`),
  )
  // Remove section headers that contain no results
  const sectionHeaders = document.querySelectorAll('#results>h2')
  sectionHeaders.forEach(header => {
    // all headers' next sibling is a `section` that parents the templates
    let matches = [...header.nextElementSibling.childNodes].filter(el =>
      results.find(result => result.id === el.id),
    )
    header.style.display = matches.length ? '' : 'none'
  })
}

// Update the UI when there aren't any results
const processEmpty = () => {
  const resultsContainer = document.querySelector('#results')
  resultsContainer.style.display = 'none'

  const empty = document.querySelector('#empty')
  empty.style.display = 'block'
  // hack to fix rendering of select
  empty.style.marginBottom = '999px'
}

// Event handler based on changes to the #search input
const handleNewSearchValue = _.throttle(value => {
  const params = new URLSearchParams(location.search)

  if (value.length) {
    params.set('q', value)
    window.history.replaceState({}, '', `${location.pathname}?${params}`)
  } else {
    params.delete('q')
    window.history.replaceState({}, '', location.pathname)
  }

  document.querySelector('#search').value = value

  if (value.length && value.length < 3) {
    return
  }

  search(value)
}, 500)

// Event handler when the #type select changes
const searchFilters = evt => {
  const value = evt.detail.value
  search(value === 'All' ? null : value)
}
