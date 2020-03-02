import { restApiTemplate, allRestApiTemplates } from '../../types/restApiTemplates'
import React from 'react'
type snippetProps = Partial<restApiTemplate> & {
  page_url?: string
}
import { useRestApiTemplates } from '../../hooks/useMarkdownRemark'
export const Snippet: React.FC<snippetProps> = props => {
  const { allRestApiTemplates } = useRestApiTemplates()
  const getSnippet = (id: string) => {
    const snippet = allRestApiTemplates.edges
      .map(edge => edge.node)
      .find(node => node.endpointId === id)
    if (!snippet) {
      throw 'Snippet not found with id' + id
    }
    return snippet
  }

  let { endpointId, code, description, title, share_url, tags } = props.description
    ? props
    : getSnippet(props.endpointId || '')
  let { page_url } = props
  const template_page = '/workers/templates/pages/' + endpointId
  page_url = share_url ? '/' + share_url : template_page // TODO may need to consider tutorial?
  page_url = page_url
  return (
    <figure className="template-card snippet" id={endpointId}>
      <div className="tag-group">
        {tags?.map(tag => (
          <button key={endpointId + '-' + tag} className={'tooltip ' + tag}>
            {tag}
            <span className="tooltiptext"></span>
          </button>
        ))}
      </div>

      <a href={page_url}>
        <h2>{title}</h2>
        <img src={'/workers/templates/media/right-arrow.svg'} alt="right arrow"/>
      </a>
      {/* might neded to markdownify */}
      <p>{description}</p>
      <div className="copy-group">
        <div className="copy-step">
          <img src={'/workers/templates/media/file.svg'} alt="file icon" />
          {/* //  type="image/svg+xml" */}
          <span>Copy into a Worker script:</span>
        </div>
        {code ? (
          <div className="copy">
            <code className="copy">{code}</code>
          </div>
        ) : (
          ''
        )}
      </div>
    </figure>
  )
}
