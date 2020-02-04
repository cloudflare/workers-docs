import React from 'react'
import { allRestApiTemplates } from '../types/restApiTemplates'
import { useStaticQuery, graphql } from 'gatsby'
import { Snippet } from './Snippet'
import Layout from './Layout'
import Body from './Body'
import { Boilerplate } from './Boilerplate'
const SearchBox = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2, marginRight: "16px" }}>
        <label style={{ fontWeight: "normal", color: "#666" }}> Search templates</label >
        <input id="search" placeholder="🔎 Search by template name or other details" style={{ padding: "10px", width: "100%" }}></input>
      </div >
      <div style={{ flex: 1, marginRight: "16px" }}>
        <label style={{ fontWeight: "normal", color: "#666" }}> Type</label >
        <select id="type" style={{ width: "100%" }}>
          <option>All</option>
          <option>Boilerplates</option>
          <option>Snippets</option>
          <option value="featured_boilerplates">Featured</option>
        </select>
      </div >
    </div >)
}
export const Gallery: React.FunctionComponent<GalleryProps> = ({

}) => {
  // TODO get hooks working instead of useStaticQuery in components
  const templates: allRestApiTemplates['data'] = useStaticQuery(
    graphql`
    query {
      allRestApiTemplates {
        edges {
          node {
            tags
            share_url
            repository_url
            endpointId
            description
            demos {
              bar {
                text
                url
              }
              foo {
                text
                url
              }
              main {
                share_url
                tags
                text
                url
              }
            }
            code
            title
            type
            url
            weight
          }
        }
      }
    }

    `,
  )
  const snippets = templates.allRestApiTemplates.edges.map(edge => edge.node).filter(template => template.type === "snippet")
  const boilerplates = templates.allRestApiTemplates.edges.map(edge => edge.node).filter(template => template.type === "boilerplate")
  return (
    <Layout title="Template Gallery">
      <Body>
        <h1>Template Gallery</h1>
        <p>These templates are simple building blocks for developing Workers scripts.</p>
        <SearchBox />
        <div className="gallery" id="results">
          <h2>Boilerplates</h2>
          {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
          <section className="template-wrapper boilerplate">
            {boilerplates.length ? boilerplates.map(template => (
              <Boilerplate {...template}></Boilerplate>
            )) : null}
          </section>
          <h2>Snippets</h2>
          {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
          <section className="template-wrapper snippet">
            {snippets.length ? snippets.map(template => (
              <Snippet {...template}></Snippet>
            )) : null}
          </section>
          {/* TODO add in the raw JS that adds templates to global */}
        </div>
      </Body>
    </Layout>
  )
}

export type GalleryProps = {

}
