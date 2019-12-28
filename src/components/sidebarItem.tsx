import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export const SidebarItem = ({
  relURL = '/',
  title,
  isAncestor = true,
  alwaysOpen = true,
  ddClass = '',
}: SidebarItemPropTypes) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      sitePage {
        path
      }
    }
  `)
  if (isAncestor) {
    ddClass += ' parent'
  }
  if (relURL === '') {
    ddClass += ' active'
    ddClass += data.sitePage.path
    // TODO set active and parent accurtely
    // {{ if eq .UniqueID $currentNode.UniqueID}}active{{ end }}
    // {{ if .Params.alwaysopen}}parent{{ end }}
    // {{ if .Params.alwaysopen}}always-open{{ end }}
  }
  return (
    <>
      <li data-nav-id={relURL} className={'dd-item ' + ddClass}>
        <a className="" href={relURL} title="Docs Home">
          {title}

          {isAncestor && alwaysOpen ? (
            <i className="triangle-up"></i>
          ) : (
            <i className="triangle-down"></i>
          )}
        </a>
      </li>
    </>
  )
}

export interface SidebarItemPropTypes {
  relURL: string
  title: string
  children: React.ReactNode
  isAncestor?: boolean
  alwaysOpen?: boolean
  ddClass?: string
}
