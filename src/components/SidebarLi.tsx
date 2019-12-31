import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import { data } from '../hooks2/mockMarkdownRemark'
import { GraphQLEdge, GraphQLData, GraphQLNode, FrontMattter, Fields } from '../types/page'
// import { useMarkdownNodes } from '../hooks/useMarkdownNodes'
// import { useSiteMetadata } from '../hooks/useSiteMeta'

const defaultVals = {
  isAncestor: false,
  showNew: false,
  alwaysopen: true,
}
export const SidebarLi: React.FunctionComponent<SidebarLiProps & SidebarItem> = ({
  frontmatter,
  fields,
  // myChildren,
}) => {
  const { relURL } = fields
  const { title, alwaysopen, showNew }: FrontMattter = frontmatter
  // const data: GraphQLData = data
  const topLevelMarkdown = data.data.allMarkdownRemark.edges
  // console.log('myChildren', myChildren)
  // myChildren =
  //   myChildren ||
  //   topLevelMarkdown
  //     .filter((el: GraphQLEdge) => el.node.fields.parent == relURL)
  //     .map((el: GraphQLEdge): GraphQLNode => el.node)
  const myChildren: GraphQLNode[] = topLevelMarkdown
    .filter(
      (child: GraphQLEdge) =>
        // .filter((child: GraphQLData['data']['allMarkdownRemark']['edges']) =>
        // child.node.fields.parent.match(fields.relURL),
        child.node.fields.parent.match(fields.relURL) && child.node.fields.relURL !== fields.relURL,
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
        if (location.pathname === relURL) {
          ddClass += ' active'
        }
        return (
          <li data-nav-id={relURL} className={'dd-item ' + ddClass}>
            <Link className="" to={relURL} title="Docs Home" activeClassName="active">
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
            {numberOfPages > 1 ? (
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
  // relURL: string
  // title: string
  frontmatter: FrontMattter
  fields: Fields
  // myChildren: GraphQLNode[] //SidebarItem[]
  // parent: string | null
  // alwaysopen: boolean | null
  // hidden: boolean | null
}
export type SidebarItem = {
  // export type SidebarItem = FrontMattter &
  //   Fields & {
  //derived data specific to how we'll form HTML
  // showNew?: boolean
  // isAncestor?: boolean
  // ddClass?: string
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
