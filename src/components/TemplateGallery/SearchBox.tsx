import lunr from 'lunr'
import React, { ReactElement } from 'react'
import { restApiTemplate } from '../../types/restApiTemplates'
import debounce from 'lodash.debounce'

// // Search based on a query, updating `results`
// const search = query => {
//   // Get the rendered "choices" (the types in our type select)
//   // and map their text values into `types`
//   const types = [].slice
//     .call(document.querySelectorAll('.choices__item--choice'))
//     .map(el => el.getAttribute('data-value'))

// // Update the UI with search results
// const processSearch = () => {
//   const resultsContainer = document.querySelector('#results')
//   resultsContainer.style.display = 'block'

//   const empty = document.querySelector('#empty')
//   empty.style.display = 'none'
//   empty.style.marginBottom = null

//   const templates = document.querySelectorAll('.template-card')
//   templates.forEach(
//     elem =>
//       (elem.style = `display: ${!results.find(result => result.id === elem.id) ? 'none' : ''}`),
//   )
//   // Remove section headers that contain no results
//   const sectionHeaders = document.querySelectorAll('#results>h2')
//   sectionHeaders.forEach(header => {
//     // all headers' next sibling is a `section` that parents the templates
//     let matches = [...header.nextElementSibling.childNodes].filter(el =>
//       results.find(result => result.id === el.id),
//     )
//     header.style.display = matches.length ? '' : 'none'
//   })
// }
type SearchBoxProps = {
  templates: restApiTemplate[]
  children: (input: restApiTemplate[]) => ReactElement
}
type SearchBoxState = {
  searchQuery: string
  results: lunrResult[]
  //   idx: any
  documents: restApiTemplate[]
}
type lunrResult = lunr.Index.Result & {
  item: restApiTemplate | undefined
}
export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  public idx: lunr.Index

  constructor(props: SearchBoxProps) {
    super(props)
    const { templates } = props
    // Process templates JSON into lunr-supported JS objects
    const constructCorpus = () => {
      // const toLunr = (item: restApiTemplate, type: restApiTemplate['type']) => ({ type, ...item })
      return [
        ...Object.values(templates), // .map(item => toLunr(item, 'boilerplates')),
      ]
    }
    let corpus: restApiTemplate[]
    corpus = constructCorpus()
    // const idx = lunr(function() {
    this.idx = lunr(function() {
      this.ref('endpointId')
      this.field('title')
      this.field('description')
      this.field('type')
      this.field('tags')

      corpus.forEach((doc: any) => {
        this.add(doc)
      }, this)
    })
    let emptySearch = this.idx.search('*').map(({ ref, ...rest }: lunr.Index.Result) => ({
      ref,
      item: corpus.find((m: any) => m.endpointId === ref),
      ...rest,
    }))

    this.state = { searchQuery: '', results: emptySearch, documents: corpus }
  }

  componentDidMount() {
    // @ts-ignore
    window.idx = this.idx
  }
  handleNewSearchValue = (event: any) => {
    const value = event.target.value
    // if (!value.length) {
    //   return
    // }
    const doSearch = debounce((value: string) => {
      const results = this.getResults(value)
      this.setState({ searchQuery: value, results })
    })

    this.setState({ searchQuery: value }, () => {
      doSearch(value)
    })
  }
  getResults(searchQuery: string) {
    if (!searchQuery) return []
    const results: lunrResult[] = this.idx
      .search(searchQuery) // search the index
      .map(({ ref, ...rest }: lunr.Index.Result) => ({
        ref,
        item: this.state.documents.find((m: any) => m.endpointId === ref),
        ...rest,
      })) // attach each item
    return results
  }

  render() {
    const results = this.state.results
      .filter(result => typeof result !== undefined)
      .map(result => result.item) as restApiTemplate[]
    return (
      <>
        <div style={{ flex: 2, marginRight: '16px' }}>
          <label style={{ fontWeight: 'normal', color: '#666' }}> Search templates</label>
          <input
            id="search"
            placeholder="🔎 Search by template name or other details"
            style={{ padding: '10px', width: '100%' }}
            onChange={this.handleNewSearchValue}
            // onChange={e => this.handleNewSearchValue(e.target.value)}
            value={this.state.searchQuery}
          ></input>
        </div>
        {this.props.children ? this.props.children(results) : ''}
      </>
    )
  }
}
