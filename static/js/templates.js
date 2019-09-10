const constructCorpus = () => {
  const toLunr = (item, type) => ({ type, ...item })
  return [
    ...Object.values(boilerplates).map(item => toLunr(item, 'boilerplates')),
    ...Object.values(featured_boilerplates).map(item => toLunr(item, 'featured_boilerplates')),
    ...Object.values(snippets).map(item => toLunr(item, 'snippets')),
  ]
}

const corpus = constructCorpus()

const idx = lunr(function() {
  this.ref('id')
  this.field('name')
  this.field('description')
  this.field('type')
  this.field('tags')

  corpus.forEach(function(doc) {
    this.add(doc)
  }, this)
})

window.idx = idx

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

let results = corpus

const processSearch = () => {
  const resultsContainer = document.querySelector('#results')
  resultsContainer.style.display = 'block'

  const empty = document.querySelector('#empty')
  empty.style.display = 'none'
  empty.style.marginBottom = null

  const templates = document.querySelectorAll('.template-card')
  templates.forEach(
    elem =>
      (elem.style = `display: ${!results.find(result => result.id === elem.id) ? 'none' : ''}`),
  )
}

const processEmpty = () => {
  const resultsContainer = document.querySelector('#results')
  resultsContainer.style.display = 'none'

  const empty = document.querySelector('#empty')
  empty.style.display = 'block'
  // hack to fix rendering of select
  empty.style.marginBottom = '999px'
}

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

document.querySelector('#search').addEventListener('input', evt => {
  const value = evt.target.value
  handleNewSearchValue(value)
})

const searchFilters = evt => {
  const value = evt.detail.value
  search(value === 'All' ? null : value)
}

// const categoriesElem = document.querySelector('#categories')
// const categories = new Choices(categoriesElem)
// categoriesElem.addEventListener('change', searchFilters)

const typeElem = document.querySelector('#type')
const type = new Choices(typeElem)
typeElem.addEventListener('change', searchFilters)

const url = new URL(window.location)
const initialSearch = url.searchParams.get('q')
if (initialSearch) {
  handleNewSearchValue(initialSearch)
}

const startOver = document.querySelector('#start_over').addEventListener('click', evt => {
  handleNewSearchValue('')
})
