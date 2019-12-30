import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

export const TopSidebarItem = ({
  relURL = '/',
  title,
  isAncestor = true,
  alwaysOpen = true,
  ddClass = '',
  parent = '/about',
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

  if (isAncestor) {
    ddClass += ' parent'
  }
  if (alwaysOpen) {
    ddClass += ' parent alwaysOpen'
  }
  return (
    <Location>
      {({ location }) => {
        if (location.pathname === relURL) {
          ddClass += ' active'
        }
        return (
          <li data-nav-id={relURL} className={'dd-item ' + ddClass}>
            <Link className="" to={relURL} title="Docs Home" activeClassName="active">
              {title}
              {isAncestor && alwaysOpen ? (
                <i className="triangle-up"></i>
              ) : (
                <i className="triangle-down"></i>
              )}
            </Link>
            <ul>
              {myChildren.allMarkdownRemark.edges

                .filter((element: any) => {
                  return element.node.fields.parent === parent
                })
                .map((element: any) => (
                  <li>
                    <Link to={element.node.fields.slug}>{element.node.frontmatter.title}</Link>
                  </li>
                ))}
            </ul>
          </li>
        )
      }}
    </Location>
  )
}

export interface TopSidebarItemPropTypes {
  relURL: string
  title: string
  children: React.ReactNode
  isAncestor?: boolean
  alwaysOpen?: boolean
  ddClass?: string
  parent?: string
}
