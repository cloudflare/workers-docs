import { restApiTemplate } from "../types/restApiTemplates"
import React from 'react'
import { Link } from "gatsby"
type boilerplateProps = restApiTemplate & {
  page_url?: string
}
export const Boilerplate: React.FC<boilerplateProps> = ({ endpointId, page_url, description, title, share_url, tags, repository_url }) => {
  const template_page = "/workers/templates/pages/" + endpointId
  page_url = share_url || template_page // TODO may need to consider tutorial? 
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
      <img src="/templates/media/right-arrow.svg" />
    </Link>
    {/* Todo may need mardownify */}
    <p>{description}</p>
    <div className="copy-group">
      <div className="copy-step">
        <img src="/templates/media/terminal.svg" />
        <span>Paste this into your terminal:</span>
      </div>

      <div className="copy">
        <code>
          wrangler generate my-app
          {repository_url ? (
            <a href={repository_url}>{repository_url}</a>
          ) : null
          }
        </code>
      </div>
    </div>
  </figure>)
}