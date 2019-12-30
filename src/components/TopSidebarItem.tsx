import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SidebarLi } from './SidebarLi'

export const TopSidebarItem = ({
  relURL = '/',
  title,
  parent = '/workers',
}: TopSidebarItemPropTypes) => {
  let myChildren = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                title
                alwaysopen
              }
              fileAbsolutePath
              fields {
                slug
                parent
              }
            }
          }
        }
      }
    `,
  )

  return (
    <SidebarLi relURL={relURL} title={title} isAncestor={true}>
      <ul>
        {' '}
        {myChildren.allMarkdownRemark.edges
          .filter((element: any) => {
            return element.node.fields.parent === parent
          })
          .map((element: any) => (
            <SidebarLi
              relURL={element.node.fields.slug}
              title={element.node.frontmatter.title}
              isAncestor={false}
            />
          ))}
      </ul>
    </SidebarLi>
  )
}

export interface TopSidebarItemPropTypes {
  relURL: string
  title: string
  alwaysOpen?: boolean
  parent?: string
}
