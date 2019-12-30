import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

export const SidebarLi: React.FunctionComponent<SidebarLiProps> = ({
  relURL = '/',
  title,
  children,
  isAncestor = false,
  isNew = false,
  alwaysOpen = true,
  ddClass = '',
}) => {
  if (isAncestor) {
    ddClass += ' parent'
  }
  if (alwaysOpen) {
    ddClass += ' parent alwaysOpen'
  }
  const numberOfPages = React.Children.count(children)
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
              {numberOfPages ? <Triangle isAncestor={isAncestor} alwaysOpen={alwaysOpen} /> : ''}
              {isNew ? <span className="new-badge">NEW</span> : ''}
            </Link>
            {children}
          </li>
        )
      }}
    </Location>
  )
}

export interface SidebarLiProps {
  relURL: string
  title: string
  isNew?: boolean
  isAncestor?: boolean
  alwaysOpen?: boolean
  ddClass?: string
  parent?: string
}
const Triangle = ({ isAncestor = false, alwaysOpen = true }) => {
  return (
    <>
      {' '}
      {isAncestor && alwaysOpen ? (
        <i className="triangle-up"></i>
      ) : (
        <i className="triangle-down"></i>
      )}
    </>
  )
}
