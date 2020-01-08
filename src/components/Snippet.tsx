import { restApiTemplate } from "../types/restApiTemplates"
import React from 'react'
type snippetProps = restApiTemplate & {
  page_url?: string

}
export const Snippet: React.FC<snippetProps> = ({ endpointId, page_url, code, description, title, share_url, tags }) => {
  const template_page = "/templates/pages/" + endpointId
  page_url = share_url || template_page // TODO may need to consider tutorial? 

  return (<figure className="template-card snippet" id={endpointId}>
    <div className="tag-group">
      {tags?.map(tag => (
        <button className={"tooltip " + tag}>
          {tag}
          <span className="tooltiptext"></span>
        </button>
      ))}
    </div>

    <a href={page_url}>
      <h2>
        {title}
      </h2>
      <img src="/templates/media/right-arrow.svg" />
    </a>
    {/* might neded to markdownify */}
    <p>{description}</p>
    <div className="copy-group">
      <div className="copy-step">
        <img id="img" src="/templates/media/file.svg" />
        {/* //  type="image/svg+xml" */}
        <span>Copy into a Worker script:</span>
      </div>
      <div className="copy">
        <code>{code}</code>
      </div>
    </div>
  </figure>)
}