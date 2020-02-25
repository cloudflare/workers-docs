import React from 'react'
import { allRestApiTemplates } from '../../types/restApiTemplates'
import { useStaticQuery, graphql } from 'gatsby'
import { SearchBox } from './SearchBox'
import { SearchResults, EmptyResults } from './SearchResults'

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
  const allTemplates = templates.allRestApiTemplates.edges.map(edge => edge.node)
  return (
    <>
      <h1>Template Gallery</h1>
      <p>These templates are simple building blocks for developing Workers scripts.</p>
      <SearchBox templates={allTemplates}>
        {results => (results.length ? <SearchResults results={results} /> : <EmptyResults />)}
      </SearchBox>
    </>
  )
}

export type GalleryProps = {}
