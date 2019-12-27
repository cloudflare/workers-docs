import React from 'react'
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
export const SidebarItem = ({ relURL = '/', title }: SidebarItemPropTypes) => (
  <>
    <li data-nav-id={relURL} className="docs-nav-item-header">
      <a className="" href={relURL} title="Docs Home">
        {title}
      </a>
    </li>
  </>
)

export interface SidebarItemPropTypes {
  relURL: string
  title: string
  children: React.ReactNode
}
