import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { SidebarItemPropTypes, SidebarItem } from './sidebarItem'
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

const Sidebar = ({ isAncestor = false, relURL = '/' }: SidebarPropTypes) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              date
              title
            }
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `)
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
            <li data-nav-id={relURL} className="docs-nav-item-header">
              <a className="" href={relURL} title="Docs Home">
                Overview
              </a>
            </li>
            {data.allMarkdownRemark.edges.map((element: any) => (
              // Todo filter out hidden pages
              <SidebarItem
                relURL={element.node.fields.slug}
                title={element.node.frontmatter.title}
                children={element}
              />
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

interface SidebarPropTypes {
  isAncestor: boolean
  relURL?: string
}

export default Sidebar
