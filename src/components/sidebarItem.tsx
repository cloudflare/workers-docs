import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

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
  if (alwaysOpen) {
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

              {isAncestor && alwaysOpen ? (
                <i className="triangle-up"></i>
              ) : (
                <i className="triangle-down"></i>
              )}
            </Link>
          </li>
        )
      }}
    </Location>
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
