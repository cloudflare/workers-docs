import lunr from 'lunr'
import React from 'react'
import { restApiTemplate } from '../../types/restApiTemplates'




// // Search based on a query, updating `results`
// const search = query => {
//   // Get the rendered "choices" (the types in our type select)
//   // and map their text values into `types`
//   const types = [].slice
//     .call(document.querySelectorAll('.choices__item--choice'))
//     .map(el => el.getAttribute('data-value'))

//   if (query) {
//     let searchQuery = query
//     // If the `types` array does not include the query (e.g. we are
//     // not searching by type), include an asterisk to our intended
//     // search logic (typing `graph` matches `graphql, etc)
//     if (!types.includes(query)) {
//       searchQuery += '*'
//     }

//     const opts = idx.search(searchQuery).map(result => result.ref)
//     results = corpus.filter(item => opts.includes(item.id))
//   } else {
//     results = corpus
//   }
//   if (results.length) {
//     processSearch()
//   } else {
//     processEmpty()
//   }
// }

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

// // Update the UI when there aren't any results
// const processEmpty = () => {
//   const resultsContainer = document.querySelector('#results')
//   resultsContainer.style.display = 'none'

//   const empty = document.querySelector('#empty')
//   empty.style.display = 'block'
//   // hack to fix rendering of select
//   empty.style.marginBottom = '999px'
// }



// // Event handler when the #type select changes
// const searchFilters = evt => {
//   const value = evt.detail.value
//   search(value === 'All' ? null : value)
// }
type SearchBoxProps = {
    boilerplates: restApiTemplate[]
    snippets: restApiTemplate[]
}
type SearchBoxState = {
    searchQuery: string
    results: any[]
    idx: any
    documents: any
}
export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor({ boilerplates, snippets, ...other }: SearchBoxProps) {
        super({ boilerplates, snippets, ...other })
        // const { boilerplates, snippets } = props
        // Process templates JSON into lunr-supported JS objects
        const constructCorpus = () => {
            const toLunr = (item: any, type: any) => ({ type, ...item })
            return [
                ...Object.values(boilerplates).map(item => toLunr(item, 'boilerplates')),
                // ...Object.values(featured_boilerplates).map(item => toLunr(item, 'featured_boilerplates')),
                ...Object.values(snippets).map(item => toLunr(item, 'snippets')),
            ]
        }
        let results, corpus: any
        corpus = constructCorpus()
        results = corpus
        const idx = lunr(function () {
            this.ref('endpointId')
            this.field('title')
            this.field('description')
            this.field('type')
            this.field('tags')

            corpus.forEach((doc: any) => {
                console.log('doc', doc)
                this.add(doc)
            }, this)
        })
        console.log(corpus)
        window.idx = idx
        // moonwalkers.forEach(walker => this.add(walker))
        this.state = { searchQuery: '', idx, results: [], documents: corpus }
    }


    handleNewSearchValue = (value: any) => {
        // const handleNewSearchValue = _.throttle(value => {
        console.log("vallue", value)

        if (value.length && value.length < 3) {
            return
        }
        const results = this.getResults(this.state.searchQuery)

        this.setState({ searchQuery: value.target.value, results })
    }
    //     search(value)
    // }, 500)
    getResults(searchQuery: string) {
        if (!searchQuery) return []
        const results = this.state.idx
            .search(searchQuery) // search the index
            .map(({ ref, ...rest }: any) => ({
                ref,
                item: this.state.documents.find((m: any) => m.endpointId === ref),
                ...rest
            })) // attach each item
        return results
        // this.setState({ results, searchQuery })
    }

    render() {
        console.log('resultss', this.state.results)
        return (
            <div style={{ display: "flex" }} >
                Blah
                <div style={{ flex: 2, marginRight: "16px" }}>
                    <label style={{ fontWeight: "normal", color: "#666" }}> Search templates</label >
                    <input id="search" placeholder="🔎 Search by template name or other details"
                        style={{ padding: "10px", width: "100%" }}
                        onChange={this.handleNewSearchValue}
                        value={this.state.searchQuery}>
                    </input>
                </div >
                {this.state.results.map(template => (<span>{template.item.title}</span>))}
            </div >
        )

    }
}
const EmptyResults = () => {
    return (//   resultsContainer.style.display = 'none'

        <div id='#results' style={{ display: 'none' }}>
            <div id='#empty' style={{
                display: 'block',
                // hack to fix rendering of select
                marginBottom: '999px',
                marginTop: '20px'
            }}>
                <p>No results were found for your search. Try adjusting your search.</p>
            </div>
        </div>

    )
}
