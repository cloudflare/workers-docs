import React, { FunctionComponent, useEffect } from 'react'

const DocSearch: FunctionComponent<{ initial?: boolean }> = ({
  initial = true,
}) => {
  // const [searchLoadedState, setSearchState] = useState(initial)
  useEffect(() => {
    // @ts-ignore
    if (window.docsearch) {
      // @ts-ignore
      window.docsearch({
        apiKey: '4a3bbdb939606486b94f9ce867bfd4f5',
        indexName: 'workers-cloudflare',
        inputSelector: '#docsearch-input',
      })
    } else {
      console.log('Something wrong with search loading')
      // setSearchState(false);
    }
  }, [])

  return (
    <>
    <input
      className="search-input"
      type="text"
      id="docsearch-input"
      placeholder="Search the docs..."
    />
    <label htmlFor="docsearch-input"></label>
    </>
  )
}

export default DocSearch
