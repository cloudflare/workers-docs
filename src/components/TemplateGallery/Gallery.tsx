import React from 'react'
import { allRestApiTemplates } from '../../types/restApiTemplates'
import { useStaticQuery, graphql } from 'gatsby'
import { Snippet } from './Snippet'
import { Boilerplate } from './Boilerplate'
import { SearchBox } from './SearchBox'
import { SearchResults } from './SearchResults'

export const Gallery: React.FunctionComponent<GalleryProps> = ({}) => {
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
    `
  )
  const snippets = templates.allRestApiTemplates.edges
    .map(edge => edge.node)
    .filter(template => template.type === 'snippet')
  const boilerplates = templates.allRestApiTemplates.edges
    .map(edge => edge.node)
    .filter(template => template.type === 'boilerplate')
  const featured_boilerplates = templates.allRestApiTemplates.edges
    .map(edge => edge.node)
    .filter(template => template.type === 'featured_boilerplate')
  const allTemplates = templates.allRestApiTemplates.edges.map(edge => edge.node)
  return (
    <>
      <h1>Template Gallery</h1>
      <p>These templates are simple building blocks for developing Workers scripts.</p>
      <SearchBox snippets={snippets} boilerplates={boilerplates}>
        {results => <SearchResults results={results} />}
      </SearchBox>
    </>
  )
}

export type GalleryProps = {}
