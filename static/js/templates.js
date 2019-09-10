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
    const opts = idx.search(query).map(result => result.ref)
    results = corpus.filter(item => opts.includes(item.id))
  } else {
    results = corpus
  }
  processSearch()
}

let results = corpus

const processSearch = () => {
  const templates = document.querySelectorAll('.template-card')
  templates.forEach(
    elem =>
      (elem.style = `display: ${!results.find(result => result.id === elem.id) ? 'none' : ''}`),
  )
}

document.querySelector('#search').addEventListener('input', evt => {
  const value = evt.target.value
  search(value)
})

const categoriesElem = document.querySelector('#categories')
const categories = new Choices(categoriesElem)
categoriesElem.addEventListener('change', evt => {
  const value = evt.detail.value
  search(value === 'All' ? null : value)
})

const typeElem = document.querySelector('#type')
const type = new Choices(typeElem)
typeElem.addEventListener('change', evt => {
  const value = evt.detail.value
  search(value === 'All' ? null : value)
})
