import React, { useEffect, useState, ClipboardEvent, useRef } from 'react'
import { Link, Src } from '../Link'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Helmet } from 'react-helmet'

import { restApiTemplate } from '../../types/restApiTemplates'
import marked from 'marked'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
type templateProps = {
  id: string
  data: restApiTemplate
}
async function grabGithubData(url: string | null) {
  if (!url) {
    throw 'no url'
  }
  const resp = await fetch(url)
  return await resp.json()
}
const TemplatePage: React.FC<templateProps> = ({ id, data }) => {
  const { demos, repository_url, title, description, tags, code } = data

  let [githubData, setState] = useState(null as any | null)
  useEffect(() => {
    if (repository_url) {
      // NOTE: (disclaimer not the best logic)
      // repository_url being passed in means there was a specific repo for
      // this template (i.e. a boilerplate)
      let github_api_repo_url = repository_url.replace(
        'https://github.com/',
        'https://api.github.com/repos/'
      )
      grabGithubData(github_api_repo_url)
        .then(data => {
          setState({
            repo_name: data.full_name,
            repo_date: data.updated_at,
            github_api_repo_url: github_api_repo_url,
          })
        })
        .catch(e => {
          console.log('error from grabbing github', e)
          setState({
            github_api_repo_url: '', // set this to empty string so doesn't render github block
          })
        })
    } else {
      setState({
        github_api_repo_url:
          'https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript',
        repo_name: 'template-registry/' + id + '.js',
      })
    }
  }, [repository_url])

  if (!githubData) return <div>loading</div>
  const { repo_name, repo_date, github_api_repo_url } = githubData
  const repo_date_text = 'December 13, 2019' // TODO convert repo_date into this format
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/gridlex/2.7.1/gridlex.min.css"
        />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/atelier-cave-light.min.css"
        />
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/highlight.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.6.0/dist/highlightjs-line-numbers.min.js"></script>
        {/* <script>
          {` TODO need to make this code actually execute or use SyntaxHightlighting console.log('addding listenr');document.addEventListener('DOMContentLoaded', event => {
                document.querySelectorAll('.black code').forEach(block => {
                  hljs.highlightBlock(block)
                })
                hljs.configure({
                  language: 'javascript',
                })
                document.querySelectorAll('.grey code').forEach(block => {
                  hljs.highlightBlock(block)
                  hljs.lineNumbersBlock(block)
                })
                console.log('did listne')
              })`}
        </script> */}
      </Helmet>
      <figure className="template-page" id={id}>
        <Link to={'/templates'} {...{ className: 'back' }}>
          <img src={Src('/templates/media/left-arrow.svg')} alt="left arrow icon" />
          Template Gallery
        </Link>
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>{title}</h2>
          </div>
          <div className="col-4 demo">
            {demos
              ? Object.keys(demos).map(key => {
                  const demo = demos[key]
                  return demo ? (
                    <Link key={demo.url} to={demo.url}>
                      <img
                        src={Src('/templates/media/external-link.svg')}
                        alt="external link icon"
                      />
                      <span>{demo.text}</span>
                    </Link>
                  ) : null
                })
              : null}
          </div>
        </div>
        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              {/* Might need to markdownify */}
              <span dangerouslySetInnerHTML={{ __html: marked(description) }} />
              <div className="tag-group">
                {tags
                  ? tags.map(tag => (
                      <button key={tag} className={'tooltip ' + tag}>
                        <span className="tooltiptext"></span>
                        {tag}
                      </button>
                    ))
                  : null}
              </div>
            </div>
            {code ? (
              <div className="grey copy-group">
                <CopyToClipboard text={code}>
                  <img className="copy-trigger" src={Src('/svg/copy-box.svg')} alt="copy box" />
                </CopyToClipboard>
                <code className="copy">{code}</code>
              </div>
            ) : null}
          </div>
          <div className="col-4 links">
            {repository_url ? (
              <div className="black copy-block">
                <div className="copy-step">
                  <span>Run in your terminal:</span>
                </div>
                <div className="copy-group">
                  <span className="copy">wrangler generate my-app {repository_url}</span>
                  <CopyToClipboard text={'wrangler generate my-app ' + repository_url}>
                    <img
                      className="copy-trigger"
                      src={Src('/svg/copy-box.svg')}
                      alt="copy box icon"
                    />
                  </CopyToClipboard>
                </div>
                <span>
                  Don't have Wrangler installed?
                  <a href={'/quickstart'}> Get started</a>
                </span>
              </div>
            ) : null}
            {!!github_api_repo_url ? (
              <div className="github">
                {repository_url ? (
                  <>
                    <Link to={repository_url}>
                      <img src={Src('/svg/github.svg')} alt="github icon" />
                      <div>{repo_name}</div>
                    </Link>
                    <div className="date">{repo_date_text}</div>
                  </>
                ) : (
                  <a href={github_api_repo_url + '/' + id + '.js'}>
                    <img src={Src('/svg/github.svg')} alt="github icon" />
                    <div>template-registry/{id}.js</div>
                  </a>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </figure>
    </>
  )
}
export default TemplatePage
