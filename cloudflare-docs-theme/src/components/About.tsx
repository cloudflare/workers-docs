import React from 'react'
import { useSitePluginOpts } from '../hooks/useSitePluginOpts'
import '../content/static/css/theme.css'
import '../content/static/css/main.css'
export const About: React.FC<AboutProps> = ({ header, about, title, getStartedPath }) => {
  const { publicPath } = useSitePluginOpts()
  return (
    <>
      <div className="stripe">
        <div className="content">
          <div className="hero">
            <svg className="hero-header-icon" viewBox="0 0 129 77">
              <path
                d="M26.0076 54.7528H38.327v8.2129a1.3687 1.3687 0 001.3688 1.3689h49.2775a1.3688 1.3688 0 001.3689-1.3689V13.6882a1.369 1.369 0 00-1.3689-1.3688H39.6958a1.3689 1.3689 0 00-1.3688 1.3688v8.2129H26.0076V6.8441A6.8442 6.8442 0 0132.8517 0h62.9657a6.8444 6.8444 0 016.8446 6.8441V30.114h20.532l5.475 5.4753h-26.007v34.2205a6.8444 6.8444 0 01-6.8446 6.8441H32.8517a6.844 6.844 0 01-6.8441-6.8441v-15.057zM15.057 46.5399l-5.4753-5.4753H68.441l5.4753 5.4753H15.057zM5.4753 35.5893L0 30.114h58.8593l5.4753 5.4753H5.4753z"
                fill="#000"
              />
            </svg>
            <h5>{title}</h5>
            <h1 style={{ maxWidth: '22em' }}>{header}</h1>
            <p style={{ width: '35em' }}>{about}</p>
            <div className="actions">
              <a
                href={getStartedPath || '/' + publicPath + '/'}
                className="button orange large more"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

type AboutProps = {
  header: string
  about: string
  title: string
  getStartedPath?: string
}
