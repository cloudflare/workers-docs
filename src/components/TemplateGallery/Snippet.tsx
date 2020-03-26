import { restApiTemplate, allRestApiTemplates } from '../../types/restApiTemplates'
import React from 'react'
type snippetProps = Partial<restApiTemplate>

import { useRestApiTemplates } from '../../hooks/useMarkdownRemark'
import marked from 'marked'
import { Src } from '../Link'
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

  let { endpointId, code, description, title, tags } = props.description
    ? props
    : getSnippet(props.endpointId || '')
  const template_page = Src('/workers/templates/pages/' + endpointId)

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

      <a href={template_page}>
        <h2>{title}</h2>
        <img src={'/workers/templates/media/right-arrow.svg'} alt="right arrow" />
      </a>
      {description ? <p dangerouslySetInnerHTML={{ __html: marked(description) }} /> : ''}
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
