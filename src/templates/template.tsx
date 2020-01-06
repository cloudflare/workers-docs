import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import { template } from "../types/page"
type templateProps = {
  id: string
  pageContext: any
  data: template
}
const Template: React.FC<templateProps> = ({
  pageContext,
  data, // this prop will be injected by the GraphQL query below.
}) => {
  // const data = {}
  console.log('pageContext', pageContext)
  const { share_url, demos, repository_url, title, description } = data // data.markdownRemark holds our post data
  const { id } = pageContext
  return (
    <>
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
      <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', event => {
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
    })
  </script>
      <figure class="template-page" id="{{.id}}">
        <a href="/templates" class="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div class="grid-3-noBottom_xs-5">
          <div class="col-8">
            <h2>
              {{.title }}
            </h2>
          </div>
          <div class="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div class="grid-3">
          <div class="col-8 ">
            <div class="headline">
              <hr />
              <p>{{.description | markdownify }}</p>
              <div class="tag-group">
                {{ range.tags }}
                <button class="tooltip {{.}}">
                  <span class="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {{ if .code }}
            <div class="grey copy-group">
              <img class="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code class="copy">{{.code }}</code>
            </div>
            {{ end }}
          </div>
          <div class="col-4 links">
            {{ if .repository_url }}
            <div class="black copy-block">
              <div class="copy-step">
                <span>Run in your terminal:</span>
              </div>
              <div class="copy-group">
                <span class="copy">wrangler generate my-app {{.repository_url }}</span>
                <img class="copy-trigger" src="/svg/copy-box.svg" id="img" />
              </div>
              <span
              >Don't have Wrangler installed?
            <a href="/quickstart">Get started</a></span
              >
            </div>
            {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
            {{ $repo_json:= getJSON $github_api_repo_url }}
            {{ $repo_name:= $repo_json.full_name }}
            {{ $repo_date:= $repo_json.updated_at }}
            <div class="github">
              <a href="{{.repository_url}}">
                <img src="/svg/github.svg" />
                <div>
                  {{ $repo_name }}
                </div>
              </a>
              <div class="date">
                Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
              </div>
            </div>
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div class="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
              </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>
    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

<>
  <figure className="template-page" id={id}>
    <a href="/templates" className="back">
      <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
    >
    <div className="grid-3-noBottom_xs-5">
      <div className="col-8">
        <h2>
          {title}
        </h2>
      </div>
      <div className="col-4 demo">
        {{ range.demos }}
        <a href="{{.url}}">
          <img src="/templates/media/external-link.svg" />
          <span>{{.text }}</span>
        </a>
        {{ end }}
      </div>
    </div>

    <div className="grid-3">
      <div className="col-8 ">
        <div className="headline">
          <hr />
          <p>{description}</p>
          {/* <p>{{.description | markdownify }}</p> */}
          <div className="tag-group">
            {{ range.tags }}
            <button className="tooltip {{.}}">
              <span className="tooltiptext"></span>{{.}}
            </button>
            {{ end }}
          </div>
        </div>
        {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
      </div>
      <div className="col-4 links">
        {repository_url ? (
          <div className="copy-step">
            <span>Run in your terminal:</span>
          </div>
          <div className="copy-group">
            <span className="copy">wrangler generate my-app {{.repository_url }}</span>
            <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
          </div>
          <span
          >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
          >
          </div>
      {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
      {{ $repo_json:= getJSON $github_api_repo_url }}
      {{ $repo_name:= $repo_json.full_name }}
      {{ $repo_date:= $repo_json.updated_at }}
      <div className="github">
        <a href="{{.repository_url}}">
          <img src="/svg/github.svg" />
          <div>
            {{ $repo_name }}
          </div>
        </a>
        <div className="date">
          Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
        </div>
      </div>
      <div className="black copy-block">

        )
            {{ else }}
        {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
        <div className="github">
          <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
            <img src="/svg/github.svg" />
            <div>
              template-registry/{{ .id }}.js
            </div>
          </a>
        </div>
        {{ end }}
      </div>
    </div>
  </figure>

</>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
    restApiTemplates(endpointId: {eq: $id}) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
  }

    <>
      <figure className="template-page" id={id}>
        <a href="/templates" className="back">
          <img src="/templates/media/left-arrow.svg" id="img" />Template Gallery</a
        >
        <div className="grid-3-noBottom_xs-5">
          <div className="col-8">
            <h2>
              {title}
            </h2>
          </div>
          <div className="col-4 demo">
            {{ range.demos }}
            <a href="{{.url}}">
              <img src="/templates/media/external-link.svg" />
              <span>{{.text }}</span>
            </a>
            {{ end }}
          </div>
        </div>

        <div className="grid-3">
          <div className="col-8 ">
            <div className="headline">
              <hr />
              <p>{description}</p>
              {/* <p>{{.description | markdownify }}</p> */}
              <div className="tag-group">
                {{ range.tags }}
                <button className="tooltip {{.}}">
                  <span className="tooltiptext"></span>{{.}}
                </button>
                {{ end }}
              </div>
            </div>
            {/* {{ if .code }}
            <div className="grey copy-group">
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
              <code className="copy">{{.code }}</code>
            </div>
            {{ end }} */}
          </div>
          <div className="col-4 links">
          {repository_url ? (
            <div className="copy-step">
              <span>Run in your terminal:</span>
            </div>
            <div className="copy-group">
              <span className="copy">wrangler generate my-app {{.repository_url }}</span>
              <img className="copy-trigger" src="/svg/copy-box.svg" id="img" />
            </div>
            <span
            >Don't have Wrangler installed?
        <a href="/quickstart">Get started</a></span
            >
          </div>
          {{ $github_api_repo_url:= replace.repository_url "https://github.com/" "https://api.github.com/repos/" }}
          {{ $repo_json:= getJSON $github_api_repo_url }}
          {{ $repo_name:= $repo_json.full_name }}
          {{ $repo_date:= $repo_json.updated_at }}
          <div className="github">
            <a href="{{.repository_url}}">
              <img src="/svg/github.svg" />
              <div>
                {{ $repo_name }}
              </div>
            </a>
            <div className="date">
              Last Updated: {{ dateFormat "January 2, 2006" $repo_date }}
            </div>
          </div>
          <div className="black copy-block">

          )
            {{ else }}
            {{ $github_api_repo_url:= "https://github.com/victoriabernard92/template-registry/tree/master/templates/javascript" }}
            <div className="github">
              <a href="{{ $github_api_repo_url }}/{{ .id }}.js">
                <img src="/svg/github.svg" />
                <div>
                  template-registry/{{ .id }}.js
            </div>
              </a>
            </div>
            {{ end }}
          </div>
        </div>
      </figure>

    </>
  )
}
export default Template

export const pageQuery = graphql`query ($id: String!) {
  restApiTemplates(endpointId: { eq: $id }) {
    repository_url
    share_url
    weight
    url
    tags
    title
    endpointId
    description
    type
    demos {
      bar {
        text
        url
      }
      foo {
        text
        url
      }
      main {
        share_url
        tags
        text
        url
      }
    }
  }
}

`
