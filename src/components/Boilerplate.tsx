import { restApiTemplate } from "../types/restApiTemplates"
import React from 'react'
type boilerplateProps = restApiTemplate & {
  page_url?: string

}
export const Boilerplate: React.FC<boilerplateProps> = ({ endpointId, page_url, code, description, title, share_url, tags }) => {
  return (<figure className="template-card boilerplate" id="{{.id}}">
    <div className="tag-group">
      {{ range.tags }}
      <button className="tooltip {{.}}">
        <span className="tooltiptext"></span>{{.}}
      </button>
      {{ end }}
    </div>
    {{ $page_url:= .tutorial }}
    {{ if $page_url }}
    {{ else }}
    {{ $page_url:= .share_url }}
    {{ end }}
    {{ $template_page:=  .id | printf "/templates/pages/%s" }}
    {{ $page_url:= or $page_url $template_page }}
    <a href={{ $page_url }}>
      <h2>
        {{.title }}
      </h2>
      <img src="/templates/media/right-arrow.svg" />
    </a>
    <p>{{.description | markdownify }}</p>
    <div className="copy-group">
      <div className="copy-step">
        <img src="/templates/media/terminal.svg" id="img" />
        <span>Paste this into your terminal:</span>
      </div>
      <div className="copy">
        <code>
          wrangler generate my-app
        <a href="{{.repository_url}}">{{.repository_url }}</a>
        </code>
      </div>
    </div>
  </figure>)
}