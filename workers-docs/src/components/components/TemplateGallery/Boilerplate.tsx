import { restApiTemplate } from '../../types/restApiTemplates'
import React from 'react'
import { Link, Src } from '../../components/Link'
import { useRestApiTemplates } from '../../hooks/useMarkdownRemark'
import marked from 'marked'
type boilerplateProps = restApiTemplate
export const Boilerplate: React.FC<boilerplateProps> = props => {
  const { allRestApiTemplates } = useRestApiTemplates()
  const getBoilerplate = (id: string) => {
    const boilerplate = allRestApiTemplates.edges
      .map(edge => edge.node)
      .find(node => node.endpointId === id)
    if (!boilerplate) {
      throw 'Boilerplate not found with id' + id
    }
    return boilerplate
  }
  let { endpointId, description, title, tags, repository_url } = props.description
    ? props
    : getBoilerplate(props.endpointId || '')
  const template_page = Src('/templates/pages/' + endpointId)

  // TODO use regex to make sure leading slash
  return (
    <figure className="template-card boilerplate" id={endpointId}>
      <div className="tag-group">
        {tags?.map(tag => (
          <button className={'tooltip ' + tag} key={endpointId + '-' + tag}>
            {tag}
            <span className="tooltiptext"></span>
          </button>
        ))}
      </div>
      <Link to={template_page}>
        <h2>{title}</h2>
        <img src={Src('/templates/media/right-arrow.svg')} alt="right arrow" />
      </Link>
      <p dangerouslySetInnerHTML={{ __html: marked(description) }} />
      <div className="copy-group">
        <div className="copy-step">
          <img src={Src('/templates/media/terminal.svg')} alt="terminal icon" />
          <span>Paste this into your terminal:</span>
        </div>

        <div className="copy">
          <code>
            wrangler generate my-app
            {repository_url ? <a href={repository_url}> {repository_url}</a> : null}
          </code>
        </div>
      </div>
    </figure>
  )
}
