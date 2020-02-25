import React from 'react'

export const ArchiveNotice: React.FC<any> = () => {
  const aStyle = {
    fontWeight: 200,
    color: 'currentColor',
    textDecoration: 'underline',
  }
  const divStyle = {
    margin: 0,
    maxWidth: 'inherit',
  }
  return (
    <div style={divStyle} className={'notices info'}>
      This version of the Cloudflare Workers documentation is deprecated. Visit{' '}
      <a href="https://developers.cloudflare.com/workers" style={aStyle}>
        the new documentation
      </a>
    </div>
  )
}
