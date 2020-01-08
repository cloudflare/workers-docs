import React from 'react'
const Body: React.FC<BodyProps> = ({ children, github_edit_url }) => {
  return (
    <>
      <section id="body">
        <div className="padding highlightable">
          {github_edit_url ? (<a
            className="github-edit"
            href={github_edit_url}
          >
            <img src="/images/github.svg" />
            <span>Edit on Github</span>
          </a>) : null}
          {/* Todo maybe add tags? here is original hugo
          <div id="tags">
            {{ range $index, $tag := .Params.tags }}
            <a class="label label-default" href="{{$.Site.BaseURL}}/tags/{{ $tag | urlize }}">{{ $tag }}</a>
            {{ end }}
          </div>
         */}
          <div id="body-inner">
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

type BodyProps = {
  github_edit_url?: string
}

export default Body
