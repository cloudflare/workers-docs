import lunr from 'lunr'
import React, { ReactElement } from 'react'
import { restApiTemplate } from '../../types/restApiTemplates'
import debounce from 'lodash.debounce'

type SearchBoxProps = {
  templates: restApiTemplate[]
  children: (input: restApiTemplate[]) => ReactElement
}
type SearchBoxState = {
  searchQuery: string
  results: lunrResult[]
  documents: restApiTemplate[]
}
type lunrResult = lunr.Index.Result & {
  item: restApiTemplate | undefined
}
export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  public idx: lunr.Index
  public unFilteredResults: lunrResult[]

  constructor(props: SearchBoxProps) {
    super(props)
    const { templates } = props
    // Process templates JSON into lunr-supported JS objects
    const constructCorpus = () => {
      return [...Object.values(templates)]
    }
    let corpus: restApiTemplate[]
    corpus = constructCorpus()
    this.idx = lunr(function () {
      this.ref('endpointId')
      this.field('title')
      this.field('description')
      this.field('type')
      this.field('tags')
      corpus.forEach((doc: any) => {
        this.add(doc)
      }, this)
    })
    this.unFilteredResults = this.idx.search('*').map(({ ref, ...rest }: lunr.Index.Result) => ({
      ref,
      item: corpus.find((m: any) => m.endpointId === ref),
      ...rest,
    }))

    this.state = { searchQuery: '', results: this.unFilteredResults, documents: corpus }
  }

  componentDidMount() {
    // @ts-ignore
    window.idx = this.idx
  }

  doSearch = debounce((value: string) => {
    this.setState({ results: this.getResults(value) })
  }, 150)

  handleNewSearchValue = (event: any) => {
    const value = event.target.value

    this.setState({ searchQuery: value })
    this.doSearch(value)
  }
  getResults(searchQuery: string) {
    if (!searchQuery) return this.unFilteredResults
    //~2 controls the fuzziness of the search
    return this.idx.search(searchQuery + '~2').map(({ ref, ...rest }: lunr.Index.Result) => {
      return {
        ref,
        item: this.state.documents.find((m: any) => m.endpointId === ref),
        ...rest,
      }
    }) // attach each item
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
            value={this.state.searchQuery}
          ></input>
        </div>
        {this.props.children ? this.props.children(results) : ''}
      </>
    )
  }
}
