import { graphql } from 'gatsby'
import React from 'react'
import { SidebarLi } from './SidebarLi'
import { data } from '../hooks2/mockMarkdownRemark'

import { GraphQLData, GraphQLEdge, GraphQLNode } from '../types/page'
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

// const Sidebar = ({ pathToServe = '/' }: SidebarPropTypes) => {
const Sidebar = ({ pathToServe = '/' }) => {
  // get top level (i.e. relURLs with /workers followed by no more than
  // one forward slash) markdownRemark nodes
  const topLevelMarkdown: GraphQLEdge[] = data.data.allMarkdownRemark.edges

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
              .filter((el: GraphQLEdge) => el.node.fields.pathToServe.match(/^\/workers\/[^/]+$/))
              .map((element: GraphQLEdge) => {
                const { fields, frontmatter } = element.node
                return (
                  // Todo filter out hidden pages
                  <SidebarLi frontmatter={frontmatter} fields={fields} />
                )
              })}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
