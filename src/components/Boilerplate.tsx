import { restApiTemplate } from "../types/restApiTemplates"
import React from 'react'
import { Link } from "gatsby"
import { useRestApiTemplates } from "../hooks/useMarkdownRemark"
import { PREFIX } from "./utils"
type boilerplateProps = restApiTemplate & {
  page_url?: string
}
export const Boilerplate: React.FC<boilerplateProps> = (props) => {
  const { allRestApiTemplates } = useRestApiTemplates()
  const getBoilerplate = (id: string) => {
    const boilerplate = allRestApiTemplates.edges.map(edge => edge.node).find(node => node.endpointId === id)
    if (!boilerplate) {
      throw "Boilerplate not found with id" + id
    }
    return boilerplate
  }
  let { endpointId, description, title, share_url, tags, repository_url } = props.description ? props : getBoilerplate(props.endpointId || "")
  let { page_url } = props
  const template_page = "/templates/pages/" + endpointId
  page_url = share_url ? ("/" + share_url) : template_page // TODO may need to consider tutorial? // TODO may need to consider tutorial? 
  // TODO use regex to make sure leading slash
  page_url = PREFIX + page_url
  return (<figure className="template-card boilerplate" id="{{.id}}">
    <div className="tag-group">
      {tags?.map(tag => (
        <button className={"tooltip " + tag}>
          {tag}
          <span className="tooltiptext"></span>
        </button>
      ))}
    </div>
    <Link to={page_url}>
      <h2>
        {title}
      </h2>
      <img src={PREFIX + "/templates/media/right-arrow.svg"} />
    </Link>
    {/* Todo may need mardownify */}
    <p>{description}</p>
    <div className="copy-group">
      <div className="copy-step">
        <img src={PREFIX + "/templates/media/terminal.svg"} />
        <span>Paste this into your terminal:</span>
      </div>

      <div className="copy">
        <code>
          wrangler generate my-app
          {repository_url ? (
            <a href={repository_url}>{' '}{repository_url}</a>
          ) : null
          }
        </code>
      </div>
    </div>
  </figure >)
}