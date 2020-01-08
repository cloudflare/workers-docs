import React from 'react'
import { allRestApiTemplates } from '../types/restApiTemplates'
import { useStaticQuery, graphql } from 'gatsby'
import { Snippet } from './Snippet'
import Layout from './Layout'
import Body from './Body'
import { Boilerplate } from './Boilerplate'
const SearchBox = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2, marginRight: "16px" }}>
        <label style={{ fontWeight: "normal", color: "#666" }}> Search templates</label >
        <input id="search" placeholder="🔎 Search by template name or other details" style={{ padding: "10px", width: "100%" }}></input>
      </div >
      <div style={{ flex: 1, marginRight: "16px" }}>
        <label style={{ fontWeight: "normal", color: "#666" }}> Type</label >
        <select id="type" style={{ width: "100%" }}>
          <option>All</option>
          <option>Boilerplates</option>
          <option>Snippets</option>
          <option value="featured_boilerplates">Featured</option>
        </select>
      </div >
    </div >)
}
export const Gallery: React.FunctionComponent<GalleryProps> = ({

}) => {
  const templates: allRestApiTemplates['data'] = useStaticQuery(
    graphql`
    query {
      allRestApiTemplates {
        edges {
          node {
            tags
            share_url
            repository_url
            endpointId
            description
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
            code
            title
            type
            url
            weight
          }
        }
      }
    }
    
    `,
  )
  const snippets = templates.allRestApiTemplates.edges.map(edge => edge.node).filter(template => template.type === "snippet")
  const boilerplates = templates.allRestApiTemplates.edges.map(edge => edge.node).filter(template => template.type === "boilerplate")
  console.log('templates', templates)
  return (
    <Layout title="Template Gallery">
      <Body>
        <h1>Template Gallery</h1>
        <p>These templates are simple building blocks for developing Workers scripts.</p>
        <SearchBox />
        <div className="gallery" id="results">
          <h2>Boilerplates</h2>
          {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
          <section className="template-wrapper boilerplate">
            {boilerplates.length ? boilerplates.map(template => (
              <Boilerplate {...template}></Boilerplate>
            )) : null}
          </section>
          <h2>Snippets</h2>
          {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
          <section className="template-wrapper snippet">
            {snippets.length ? snippets.map(template => (
              <Snippet {...template}></Snippet>
            )) : null}
          </section>
          {/* TODO add in the raw JS that adds templates to global */}
        </div>
      </Body>
    </Layout>
  )
}

export type GalleryProps = {

}
// TODO: remove this is just to check graphql is returning the correct type
const IgnoreMe: allRestApiTemplates = {
  "data": {
    "allRestApiTemplates": {
      "edges": [
        {
          "node": {
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
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": "https://github.com/xtuc/binast-cf-worker-template",
            "endpointId": "binast_cf_worker",
            "description": "Serve BinAST via a Cloudflare Worker",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://serve-binjs.that-test.site/"
              }
            },
            "code": null,
            "title": "Binast-Cf-Worker",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "cors_header_proxy",
            "description": "Add necessary CORS headers to a third party API response",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#00ad8fc3ff55f6b740ed09470359dc0d:https://example.com/"
              }
            },
            "code": "async function handleRequest(request) {\n  const url = new URL(request.url)\n  const apiurl = url.searchParams.get('apiurl')\n  // Rewrite request to point to API url. This also makes the request mutable\n  // so we can add the correct Origin header to make the API server think\n  // that this request isn't cross-site.\n  request = new Request(apiurl, request)\n  request.headers.set('Origin', new URL(apiurl).origin)\n  let response = await fetch(request)\n  // Recreate the response so we can modify the headers\n  response = new Response(response.body, response)\n  // Set CORS headers\n  response.headers.set('Access-Control-Allow-Origin', url.origin)\n  // Append to/Add Vary header so browser will cache response correctly\n  response.headers.append('Vary', 'Origin')\n  return response\n}\nfunction handleOptions(request) {\n  // Make sure the necesssary headers are present\n  // for this to be a valid pre-flight request\n  if (\n    request.headers.get('Origin') !== null &&\n    request.headers.get('Access-Control-Request-Method') !== null &&\n    request.headers.get('Access-Control-Request-Headers') !== null\n  ) {\n    // Handle CORS pre-flight request.\n    // If you want to check the requested method + headers\n    // you can do that here.\n    return new Response(null, {\n      headers: corsHeaders,\n    })\n  } else {\n    // Handle standard OPTIONS request.\n    // If you want to allow other HTTP Methods, you can do that here.\n    return new Response(null, {\n      headers: {\n        Allow: 'GET, HEAD, POST, OPTIONS',\n      },\n    })\n  }\n}\naddEventListener('fetch', event => {\n  const request = event.request\n  const url = new URL(request.url)\n  if (url.pathname.startsWith(proxyEndpoint)) {\n    if (request.method === 'OPTIONS') {\n      // Handle CORS preflight requests\n      event.respondWith(handleOptions(request))\n    } else if (\n      request.method === 'GET' ||\n      request.method === 'HEAD' ||\n      request.method === 'POST'\n    ) {\n      // Handle requests to the API server\n      event.respondWith(handleRequest(request))\n    } else {\n      event.respondWith(async () => {\n        return new Response(null, {\n          status: 405,\n          statusText: 'Method Not Allowed',\n        })\n      })\n    }\n  } else {\n    // Serve demo page\n    event.respondWith(rawHtmlResponse(demoPage))\n  }\n})\n// We support the GET, POST, HEAD, and OPTIONS methods from any origin,\n// and accept the Content-Type header on requests. These headers must be\n// present on all responses to all CORS requests. In practice, this means\n// all responses to OPTIONS requests.\nconst corsHeaders = {\n  'Access-Control-Allow-Origin': '*',\n  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',\n  'Access-Control-Allow-Headers': 'Content-Type',\n}\n// The URL for the remote third party API you want to fetch from\n// but does not implement CORS\nconst apiurl = 'https://workers-tooling.cf/demos/demoapi'\n// The endpoint you want the CORS reverse proxy to be on\nconst proxyEndpoint = '/corsproxy/'\n// The rest of this snippet for the demo page\nasync function rawHtmlResponse(html) {\n  return new Response(html, {\n    headers: {\n      'content-type': 'text/html;charset=UTF-8',\n    },\n  })\n}\nconst demoPage = `\n<!DOCTYPE html>\n<html>\n<body>\n  <h1>API GET without CORS Proxy</h1>\n  <a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful'>Shows TypeError: Failed to fetch since CORS is misconfigured</a>\n  <p id='noproxy-status'/>\n  <code id='noproxy'>Waiting</code>\n  <h1>API GET with CORS Proxy</h1>\n  <p id='proxy-status'/>\n  <code id='proxy'>Waiting</code>\n  <h1>API POST with CORS Proxy + Preflight</h1>\n  <p id='proxypreflight-status'/>\n  <code id='proxypreflight'>Waiting</code>\n  <script>\n  let reqs = {};\n  reqs.noproxy = async () => {\n    let response = await fetch('${apiurl}')\n    return await response.json()\n  }\n  reqs.proxy = async () => {\n    let response = await fetch(window.location.origin + '${proxyEndpoint}?apiurl=${apiurl}')\n    return await response.json()\n  }\n  reqs.proxypreflight = async () => {\n    const reqBody = {\n      msg: \"Hello world!\"\n    }\n    let response = await fetch(window.location.origin + '${proxyEndpoint}?apiurl=${apiurl}', {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify(reqBody),\n    })\n    return await response.json()\n  }\n  (async () => {\n    for (const [reqName, req] of Object.entries(reqs)) {\n      try {\n        let data = await req()\n        document.getElementById(reqName).innerHTML = JSON.stringify(data)\n      } catch (e) {\n        document.getElementById(reqName).innerHTML = e\n      }\n    }\n  })()\n  </script>\n</body>\n</html>`\n",
            "title": "CORS Header Proxy",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "post_json",
            "description": "Sends a POST request with JSON data from the Workers script.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#edce60b7d57c1e98fbe2d931aaaaf25f:https://tutorial.cloudflareworkers.com"
              }
            },
            "code": "async function handleRequest(request) {\n  const init = {\n    body: JSON.stringify(body),\n    method: 'POST',\n    headers: {\n      'content-type': 'application/json;charset=UTF-8',\n    },\n  }\n  const response = await fetch(url, init)\n  const results = await gatherResponse(response)\n  return new Response(results, init)\n}\naddEventListener('fetch', event => {\n  return event.respondWith(handleRequest(event.request))\n})\n/**\n * gatherResponse awaits and returns a response body as a string.\n * Use await gatherResponse(..) in an async function to get the response body\n * @param {Response} response\n */\nasync function gatherResponse(response) {\n  const { headers } = response\n  const contentType = headers.get('content-type')\n  if (contentType.includes('application/json')) {\n    return await response.json()\n  } else if (contentType.includes('application/text')) {\n    return await response.text()\n  } else if (contentType.includes('text/html')) {\n    return await response.text()\n  } else {\n    return await response.text()\n  }\n}\n/**\n * Example someHost is set up to take in a JSON request\n * Replace url with the host you wish to send requests to\n * @param {string} url the URL to send the request to\n * @param {BodyInit} body the JSON data to send in the request\n */\nconst someHost = 'https://workers-tooling.cf/demos'\nconst url = someHost + '/requests/json'\nconst body = {\n  results: ['default data to send'],\n  errors: null,\n  msg: 'I sent this to the fetch',\n}\n",
            "title": "Post JSON",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "modify_res_props",
            "description": "Recommended practice for mutating a fetched [response](/reference/apis/response). First, fetches a request then modifies specific properties which are immutable: `status`, `statusText`, `headers` and `body`.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#daf0e96ae0ff4ce3f103c14bf6d968df:http://workers-tooling.cf/demos/static/json"
              }
            },
            "code": "async function handleRequest(request) {\n  /**\n   * Best practice is to only assign properties on the response\n   * object (i.e. ResponseInit props) through either a method or the constructor\n   * since properties are immutable\n   */\n  let originalResponse = await fetch(request)\n  let originalBody = await originalResponse.json()\n  // Change status and statusText\n  // Make sure to pass in originalResponse to preserving all parts\n  // of the original response except the part we want to update.\n  let response = new Response(originalResponse, { status: 500, statusText: 'some message' })\n  // Change response body by adding the foo prop\n  let body = JSON.stringify({ foo: 'bar', ...originalBody })\n  response = new Response(body, response)\n  // Add a header using set method\n  response.headers.set('foo', 'bar')\n  // Set destination header to the value of the source header\n  if (response.headers.has(headerNameSrc)) {\n    response.headers.set(headerNameDst, response.headers.get(headerNameSrc))\n    console.log(\n      `Response header \"${headerNameDst}\" was set to \"${response.headers.get(headerNameDst)}\"`,\n    )\n  }\n  return response\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n/**\n * @param {string} headerNameSrc the header to get the new value from\n * @param {string} headerNameDst the header to set based off of value in src\n */\nconst headerNameSrc = 'foo'//'Orig-Header'\nconst headerNameDst = 'Last-Modified'\n",
            "title": "Modify Response",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "hot_link_protection",
            "description": "Block other websites from linking to your content",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": "/templates/snippets/hotlink-protection",
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#d659b20dcf91df6e6de1bedbb94f6702:https://www.cloudflare.com/img/logo-cloudflare-dark.svg"
              }
            },
            "code": "const HOMEPAGE_URL = 'https://tutorial.cloudflareworkers.com/'\nconst PROTECTED_TYPE = 'images/'\nasync function handleRequest(request) {\n  // Fetch the original request\n  let response = await fetch(request)\n  // If it's an image, engage hotlink protection based on the\n  // Referer header.\n  let referer = request.headers.get('Referer')\n  let contentType = response.headers.get('Content-Type') || ''\n  if (referer && contentType.startsWith(PROTECTED_TYPE)) {\n    // If the hostnames don't match, it's a hotlink\n    if (new URL(referer).hostname !== new URL(request.url).hostname) {\n      // Redirect the user to your website\n      return Response.redirect(url, 302)\n    }\n  }\n  // Everything is fine, return the response normally.\n  return response\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n",
            "title": "Hot-link Protection",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": [
              "Middleware"
            ],
            "share_url": "/about/tips/debugging",
            "repository_url": null,
            "endpointId": "debugging_tips",
            "description": "Send debug information in an errored response and to a logging service.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#5601380cdcb173e5b712bd82113ce47a:https://blah.workers-tooling.cf/fetch/error"
              }
            },
            "code": "const LOG_URL = 'https://log-service.example.com/' // Service setup up to receive logs\nasync function handleRequest(event) {\n  let response\n  try {\n    response = await fetch(event.request)\n    if (!response.ok) {\n      let body = await response.text()\n      throw new Error(\n        'Bad response at origin. Status: ' +\n          response.status +\n          ' Body: ' +\n          body.trim().substring(0, 10), //ensures is string that can be a header\n      )\n    }\n  } catch (err) {\n    // Without event.waitUntil(), our fetch() to our logging service may\n    // or may not complete.\n    event.waitUntil(postLog(err))\n    const stack = JSON.stringify(err.stack) || err\n    // Copy the response and initialize body to the stack trace\n    response = new Response(stack, response)\n    // Shove our rewritten URL into a header to find out what it was.\n    response.headers.set('X-Debug-stack', stack)\n    response.headers.set('X-Debug-err', err)\n  }\n  return response\n}\naddEventListener('fetch', event => {\n  //Have any uncaught errors thrown go directly to origin\n  event.passThroughOnException()\n  event.respondWith(handleRequest(event))\n})\nfunction postLog(data) {\n  return fetch(LOG_URL, {\n    method: 'POST',\n    body: data,\n  })\n}\n",
            "title": "Debugging Tips",
            "type": "snippet",
            "url": null,
            "weight": 50
          }
        },
        {
          "node": {
            "tags": [
              "Middleware"
            ],
            "share_url": null,
            "repository_url": null,
            "endpointId": "block_on_tls_version",
            "description": "Inspects the incoming request's TLS version and blocks if under TLSv1.2.",
            "demos": null,
            "code": "async function handleRequest(request) {\n  try {\n    let tlsVersion = request.cf.tlsVersion\n    // Allow only TLS versions 1.2 and 1.3\n    if (tlsVersion != 'TLSv1.2' && tlsVersion != 'TLSv1.3') {\n      return new Response('Please use TLS version 1.2 or higher.', {\n        status: 403,\n      })\n    }\n    return fetch(request)\n  } catch (err) {\n    console.error(\n      'request.cf does not exist in the previewer, only in production',\n    )\n    return new Response('Error in workers script' + err.message, {\n      status: 500,\n    })\n  }\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n",
            "title": "Block on TLS Version",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": [
              "Middleware"
            ],
            "share_url": null,
            "repository_url": "https://github.com/xtuc/img-color-worker",
            "endpointId": "img_color_worker",
            "description": "Retrieve the dominant color of a PNG or JPEG image",
            "demos": null,
            "code": null,
            "title": "Img-Color-Worker",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": "boilerplates/router",
            "repository_url": "https://github.com/cloudflare/worker-template-router",
            "endpointId": "router",
            "description": "Selects the logic based on the `request` method and URL. Use with REST APIs or apps that require routing logic.",
            "demos": {
              "bar": {
                "text": "Demo /bar",
                "url": "https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/bar"
              },
              "foo": {
                "text": "Demo /foo",
                "url": "https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/foo"
              },
              "main": null
            },
            "code": null,
            "title": "Router",
            "type": "boilerplate",
            "url": "/templates/boilerplates/router",
            "weight": 97
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "bulk_redirects",
            "description": "Redirects requests to certain URLs based a mapped object to the request's URL.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#d17c3da192fd5c83ef7d28153ab32f3f:https://example.com/redirect/bulk1"
              }
            },
            "code": "async function handleRequest(request) {\n  let requestURL = new URL(request.url)\n  let path = requestURL.pathname.split('/redirect')[1]\n  let location = redirectMap.get(path)\n  if (location) {\n    return Response.redirect(location, 301)\n  }\n  // If in map, return the original request\n  return fetch(request)\n}\naddEventListener('fetch', async event => {\n  event.respondWith(handleRequest(event.request))\n})\nconst externalHostname = 'workers-tooling.cf'\nconst redirectMap = new Map([\n  ['/bulk1', 'https://' + externalHostname + '/redirect2'],\n  ['/bulk2', 'https://' + externalHostname + '/redirect3'],\n  ['/bulk3', 'https://' + externalHostname + '/redirect4'],\n  ['/bulk4', 'https://google.com'],\n])\n",
            "title": "Bulk Redirects",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": "featured_boilerplates/graphql",
            "repository_url": "https://github.com/signalnerve/workers-graphql-server",
            "endpointId": "graphql_server",
            "description": "🔥Lightning-fast, globally distributed Apollo GraphQL server, deployed at the edge using Cloudflare Workers.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://workers-graphql.signalnerve.workers.dev/___graphql"
              }
            },
            "code": null,
            "title": "Apollo GraphQL Server",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 2
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": "https://github.com/cloudflare/worker-emscripten-template",
            "endpointId": "emscripten",
            "description": "Image Resizer in C compiled to Wasm with Emscripten",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Wasm"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#ddb7fa39e09cdf734180c5d083ddb390:http://placehold.jp/1200x800.png"
              }
            },
            "code": null,
            "title": "Emscripten + Wasm Image Resizer",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "auth_with_headers",
            "description": "Allow or deny a request based on a known pre-shared key in a header. Note while this simple implementation is helpful, it is not meant to replace more secure scripts such as signed requests using the [WebCrypto API](/reference/runtime/apis/web-crypto).",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#7373b8c3c9c46c03c81562f00f663f81:https://tutorial.cloudflareworkers.com"
              }
            },
            "code": "async function handleRequest(request) {\n  let psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY)\n  if (psk === PRESHARED_AUTH_HEADER_VALUE) {\n    // Correct preshared header key supplied. Fetching request\n    // from origin\n    return fetch(request)\n  }\n  // Incorrect key rejecting request\n  return new Response('Sorry, you have supplied an invalid key.', {\n    status: 403,\n  })\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n/**\n * @param {string} PRESHARED_AUTH_HEADER_KEY custom header to check for key\n * @param {string} PRESHARED_AUTH_HEADER_VALUE hard coded key value\n */\nconst PRESHARED_AUTH_HEADER_KEY = 'X-Custom-PSK'\nconst PRESHARED_AUTH_HEADER_VALUE = 'mypresharedkey'\n",
            "title": "Auth with headers",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "fetch_html",
            "description": "Sends a request to a remote server, reads HTML from the response, then serves that HTML.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#14a82a672534b0dd25b385a5d3de744c:https://example.com"
              }
            },
            "code": "async function handleRequest(request) {\n  const init = {\n    headers: {\n      'content-type': 'text/html;charset=UTF-8',\n    },\n  }\n  const response = await fetch(url, init)\n  const results = await gatherResponse(response)\n  return new Response(results, init)\n}\naddEventListener('fetch', event => {\n  return event.respondWith(handleRequest(event.request))\n})\n/**\n * gatherResponse awaits and returns a response body as a string.\n * Use await gatherResponse(..) in an async function to get the response body\n * @param {Response} response\n */\nasync function gatherResponse(response) {\n  const { headers } = response\n  const contentType = headers.get('content-type')\n  if (contentType.includes('application/json')) {\n    return await response.json()\n  } else if (contentType.includes('application/text')) {\n    return await response.text()\n  } else if (contentType.includes('text/html')) {\n    return await response.text()\n  } else {\n    return await response.text()\n  }\n}\n/**\n * Example someHost at url is set up to respond with HTML\n * Replace url with the host you wish to send requests to\n *  */\nconst someHost = 'https://workers-tooling.cf/demos'\nconst url = someHost + '/static/html'\n",
            "title": "Fetch HTML",
            "type": "snippet",
            "url": null,
            "weight": 20
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": "https://github.com/cloudflare/worker-template",
            "endpointId": "hello_world",
            "description": "Simple Hello World in JS",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Originless"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#6626eb50f7b53c2d42b79d1082b9bd37:https://tutorial.cloudflareworkers.com"
              }
            },
            "code": null,
            "title": "Hello World",
            "type": "boilerplate",
            "url": null,
            "weight": 99
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "alter_headers",
            "description": "Change the headers sent in a request or returned in a response",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": "/templates/snippets/alter_headers",
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#5386d315ec8c899370e8e5d00cf88939:https://tutorial.cloudflareworkers.com"
              }
            },
            "code": "async function handleRequest(request) {\n  // Make the headers mutable by re-constructing the Request.\n  request = new Request(request)\n  request.headers.set('x-my-header', 'custom value')\n  const URL = 'https://workers-tooling.cf/demos/static/html'\n  // URL is set up to respond with dummy HTML, remove to send requests to your own origin\n  let response = await fetch(URL, request)\n  // Make the headers mutable by re-constructing the Response.\n  response = new Response(response.body, response)\n  response.headers.set('x-my-header', 'custom value')\n  return response\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n",
            "title": "Alter Headers",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": "https://github.com/cloudflare/rustwasm-worker-template",
            "endpointId": "hello_world_rust",
            "description": "Simple Hello World in Rust",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": "/templates/boilerplates/rustwasm",
                "tags": [
                  "Originless",
                  "Wasm"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#1992963c14c25bc8dc4c50f4cab740e5:https://tutorial.cloudflareworkers.com"
              }
            },
            "code": null,
            "title": "Hello World Rust",
            "type": "boilerplate",
            "url": null,
            "weight": 98
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": "/templates/snippets/modify_req_props",
            "repository_url": null,
            "endpointId": "modify_req_props",
            "description": "Recommended practice for forming a [request](/reference/apis/request) based off the incoming request. First, takes in the incoming request then modifies specific properties like POST `body`, `redirect`, and the Cloudflare specific property `cf` and runs the fetch.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#27b91145f66b6cfce1b3190ed7ba0bc5:https://example.com"
              }
            },
            "code": "async function handleRequest(request) {\n  /**\n   * Best practice is to only assign new properties on the request\n   * object (i.e. RequestInit props) through either a method or the constructor\n   */\n  let newRequestInit = {\n    // Change method\n    method: 'POST',\n    // Change body\n    body: JSON.stringify({ bar: 'foo' }),\n    // Change the redirect mode.\n    redirect: 'follow',\n    //Change headers, note this method will erase existing headers\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    // Change a Cloudflare feature on the outbound response\n    cf: { apps: false },\n  }\n  // Change URL\n  let url = someUrl\n  // Change just the host\n  url = new URL(url)\n  url.hostname = someHost\n  // Best practice is to always use the original request to construct the new request\n  // thereby cloning all the attributes, applying the URL also requires a constructor\n  // since once a Request has been constructed, its URL is immutable.\n  const newRequest = new Request(url, new Request(request, newRequestInit))\n  // Set headers using method\n  newRequest.headers.set('X-Example', 'bar')\n  newRequest.headers.set('Content-Type', 'application/json')\n  try {\n    return await fetch(newRequest)\n  } catch (e) {\n    return new Response(JSON.stringify({ error: e.message }), { status: 500 })\n  }\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n/**\n * Example someHost is set up to return raw JSON\n * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied\n * @param {string} someHost the host the request will resolve too\n */\nconst someHost = 'example.com'\nconst someUrl = 'https://foo.example.com/api.js'\n",
            "title": "Modify Request Property",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "cookie_extract",
            "description": "Extracts the value of a cookie, given the cookie name.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": "/templates/snippets/cookie_extract",
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#605946f0f09b396361d3dadb5abf29c8:https://tutorial.cloudflareworkers.com/"
              }
            },
            "code": "const COOKIE_NAME = '__uid'\nasync function handleRequest(request) {\n  const cookie = getCookie(request, COOKIE_NAME)\n  if (cookie) {\n    // respond with the cookie value\n    return new Response(cookie)\n  }\n  return new Response('No cookie with name: ' + COOKIE_NAME)\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n/**\n * Grabs the cookie with name from the request headers\n * @param {Request} request incoming Request\n * @param {string} name of the cookie to grab\n */\nfunction getCookie(request, name) {\n  let result = null\n  let cookieString = request.headers.get('Cookie')\n  if (cookieString) {\n    let cookies = cookieString.split(';')\n    cookies.forEach(cookie => {\n      let cookieName = cookie.split('=')[0].trim()\n      if (cookieName === name) {\n        let cookieVal = cookie.split('=')[1]\n        result = cookieVal\n      }\n    })\n  }\n  return result\n}\n",
            "title": "Extract Cookie Value",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": "/templates/snippets/ab_testing",
            "repository_url": null,
            "endpointId": "ab_testing",
            "description": "Set up an A/B test by controlling what response is served based on cookies",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#12a2962014e1324e3a416a5a76e1f81f:https://tutorial.cloudflareworkers.com"
              }
            },
            "code": "async function handleRequest(request) {\n  const NAME = 'experiment-0'\n  // Responses below are place holders, you could set up\n  // a custom path for each test (e.g. /control/somepath )\n  const TEST_RESPONSE = new Response('Test group') // fetch('/test/sompath', request)\n  const CONTROL_RESPONSE = new Response('Control group') // fetch('/control/sompath', request)\n  // Determine which group this requester is in.\n  const cookie = request.headers.get('cookie')\n  if (cookie && cookie.includes(`${NAME}=control`)) {\n    return CONTROL_RESPONSE\n  } else if (cookie && cookie.includes(`${NAME}=test`)) {\n    return TEST_RESPONSE\n  } else {\n    // if no cookie then this is a new client, decide a group and set the cookie\n    let group = Math.random() < 0.5 ? 'test' : 'control' // 50/50 split\n    let response = group === 'control' ? CONTROL_RESPONSE : TEST_RESPONSE\n    response.headers.append('Set-Cookie', `${NAME}=${group}; path=/`)\n    return response\n  }\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n",
            "title": "A/B Testing",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "redirect",
            "description": "Redirect a request by sending a 301 or 302 HTTP response",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#ab385d4c4e43608684889eaa390d4218:https://example.com/"
              }
            },
            "code": "async function handleRequest(request) {\n  return Response.redirect(someURLToRedirectTo, code)\n}\naddEventListener('fetch', async event => {\n  event.respondWith(handleRequest(event.request))\n})\n/**\n * Example Input\n * @param {Request} url where to redirect the response\n * @param {number?=301|302} type permanent or temporary redirect\n */\nconst someURLToRedirectTo = 'https://www.google.com'\nconst code = 301\n",
            "title": "Redirect",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "http2_server_push",
            "description": "Push static assests to a client's browser without waiting for HTML to render",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#f7b7e99bec493ba4f4847a095c4fa61c:https://tutorial.cloudflareworkers.com/"
              }
            },
            "code": "async function handleRequest(request) {\n  // If request is for test.css just serve the raw CSS\n  if (/test.css$/.test(request.url)) {\n    return new Response(CSS, {\n      headers: {\n        'content-type': 'text/css',\n      },\n    })\n  } else {\n    // serve raw HTML using HTTP/2 for the CSS file\n    return new Response(HTML, {\n      headers: {\n        'content-type': 'text/html',\n        Link: '</http2_push/h2p/test.css>; rel=preload;',\n      },\n    })\n  }\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\nconst CSS = `body { color: red; }`\nconst HTML = `\n<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Server push test</title>\n    <link rel=\"stylesheet\" href=\"http2_push/h2p/test.css\">\n  </head>\n  <body>\n    <h1>Server push test page</h1>\n  </body>\n</html>\n`\n",
            "title": "HTTP/2 Server Push",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "send_raw_json",
            "description": "Renders a response of type `application/json` to the client",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Originless"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#83bc6debecf1dd443d3fabfbde0d2b3a:https://example.com"
              }
            },
            "code": "async function handleRequest(request) {\n  const init = {\n    headers: {\n      'content-type': 'application/json;charset=UTF-8',\n    },\n  }\n  return new Response(JSON.stringify(someJSON), init)\n}\naddEventListener('fetch', event => {\n  return event.respondWith(handleRequest(event.request))\n})\nconst someJSON = {\n  result: ['some', 'results'],\n  errors: null,\n  msg: 'this is some random json',\n}\n",
            "title": "Send Raw JSON",
            "type": "snippet",
            "url": null,
            "weight": 50
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": "/templates/snippets/signed_request",
            "repository_url": null,
            "endpointId": "signed_request",
            "description": "Check signatures of requests and sign responses with a private key",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/?hide_editor#c22ea0102fb9dced927a9b870e9c546a:https://example.com/"
              }
            },
            "code": "// NOTE Requires ESM through webpack project type\nconst crypto = require('crypto')\nconst SECRET = 'SECRET_KEY'\nasync function handleRequest(request) {\n  let signed = await checkSignature(request)\n  if (signed) {\n    let responseBody = 'Hello worker!'\n    return await signResponse(responseBody, new Response(responseBody))\n  } else {\n    return new Response('Request not signed', { status: 400 })\n  }\n}\naddEventListener('fetch', event => {\n  console.log(createHexSignature('asd'))\n  event.respondWith(handleRequest(event.request))\n})\nasync function createHexSignature(requestBody) {\n  let hmac = crypto.createHmac('sha256', SECRET)\n  hmac.update(requestBody)\n  return hmac.digest('hex')\n}\nasync function checkSignature(request) {\n  // hash request with secret key\n  let expectedSignature = await createHexSignature(await request.text())\n  let actualSignature = await request.headers.get('signature')\n  // check that hash matches signature\n  return expectedSignature === actualSignature\n}\nasync function signResponse(responseBody, response) {\n  // create signature\n  const signature = await createHexSignature(responseBody)\n  response.headers.set('signature', signature)\n  //add header with signature\n  return response\n}\n",
            "title": "Signed Request/Response",
            "type": "snippet",
            "url": null,
            "weight": 10
          }
        },
        {
          "node": {
            "tags": [
              "Middleware"
            ],
            "share_url": null,
            "repository_url": "https://github.com/bustle/cf-sentry",
            "endpointId": "sentry",
            "description": "Log exceptions and errors in your Workers application to Sentry.io -  an error tracking tool",
            "demos": null,
            "code": null,
            "title": "Sentry",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": [
              "Originless"
            ],
            "share_url": null,
            "repository_url": "https://github.com/EverlastingBugstopper/worker-typescript-template",
            "endpointId": "typescript",
            "description": "Simple Hello World in TypeScript",
            "demos": null,
            "code": null,
            "title": "Hello World TypeScript",
            "type": "boilerplate",
            "url": null,
            "weight": 90
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": "https://github.com/cloudflare/worker-speedtest-template",
            "endpointId": "speedtest_worker",
            "description": "Measure download / upload connection speed from the client side, using the Performance Timing API",
            "demos": null,
            "code": null,
            "title": "Speedtest",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": "/templates/snippets/send_raw_html",
            "repository_url": null,
            "endpointId": "send_raw_html",
            "description": "Delivers an HTML page from HTML directly in the Worker script.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Originless"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#ba06ef26637ab98b1f38a18dc527dc69:https://example.com"
              }
            },
            "code": "async function handleRequest(request) {\n  const init = {\n    headers: {\n      'content-type': 'text/html;charset=UTF-8',\n    },\n  }\n  return new Response(someHTML, init)\n}\naddEventListener('fetch', event => {\n  return event.respondWith(handleRequest(event.request))\n})\nconst someHTML =  `<!DOCTYPE html>\n<html>\n  <body>\n  <h1>Hello World</h1>\n  <p>This is all generated using a Worker</p>\n  <iframe\n      width=\"560\"\n      height=\"315\"\n      src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\"\n      frameborder=\"0\"\n      allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n      allowfullscreen\n  ></iframe>\n  </body>\n</html>\n`\n",
            "title": "Send Raw HTML",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": [
              "Originless"
            ],
            "share_url": "/sites/start-from-scratch",
            "repository_url": "https://github.com/cloudflare/worker-sites-template",
            "endpointId": "sites",
            "description": "Get started with Workers Sites to easily deploy static assets to the Cloudflare edge.",
            "demos": null,
            "code": null,
            "title": "Worker Sites",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": "/templates/snippets/aggregate_requests",
            "repository_url": null,
            "endpointId": "aggregate_requests",
            "description": "Sends two GET request to two urls and aggregates the responses into one response.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#eaaa52283784c21aec989c64b9db32d3:https://example.com"
              }
            },
            "code": "async function handleRequest(request) {\n  const init = {\n    headers: {\n      'content-type': type,\n    },\n  }\n  const responses = await Promise.all([fetch(url1, init), fetch(url2, init)])\n  const results = await Promise.all([gatherResponse(responses[0]), gatherResponse(responses[1])])\n  return new Response(results, init)\n}\naddEventListener('fetch', event => {\n  return event.respondWith(handleRequest(event.request))\n})\n/**\n * gatherResponse awaits and returns a response body as a string.\n * Use await gatherResponse(..) in an async function to get the response body\n * @param {Response} response\n */\nasync function gatherResponse(response) {\n  const { headers } = response\n  const contentType = headers.get('content-type')\n  if (contentType.includes('application/json')) {\n    return await response.json()\n  } else if (contentType.includes('application/text')) {\n    return await response.text()\n  } else if (contentType.includes('text/html')) {\n    return await response.text()\n  } else {\n    return await response.text()\n  }\n}\n/**\n * Example someHost is set up to return JSON responses\n * Replace url1 and url2  with the hosts you wish to\n * send requests to\n * @param {string} url the URL to send the request to\n */\nconst someHost = 'https://workers-tooling.cf/demos'\nconst url1 = someHost + '/requests/json'\nconst url2 = someHost + '/requests/json'\nconst type = 'application/json;charset=UTF-8'\n",
            "title": "Aggregate Requests",
            "type": "snippet",
            "url": null,
            "weight": 20
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "rewrite_urls",
            "description": "Rewrite URLs using [HTML Rewriter](/reference/apis/html-rewriter)",
            "demos": null,
            "code": "async function handleRequest(req) {\n  const res = await fetch(req)\n  return rewriter.transform(res)\n}\n\nconst rewriter = new HTMLRewriter()\n  .on('a', new AttributeRewriter('href'))\n  .on('img', new AttributeRewriter('src'))\n\nclass AttributeRewriter {\n  constructor(attributeName) {\n    this.attributeName = attributeName\n  }\n\n  element(element) {\n    const attribute = element.getAttribute(this.attributeName)\n    if (attribute) {\n      element.setAttribute(\n        this.attributeName,\n        attribute.replace('myolddomain.com', 'mynewdomain.com')\n      )\n    }\n  }\n}\n\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n",
            "title": "Rewrite URLs",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "cache_ttl",
            "description": "Determine how/if Cloudflare's [Classic CDN](/about/using-cache.md#cloudflare-s-cdn) and Browsers will cache a resource by setting TTLs, cache keys, and cache settings.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware",
                  "Enterprise"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#8dd3e29985701b05e43b4dd74c387b74:https://example.com/"
              }
            },
            "code": "async function handleRequest(request) {\n  let url = new URL(request.url)\n  // Only use the path for the cache key, removing query strings\n  // and always storing HTTPS e.g. https://www.example.com/file-uri-here\n  let someCustomKey = `https://${url.hostname}${url.pathname}`\n  let response = await fetch(request, {\n    cf: {\n      // Tell Cloudflare's Global CDN to always cache this fetch regardless of content type\n      // for a max of 5 seconds before revalidating the resource\n      cacheTtl: 5, // sets TTL to 5 and cacheEverything setting\n      //Enterprise only feature, see Cache API for other plans\n      cacheKey: someCustomKey,\n    },\n  })\n  // must use Response constructor to inherit all of response's fields\n  response = new Response(response.body, response)\n  //Set cache control headers to cache on browser for 25 minutes\n  response.headers.set('Cache-Control', 'max-age=1500')\n  return response\n}\naddEventListener('fetch', event => {\n  return event.respondWith(handleRequest(event.request))\n})\n",
            "title": "Cache TTL and Custom Keys",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "private_data_loss",
            "description": "Prevent access to personal and sensitive data by inspecting response data from an origin server. In this example, sensitive data is defined by regexes for email, UK mobile number, or credit card number. If a match is detected, trigger a data breach alert and respond with either a block or the data stripped from the response.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": "/templates/snippets/private_data_loss",
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#1b7ac657cfaec2635a319441800a5158:https://example.com/"
              }
            },
            "code": "const SOME_HOOK_SERVER = 'https://webhook.flow-wolf.io/hook'\nconst DEBUG = true\n/**\n * Define personal data with regular expressions\n * Respond with block if credit card data, and strip\n * emails and phone numbers from the response\n * Execution will be limited to MIME type \"text/*\"\n */\nasync function handleRequest(request) {\n  let response = await fetch(request)\n  // Return origin responst, if response wasn't text\n  let contentType = response.headers.get('content-type')\n  if (!contentType.toLowerCase().includes('text/')) {\n    return response\n  }\n  let text = await response.text()\n  text = DEBUG\n    ? // for testing only - replace the response from the origin with an email\n      text.replace('You may use this', 'me@example.com may use this')\n    : text\n  const sensitiveRegexsMap = {\n    email: String.raw`\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b`,\n    phone: String.raw`\\b07\\d{9}\\b`,\n    creditCard: String.raw`\\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\\d{3})\\d{11})\\b`,\n  }\n  for (const kind in sensitiveRegexsMap) {\n    let sensitiveRegex = new RegExp(sensitiveRegexsMap[kind], 'ig')\n    let match = await sensitiveRegex.test(text)\n    if (match) {\n      // alert a data breach by posting to a webhook server\n      await postDataBreach(request)\n      // respond with a block if credit card, else replace\n      // senstive text with *'s\n      return kind === 'creditCard'\n        ? new Response(kind + ' found\\nForbidden\\n', {\n            status: 403,\n            statusText: 'Forbidden',\n          })\n        : new Response(text.replace(sensitiveRegex, '**********'), response)\n    }\n  }\n  return new Response(text, response)\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\nasync function postDataBreach(request) {\n  let trueClientIp = request.headers.get('cf-connecting-ip')\n  let epoch = new Date().getTime()\n  const body = {\n    ip: trueClientIp,\n    time: epoch,\n    request: request,\n  }\n  const init = {\n    body: JSON.stringify(body),\n    method: 'POST',\n    headers: {\n      'content-type': 'application/json;charset=UTF-8',\n    },\n  }\n  return await fetch(SOME_HOOK_SERVER, init)\n}\n",
            "title": "Data Loss Prevention",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": [
              "Originless"
            ],
            "share_url": null,
            "repository_url": null,
            "endpointId": "country_code",
            "description": "Redirect a response based on the country code of the visitor",
            "demos": null,
            "code": "async function handleRequest(request) {\n  return redirect(request, 'subdomain')\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n/**\n * Returns a redirect determined by the country code\n * @param {Request} request\n */\nfunction redirect(request) {\n  // The `cf-ipcountry` header is not supported in the previewer\n  const country = request.headers.get('cf-ipcountry')\n  const url = countryMap[country]\n  return Response.redirect(url)\n}\n/**\n * A map of the url's to redirect to\n * @param {Object} countryMap\n*/\nconst countryMap = {\n  \"US\" : \"https://example.com/us\",\n  \"EU\": \"https://eu.example.com/\"\n}\n",
            "title": "Country Code",
            "type": "snippet",
            "url": null,
            "weight": 20
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "fetch_json",
            "description": "Sends a GET request and reads in JSON from the response.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Middleware"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#a45261f6682b048d9ed0e23a330d9cdb:https://example.com"
              }
            },
            "code": "async function handleRequest(request) {\n  const init = {\n    headers: {\n      'content-type': type,\n    },\n  }\n  const responses = await Promise.all([fetch(url1, init), fetch(url2, init)])\n  const results = await Promise.all([gatherResponse(responses[0]), gatherResponse(responses[1])])\n  return new Response(results, init)\n}\naddEventListener('fetch', event => {\n  return event.respondWith(handleRequest(event.request))\n})\n/**\n * gatherResponse awaits and returns a response body as a string.\n * Use await gatherResponse(..) in an async function to get the response body\n * @param {Response} response\n */\nasync function gatherResponse(response) {\n  const { headers } = response\n  const contentType = headers.get('content-type')\n  if (contentType.includes('application/json')) {\n    return await response.json()\n  } else if (contentType.includes('application/text')) {\n    return await response.text()\n  } else if (contentType.includes('text/html')) {\n    return await response.text()\n  } else {\n    return await response.text()\n  }\n}\n/**\n * Example someHost is set up to return JSON responses\n * Replace url1 and url2  with the hosts you wish to\n * send requests to\n * @param {string} url the URL to send the request to\n */\nconst someHost = 'https://workers-tooling.cf/demos'\nconst url1 = someHost + '/requests/json'\nconst url2 = someHost + '/requests/json'\nconst type = 'application/json;charset=UTF-8'\n",
            "title": "Fetch JSON",
            "type": "snippet",
            "url": null,
            "weight": 30
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "post_data",
            "description": "Serves an HTML form, then reads POSTs from that form data. Can also be used to read JSON or other POST data from an incoming request.",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": null,
                "tags": [
                  "Originless"
                ],
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#a6a285e4e2bfbebea0be31b9eeaca3e6:https://example.com/form"
              }
            },
            "code": "async function handlePostRequest(request) {\n  let reqBody = await readRequestBody(request)\n  let retBody = `The request body sent in was ${reqBody}`\n  return new Response(retBody)\n}\nasync function handleRequest(request) {\n  let retBody = `The request was a GET `\n  return new Response(retBody)\n}\naddEventListener('fetch', event => {\n  const { request } = event\n  const { url } = request\n  if (url.includes('form')) {\n    return event.respondWith(rawHtmlResponse(someForm))\n  }\n  if (request.method === 'POST') {\n    return event.respondWith(handlePostRequest(request))\n  } else if (request.method === 'GET') {\n    return event.respondWith(handleRequest(request))\n  }\n})\n/**\n * rawHtmlResponse delievers a response with HTML inputted directly\n * into the worker script\n * @param {string} html\n */\nasync function rawHtmlResponse(html) {\n  const init = {\n    headers: {\n      'content-type': 'text/html;charset=UTF-8',\n    },\n  }\n  return new Response(html, init)\n}\n/**\n * readRequestBody reads in the incoming request body\n * Use await readRequestBody(..) in an async function to get the string\n * @param {Request} request the incoming request to read from\n */\nasync function readRequestBody(request) {\n  const { headers } = request\n  const contentType = headers.get('content-type')\n  if (contentType.includes('application/json')) {\n    const body = await request.json()\n    return JSON.stringify(body)\n  } else if (contentType.includes('application/text')) {\n    const body = await request.text()\n    return body\n  } else if (contentType.includes('text/html')) {\n    const body = await request.text()\n    return body\n  } else if (contentType.includes('form')) {\n    const formData = await request.formData()\n    let body = {}\n    for (let entry of formData.entries()) {\n      body[entry[0]] = entry[1]\n    }\n    return JSON.stringify(body)\n  } else {\n    let myBlob = await request.blob()\n    var objectURL = URL.createObjectURL(myBlob)\n    return objectURL\n  }\n}\nconst someForm = `\n<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello World</h1>\n<p>This is all generated using a Worker</p>\n<form action=\"/demos/requests\" method=\"post\">\n  <div>\n    <label for=\"say\">What  do you want to say?</label>\n    <input name=\"say\" id=\"say\" value=\"Hi\">\n  </div>\n  <div>\n    <label for=\"to\">To who?</label>\n    <input name=\"to\" id=\"to\" value=\"Mom\">\n  </div>\n  <div>\n    <button>Send my greetings</button>\n  </div>\n</form>\n</body>\n</html>\n",
            "title": "Read POST Data",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": [
              "Middleware"
            ],
            "share_url": "/templates/featured_boilerplates/cloud_storage",
            "repository_url": "https://github.com/conzorkingkong/cloud-storage",
            "endpointId": "cloud_storage",
            "description": "Serve private AWS bucket files from a Worker script",
            "demos": null,
            "code": null,
            "title": "Cloud Storage",
            "type": "featured_boilerplate",
            "url": null,
            "weight": 50
          }
        },
        {
          "node": {
            "tags": [
              "Middleware"
            ],
            "share_url": null,
            "repository_url": null,
            "endpointId": "cache_api",
            "description": "Cache using Cloudflare's [Cache API](/reference/apis/cache/). This example can cache POST requests as well as change what hostname to store a response in cache. Note the previewer is not avalible for using Cache API.",
            "demos": null,
            "code": "async function handleRequest(event) {\n  let request = event.request\n  let cacheUrl = new URL(request.url)\n  // hostname for a different zone\n  cacheUrl.hostname = someOtherHostname\n  let cacheKey = new Request(cacheUrl, request)\n  let cache = caches.default\n  // Get this request from this zone's cache\n  let response = await cache.match(cacheKey)\n  if (!response) {\n    //if not in cache, grab it from the origin\n    response = await fetch(request)\n    // must use Response constructor to inherit all of response's fields\n    response = new Response(response.body, response)\n    // Cache API respects Cache-Control headers, so by setting max-age to 10\n    // the response will only live in cache for max of 10 seconds\n    response.headers.append('Cache-Control', 'max-age=10')\n    // store the fetched response as cacheKey\n    // use waitUntil so computational expensive tasks don't delay the response\n    event.waitUntil(cache.put(cacheKey, response.clone()))\n  }\n  return response\n}\nasync function handlePostRequest(event) {\n  let request = event.request\n  let body = await request.clone().text()\n  let hash = await sha256(body)\n  let cacheUrl = new URL(request.url)\n  // get/store the URL in cache by prepending the body's hash\n  cacheUrl.pathname = '/posts' + cacheUrl.pathname + hash\n  // Convert to a GET to be able to cache\n  let cacheKey = new Request(cacheUrl, {\n    headers: request.headers,\n    method: 'GET',\n  })\n  let cache = caches.default\n  //try to find the cache key in the cache\n  let response = await cache.match(cacheKey)\n  // otherwise, fetch response to POST request from origin\n  if (!response) {\n    response = await fetch(request)\n    event.waitUntil(cache.put(cacheKey, response))\n  }\n  return response\n}\naddEventListener('fetch', event => {\n  try {\n    let request = event.request\n    if (request.method.toUpperCase() === 'POST')\n      return event.respondWith(handlePostRequest(event))\n    return event.respondWith(handleRequest(event))\n  } catch (e) {\n    return event.respondWith(new Response('Error thrown ' + e.message))\n  }\n})\nasync function sha256(message) {\n  // encode as UTF-8\n  const msgBuffer = new TextEncoder().encode(message)\n  // hash the message\n  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)\n  // convert ArrayBuffer to Array\n  const hashArray = Array.from(new Uint8Array(hashBuffer))\n  // convert bytes to hex string\n  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')\n  return hashHex\n}\nconst someOtherHostname = 'my.herokuapp.com'\n",
            "title": "Cache API",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        },
        {
          "node": {
            "tags": null,
            "share_url": null,
            "repository_url": null,
            "endpointId": "bulk_origin_proxies",
            "description": "Resolve requests to your domain to a set of proxy third-party origins",
            "demos": {
              "bar": null,
              "foo": null,
              "main": {
                "share_url": "/templates/snippets/bulk_origin_proxies",
                "tags": null,
                "text": "Demo",
                "url": "https://cloudflareworkers.com/#545c79e098708ca658dcbdb860c5021a:https://starwarsapi.yourdomain.com/"
              }
            },
            "code": "async function handleRequest(request) {\n  let url = new URL(request.url)\n  // Check if incoming hostname is\n  // a key in the ORIGINS object\n  let target = ORIGINS[url.hostname]\n  // If it is, proxy request to that third party origin\n  if (target) {\n    url.hostname = target\n    return fetch(url, request)\n  }\n  // Otherwise, process request as normal\n  return fetch(request)\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n/**\n * An object with different url's to fetch\n * @param {Object} ORIGINS\n */\nconst ORIGINS = {\n  'starwarsapi.yourdomain.com': 'swapi.co',\n  'google.yourdomain.com': 'google.com',\n}\n",
            "title": "Bulk Origin Proxies",
            "type": "snippet",
            "url": null,
            "weight": 1
          }
        }
      ]
    }
  }
}
