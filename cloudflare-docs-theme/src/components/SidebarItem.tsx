import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import { markdownRemarkEdge, mdx, FrontMattter, Fields } from '../types/mdx'
import { sortByWeight } from './utils'
import { useSitePluginOpts } from '../hooks/useSitePluginOpts'
// import { useMarkdownNodes } from '../hooks/useMarkdownNodes'
const maxDepth = 10

export const SidebarLi: React.FunctionComponent<SidebarLiProps> = ({
  frontmatter,
  fields,
  depth,
}) => {
  const { pathToServe } = fields
  const { publicPath } = useSitePluginOpts()
  const { title, alwaysopen, showNew }: FrontMattter = frontmatter
  const topLevelMarkdown: markdownRemarkEdge[] = useStaticQuery(
    graphql`
      {
        allMdx(limit: 1000) {
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
    `
  ).allMdx.edges
  const myChildren: mdx[] = topLevelMarkdown
    .filter(
      (edge) =>
        fields.pathToServe === '/' + publicPath + edge.node.fields.parent &&
        fields.pathToServe !== edge.node.fields.pathToServe
    )
    .map((child) => child.node)
    .filter((child) => !child.frontmatter.hidden)
    .sort(sortByWeight)
  const numberOfPages = myChildren.length

  let ddClass = ''
  // TODO double check this assumed def of Ancestor
  let isAncestor = numberOfPages > 0
  if (isAncestor) {
    ddClass += ' parent'
  }
  if (frontmatter.alwaysopen) {
    ddClass += ' parent alwaysOpen'
  }
  return (
    <Location>
      {({ location }) => {
        const currentPathActive = location.pathname === pathToServe
        if (currentPathActive) {
          ddClass += ' active'
        }
        let currentPathActiveChildren = currentPathActive || location.pathname.includes(pathToServe)
        const showChildren =
          numberOfPages > 0 && depth < maxDepth && (!!alwaysopen || currentPathActiveChildren)
        return (
          <li data-nav-id={pathToServe} className={'dd-item ' + ddClass}>
            <Link className="" to={pathToServe} title="Docs Home" activeClassName="active">
              {title || 'No title'}
              {numberOfPages ? <Triangle isAncestor={isAncestor} alwaysopen={showChildren} /> : ''}
              {showNew ? <span className="new-badge">NEW</span> : ''}
            </Link>
            {showChildren ? (
              <ul>
                {' '}
                {myChildren.map((child: mdx) => {
                  return (
                    <SidebarLi
                      frontmatter={child.frontmatter}
                      fields={child.fields}
                      depth={++depth}
                      key={child.frontmatter.title}
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
type TriangleProps = {
  isAncestor: boolean
  alwaysopen: boolean
}
const Triangle = ({ isAncestor, alwaysopen }: TriangleProps) => {
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
