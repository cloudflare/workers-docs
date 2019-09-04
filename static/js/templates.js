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

  corpus.forEach(function(doc) {
    this.add(doc)
  }, this)
})

window.idx = idx

const search = query => idx.search(query).map(result => result.ref)

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
  const query = search(value)
  results = corpus.filter(item => query.includes(item.id))
  processSearch()
})
