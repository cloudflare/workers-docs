import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Helmet } from "react-helmet";

import { restApiTemplate } from "../types/restApiTemplates"
type templateProps = {
  // id: string
  // pageContext: any
  id: string
  data: restApiTemplate
}
async function grabGithubData(url: string | null) {
  if (!url) { throw 'no url' }
  const resp = await fetch(url)
  return await resp.json()
}
const TemplatePage: React.FC<templateProps> = ({
  id,
  data, // this prop will be injected by the GraphQL query below.
}) => {

  const { demos, repository_url, title, description, tags, code } = data

  // data.markdownRemark holds our post data
  let [githubData, setState] = useState(null as any | null)


  // const repo_json = getJSON $github_api_repo_url

  useEffect(() => {
    console.log('using effect')

    if (repository_url) {

      let github_api_repo_url = repository_url.replace("https://github.com/", "https://api.github.com/repos/")
      console.log('github_api_repo_url', github_api_repo_url)
      grabGithubData(github_api_repo_url).then(data => {
        console.log('setting data', data)
        setState({
          repo_name: data.full_name,
          repo_date: data.updated_at,
          github_api_repo_url: github_api_repo_url
        })
      })
    } else {
      setState({
        github_api_repo_url: "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript",
        repo_name: "template-registry/" + id + ".js"
      })
    }

  }, [repository_url]
  )


  if (!githubData) return <div>loading</div>
  const { repo_name, repo_date, github_api_repo_url } = githubData
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
        <script>
          {`  console.log('addding listenr');document.addEventListener('DOMContentLoaded', event => {
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
        </script>
      </Helmet>
      <figure className="template-page" id={id}>
        <Link to="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery
          </Link>
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {demos ? Object.keys(demos).map((key) => {
              const demo = demos[key]
              return demo ? (
                <Link to={demo.url}>
                  <img src="/templates/media/external-link.svg" />
                  <span>{demo.text}</span>
                </Link>
              ) : null
            }) : null}

          </div>
        </div>
        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              {/* Might need to markdownify */}
              <p>{description}</p>
              <div className="tag-group">
                {tags ? tags.map(tag => (
                  <button className={"tooltip " + tag} >
                    <span className="tooltiptext"></span>{tag}
                  </button>
                ))
                  : null}
              </div>
            </div>
            {code ?
              <div className="grey copy-group">
                <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
                <code className="copy">{code}</code>
              </div>
              : null}
          </div>
          <div className="col-4 links">
            <div className="github">
              {repository_url ? (
                <Link to={repository_url}>
                  <img src="/svg/github.svg" />
                  <div>{repo_name}</div>
                  <div className="date">{repo_date}</div>
                </Link>) : (<Link to={github_api_repo_url + id + ".js"}>
                  <img src="/svg/github.svg" />
                  <div>template-registry/{id}.js</div>
                </Link>)}
            </div>
          </div>
        </div>
      </figure >
    </>
  )
}
export default TemplatePage
