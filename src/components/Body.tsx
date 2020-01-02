import React from 'react'
import { FrontMattter, Fields } from '../types/page'
const Body: React.FC<BodyProps> = ({ children, frontmatter, fields }) => {
  console.log('fields', fields)
  return (
    <>
      <section id="body">
        <div className="padding highlightable">
          <a
            className="github-edit"
            href={`https://github.com/cloudflare/workers-docs/edit/master/content/${fields.filePath}`}
          >
            <img src="/images/github.svg" />
            <span>Edit on Github</span>
          </a>
          {/* Todo maybe add tags? 
          <div id="tags">
            {{ range $index, $tag := .Params.tags }}
            <a class="label label-default" href="{{$.Site.BaseURL}}/tags/{{ $tag | urlize }}">{{ $tag }}</a>
            {{ end }}
          </div>
         */}
          <div id="body-inner">
            <h1>{frontmatter.title}</h1>
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

type BodyProps = {
  frontmatter: FrontMattter
  fields: Fields
}

export default Body
