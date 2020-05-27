import { oldDocsMap, isOldDoc, hasDefinedRedirect } from './oldDocs'
import { newDocsMap, newDocsOverview, newDocsBase } from './newDocs'
/**
 * sets up routes and redirects them to a location based
 *  on a maps from oldDocs and newDocs
 * @param {Request} request
 * returns Redirect if matches one of the maps but false if not
 */
export function handleRedirect(request) {
  let requestURL = new URL(request.url)
  let path = requestURL.pathname
  path = path.replace(/^\/workers/, '')
  //strip last slash
  path = path.replace(/\/$/, '')
  console.log(`Looking for ${path}`)

  let location = newDocsMap.get(path) || oldDocsMap.get(path)
  if (location) {
    location = newDocsBase + location
    console.log(`Found match, redirecting to ${location}`)
    return Response.redirect(location, 301)
  } else if (oldDocsMap.has(path)) {
    location = newDocsBase + '/archive' + path
    console.log(`Found archived docs, redirecting to new route`)
    return Response.redirect(location, 301)
  } else {
    console.log(`Nothing found, redirecting to root`)
    return Response.redirect(newDocsOverview, 301)
  }
}
