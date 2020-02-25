import React, { FunctionComponent, useEffect } from 'react'

const DocSearch: FunctionComponent<{ initial?: boolean }> = ({ initial = true }) => {
  // const [searchLoadedState, setSearchState] = useState(initial)
  useEffect(() => {
    console.log('as')
    // @ts-ignore
    if (window.docsearch) {
      console.log('docsearch did load')
      // @ts-ignore
      window.docsearch({
        apiKey: '4c1a7e1b6289032a8e8fd1dbbae112a3',
        indexName: 'cloudflare',
        inputSelector: '#docsearch-input',
      })
    } else {
      console.log('Something wrong with search loading')
      // setSearchState(false);
    }
  }, [])

  return (
    <input
      className="search-input"
      type="text"
      id="docsearch-input"
      placeholder="Search the docs..."
    />
  )
}

export default DocSearch
