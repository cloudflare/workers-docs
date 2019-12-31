import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import { data } from '../hooks/mockMarkdownRemark'
import { GraphQLEdge, GraphQLData, GraphQLNode, FrontMattter, Fields } from '../types/page'
// import { useMarkdownNodes } from '../hooks/useMarkdownNodes'
// import { useSiteMetadata } from '../hooks/useSiteMeta'
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
  // myChildren,
}) => {
  const { pathToServe } = fields
  const { title, alwaysopen, showNew }: FrontMattter = frontmatter
  // const
  // const data: GraphQLData = data
  const topLevelMarkdown = data.data.allMarkdownRemark.edges
  // console.log('myChildren', myChildren)
  // myChildren =
  //   myChildren ||
  //   topLevelMarkdown
  //     .filter((el: GraphQLEdge) => el.node.fields.parent == pathToServe)
  //     .map((el: GraphQLEdge): GraphQLNode => el.node)
  const myChildren: GraphQLNode[] = topLevelMarkdown
    .filter(
      (child: GraphQLEdge) =>
        // .filter((child: GraphQLData['data']['allMarkdownRemark']['edges']) =>
        // child.node.fields.parent.match(fields.pathToServe),
        child.node.fields.parent === fields.pathToServe &&
        child.node.fields.pathToServe !== fields.pathToServe,
      // child.node.fields.parent.match(fields.pathToServe) && child.node.fields.pathToServe !== fields.pathToServe,
    )
    .map((el: GraphQLEdge): GraphQLNode => el.node)
  const numberOfPages = myChildren.length
  console.log('numberOfPages', numberOfPages)

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
        if (location.pathname === pathToServe) {
          ddClass += ' active'
        }
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
            {numberOfPages > 0 && depth < maxDepth ? (
              <ul>
                {' '}
                {myChildren
                  .filter(child => !child.frontmatter.hidden)
                  .filter(
                    child => !!child.frontmatter.alwaysopen || child.frontmatter.alwaysopen == null,
                  )
                  // .sort((a, b) => (a.frontmatter.weight > b.frontmatter.weight ? 1 : 0))
                  .map((child: GraphQLNode) => {
                    return (
                      // <>
                      //   <div>Child: {child.frontmatter.title}</div>
                      //   <div>
                      //     Grand
                      //     {grandKids.map((grandKids: GraphQLNode) => grandKids.frontmatter.title)}
                      //   </div>
                      // </>

                      <SidebarLi
                        // myChildren={grandKids}
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
