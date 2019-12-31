import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import { GraphQLEdge, GraphQLNode, FrontMattter, Fields } from '../types/page'
import { sortByWeight } from './utils'
// import { useMarkdownNodes } from '../hooks/useMarkdownNodes'
const maxDepth = 10
const defaultVals = {
  isAncestor: false,
  showNew: false,
  alwaysopen: true,
}

export const SidebarLi: React.FunctionComponent<SidebarLiProps> = ({
  frontmatter,
  fields,
  depth,
}) => {
  const { pathToServe } = fields
  const { title, alwaysopen, showNew }: FrontMattter = frontmatter
  const topLevelMarkdown: GraphQLEdge[] = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                title
                alwaysopen
                hidden
                showNew
                weight
              }
              fileAbsolutePath
              fields {
                pathToServe
                parent
                filePath
              }
            }
          }
        }
      }
    `,
  ).allMarkdownRemark.edges
  const myChildren: GraphQLNode[] = topLevelMarkdown
    .filter(
      edge =>
        edge.node.fields.parent === fields.pathToServe &&
        edge.node.fields.pathToServe !== fields.pathToServe,
    )
    .map(child => child.node)
    .filter(child => !child.frontmatter.hidden)
    .sort(sortByWeight)
  const numberOfPages = myChildren.length

  let ddClass = ''
  // TODO double check this assumed def of Ancestor
  const isAncestor = numberOfPages > 0

  if (isAncestor) {
    ddClass += ' parent'
  }
  if (frontmatter.alwaysopen) {
    ddClass += ' parent alwaysOpen'
  }
  return (
    <Location>
      {({ location }) => {
        // console.log('location.pathname', location.pathname)
        // console.log('pathToServe', pathToServe)
        const currentPathActive = location.pathname.includes(pathToServe)
        if (currentPathActive) {
          ddClass += ' active'
        }
        const showChildren =
          numberOfPages > 0 && depth < maxDepth && (!!alwaysopen || currentPathActive)
        return (
          <li data-nav-id={pathToServe} className={'dd-item ' + ddClass}>
            <Link className="" to={pathToServe} title="Docs Home" activeClassName="active">
              {title}
              {numberOfPages ? (
                <Triangle
                  isAncestor={isAncestor}
                  alwaysopen={alwaysopen || defaultVals.alwaysopen}
                />
              ) : (
                ''
              )}
              {showNew ? <span className="new-badge">NEW</span> : ''}
            </Link>
            {showChildren ? (
              <ul>
                {' '}
                {myChildren.map((child: GraphQLNode) => {
                  return (
                    <SidebarLi
                      frontmatter={child.frontmatter}
                      fields={child.fields}
                      depth={++depth}
                    />
                  )
                })}
              </ul>
            ) : (
              ''
            )}
          </li>
        )
      }}
    </Location>
  )
}

export type SidebarLiProps = {
  frontmatter: FrontMattter
  fields: Fields
  depth: number
}

const Triangle = ({ isAncestor = false, alwaysopen = true }) => {
  return (
    <>
      {''}
      {isAncestor && alwaysopen ? (
        <i className="triangle-up"></i>
      ) : (
        <i className="triangle-down"></i>
      )}
    </>
  )
}
