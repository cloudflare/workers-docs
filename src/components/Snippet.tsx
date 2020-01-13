import { restApiTemplate } from "../types/restApiTemplates"
import React from 'react'
type snippetProps = Partial<restApiTemplate> & {
  page_url?: string

}
export const Snippet: React.FC<snippetProps> = (props) => {
  let { endpointId, code, description, title, share_url, tags } = props.description ? props : getSnippet(props.endpointId || "")
  let { page_url } = props
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
        <img src="/templates/media/file.svg" />
        {/* //  type="image/svg+xml" */}
        <span>Copy into a Worker script:</span>
      </div>
      <div className="copy">
        <code>{code}</code>
      </div>
    </div>
  </figure>)
}

const getSnippet = (id: string): restApiTemplate => {
  return {
    "tags": null,
    "share_url": null,
    "repository_url": null,
    "endpointId": "conditional_response",
    "description": "Return a response based on the incoming request's URL, HTTP method, User Agent, IP address, ASN or device type (e.g. mobile)",
    "demos": {
      "bar": null,
      "foo": null,
      "main": {
        "share_url": "/templates/snippets/conditional_response",
        "tags": [
          "Enterprise"
        ],
        "text": "Demo",
        "url": "https://cloudflareworkers.com/#cec6695f67232bc76e3f396fcb2d5cc7:https://nope.mywebsite.com/"
      }
    },
    "code": "const BLOCKED_HOSTNAMES = ['nope.mywebsite.com', 'bye.website.com']\nasync function handleRequest(request) {\n  // Return a new Response based on..\n  // On URL's hostname\n  let url = new URL(request.url)\n  if (BLOCKED_HOSTNAMES.includes(url.hostname)) {\n    return new Response('Blocked Host', { status: 403 })\n  }\n  // On URL's file extenstion (e.g. block paths ending in .doc or .xml)\n  let forbiddenExtRegExp = new RegExp(/\\.(doc|xml)$/)\n  if (forbiddenExtRegExp.test(url.pathname)) {\n    return new Response('Blocked Extension', { status: 403 })\n  }\n  // On HTTP method\n  if (request.method === 'POST') {\n    return new Response('Response for POST')\n  }\n  // On User Agent\n  let userAgent = request.headers.get('User-Agent') || ''\n  if (userAgent.includes('bot')) {\n    return new Response('Block User Agent containing bot', { status: 403 })\n  }\n  // On Client's IP address\n  let clientIP = request.headers.get('CF-Connecting-IP')\n  if (clientIP === '1.2.3.4') {\n    return new Response('Block the IP 1.2.3.4', { status: 403 })\n  }\n  // On ASN\n  if ((request.cf || {}).asn == 64512) {\n    return new Response('Block the ASN 64512 response')\n  }\n  // On Device Type\n  //  Requires Enterprise \"CF-Device-Type Header\" zone setting or\n  //  Page Rule with \"Cache By Device Type\" setting applied.\n  let device = request.headers.get('CF-Device-Type')\n  if (device === 'mobile') {\n    return Response.redirect('https://mobile.example.com')\n  }\n  console.error(\n    \"Getting Client's IP address, device type, and ASN are not supported in playground. Must test on a live worker\",\n  )\n  return fetch(request)\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n",
    "title": "Conditional Response",
    "type": "snippet",
    "url": null,
    "weight": 60
  }
}