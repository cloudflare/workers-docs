import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { SidebarLi } from './SidebarItem'
import { sortByWeight } from './utils'
import { markdownRemarkEdge } from '../types/markdownRemark'
// import { useMarkdownNodes } from '../hooks/useMarkdownRemark'
const script = `    document.querySelector('#sidebar-toggle').addEventListener('click', function(){
  if (document.body.classList.contains('with-sidebar-open')) {
    document.body.classList.remove('with-sidebar-open');
  } else {
    document.body.classList.add('with-sidebar-open');
  }
})
docsearch({
  apiKey: '4c1a7e1b6289032a8e8fd1dbbae112a3',
  indexName: 'cloudflare',
  inputSelector: '#docsearch-input'
});
`

const Sidebar = ({ pathToServe = '/' }) => {
  // TODO get hooks working instead of useStaticQuery in components
  const topLevelMarkdown: markdownRemarkEdge[] = useStaticQuery(
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

  return (
    <>
      <a id="sidebar-toggle">
        <span>
          <b></b>
          <b></b>
          <b></b>
        </span>
      </a>
      <script>{script}</script>
      <div id="sidebar-open-backdrop"></div>
      <nav id="sidebar">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            id="docsearch-input"
            placeholder="Search the docs..."
          />
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
              // one forward slash) markdownRemark nodes
              .filter(edge => edge.node.fields.parent === '/')
              // .filter(edge => edge.node.fields.pathToServe.match(/^\/[^/]+$/))
              .map(edge => edge.node)
              .sort(sortByWeight)
              .map(node => {
                const { fields, frontmatter } = node
                return (
                  // Todo filter out hidden pages
                  <SidebarLi depth={1} frontmatter={frontmatter} fields={fields} />
                )
              })}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
