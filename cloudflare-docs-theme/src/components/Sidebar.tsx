import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { SidebarLi } from './SidebarItem'
import { sortByWeight } from './utils'
import { mdx } from '../types/mdx'
import DocSearch from './DocSearch'
import { useSitePluginOpts } from '../hooks/useSitePluginOpts'
// import { useMarkdownNodes } from '../hooks/useMarkdownRemark'

const Sidebar = ({ pathToServe = '/' }) => {
  const { publicPath } = useSitePluginOpts()
  // Paths to not include in the sidebar
  const EXCLUDED_PATHS = [/\/workers\/$/, new RegExp('\\/' + publicPath + '\\/$')]

  const clickHandler = () => {
    if (document.body.classList.contains('with-sidebar-open')) {
      document.body.classList.remove('with-sidebar-open')
    } else {
      document.body.classList.add('with-sidebar-open')
    }
  }
  // TODO get hooks working instead of useStaticQuery in components
  const topLevelMarkdown: any[] = useStaticQuery(
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

  return (
    <>
      <a id="sidebar-toggle" onClick={clickHandler}>
        <span>
          <b></b>
          <b></b>
          <b></b>
        </span>
      </a>
      <div id="sidebar-open-backdrop"></div>
      <nav id="sidebar">
        <div className="search-container">
          <DocSearch />
        </div>
        <div className="highlightable">
          <ul className="topics">
            {/* TODO V thinks we don't even use this li header for anything but padding */}
            <li data-nav-id={pathToServe} className="docs-nav-item-header">
              <a className="" href={pathToServe} title="Docs Home">
                Overview
              </a>
            </li>
            {topLevelMarkdown
              // get top level (i.e. relURLs with /workers followed by no more than
              // one forward slash) mdx nodes
              .filter((edge) => edge.node.fields.parent === '/')
              .filter((edge) => !edge.node.frontmatter.hidden)
              .filter((edge) => {
                //exclude the path if it has a match in EXCLUDED_PATHS
                const matchedPaths = EXCLUDED_PATHS.filter((excludePath) =>
                  excludePath.test(edge.node.fields.pathToServe)
                )
                return matchedPaths.length < 1
              })
              .map((edge) => edge.node)
              .sort(sortByWeight)
              .map((node: mdx) => {
                const { fields, frontmatter } = node
                return (
                  // Todo filter out hidden pages
                  <SidebarLi
                    depth={1}
                    frontmatter={frontmatter}
                    fields={fields}
                    key={frontmatter.title}
                  />
                )
              })}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
