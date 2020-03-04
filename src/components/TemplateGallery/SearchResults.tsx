import React from 'react'
import { restApiTemplate } from '../../types/restApiTemplates'
import { Snippet } from './Snippet'
import { Boilerplate } from './Boilerplate'

export const SearchResults: React.FunctionComponent<GalleryProps> = ({ results }) => {
  const snippets = results.filter(template => template.type === 'snippet')
  const boilerplates = results.map(edge => edge).filter(template => template.type === 'boilerplate')
  const featured_boilerplates = results
    .map(edge => edge)
    .filter(template => template.type === 'featured_boilerplate')

  return (
    <div className="gallery" id="results">
      {boilerplates.length ? (
        <div>
          <h2>Boilerplates</h2>
          <section className="template-wrapper boilerplate">
            {boilerplates.length
              ? boilerplates.map(template => (
                  <Boilerplate {...template} key={template.endpointId}></Boilerplate>
                ))
              : null}
          </section>
        </div>
      ) : null}
      {featured_boilerplates.length ? (
        <div>
          <h2>Snippets</h2>
          <section className="template-wrapper snippet"></section>
          <h2>Boilerplates</h2>
          <section className="template-wrapper snippet">
            {snippets.length
              ? snippets.map(template => (
                  <Snippet {...template} key={template.endpointId}></Snippet>
                ))
              : null}
          </section>
        </div>
      ) : null}
      {featured_boilerplates.length ? (
        <div>
          <h2>Featured Boilerplates</h2>
          <section className="template-wrapper boilerplate">
            {featured_boilerplates.map(template => (
              <Boilerplate {...template} key={template.endpointId}></Boilerplate>
            ))}
          </section>
        </div>
      ) : null}
    </div>
  )
}

export type GalleryProps = {
  // snippets: restApiTemplate[]
  // boilerplates: restApiTemplate[]
  // featured_boilerplates?: restApiTemplate[]
  results: restApiTemplate[]
}

export const EmptyResults = () => {
  return (
    //   resultsContainer.style.display = 'none'

    <div id="#results">
      <div
        id="#empty"
        style={{
          display: 'block',
          // hack to fix rendering of select
          marginBottom: '999px',
          marginTop: '20px',
        }}
      >
        <p>No results were found for your search. Try adjusting your search.</p>
      </div>
    </div>
  )
}
