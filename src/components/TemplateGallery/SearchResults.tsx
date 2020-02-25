import React from 'react'
import { allRestApiTemplates, restApiTemplate } from '../../types/restApiTemplates'
import { useStaticQuery, graphql } from 'gatsby'
import { Snippet } from './Snippet'
import { Boilerplate } from './Boilerplate'
import { SearchBox } from './SearchBox'

export const SearchResults: React.FunctionComponent<GalleryProps> = ({
    results
}) => {
    const snippets = results.map(edge => edge).filter(template => template.type === "snippet")
    const boilerplates = results.map(edge => edge).filter(template => template.type === "boilerplate")
    const featured_boilerplates = results.map(edge => edge).filter(template => template.type === "featured_boilerplate")

    return (
        <div className="gallery" id="results">
            <h2>Boilerplates</h2>
            {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
            <section className="template-wrapper boilerplate">
                {boilerplates.length ? boilerplates.map(template => (
                    <Boilerplate {...template} key={template.endpointId}></Boilerplate>
                )) : null}
            </section>
            <h2>Snippets</h2>
            {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
            <section className="template-wrapper snippet">
                {snippets.length ? snippets.map(template => (
                    <Snippet {...template} key={template.endpointId}></Snippet>
                )) : null}
            </section>
            {/* TODO add in the raw JS that adds templates to global */}
        </div>
    )
}

export type GalleryProps = {
    // snippets: restApiTemplate[]
    // boilerplates: restApiTemplate[]
    // featured_boilerplates?: restApiTemplate[]
    results: restApiTemplate[]
}
