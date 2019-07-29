import { oldDocsMap, isOldDoc, hasDefinedRedirect } from './data/oldDocs'
import { newDocsMap, newDocsOverview, newDocsBase } from './data/newDocs'
/**
 * sets up routes and redirects them to a location based
 *  on a maps from oldDocs and newDocs
 * @param {Request} request
 * returns Redirect if matches one of the maps but false if not
 */
export function handleRedirect(request) {
  let requestURL = new URL(request.url)
  let path = requestURL.pathname
  // chop off the "/docs"
  path = path.replace('/docs', '')
  if (isOldDoc(path) && !hasDefinedRedirect(path))
    return Response.redirect(newDocsOverview, 301)
  let location = newDocsMap.get(path) || oldDocsMap.get(path)
  if (location) {
    location = newDocsBase + location
    return Response.redirect(location, 301)
  }
  // If a new doc that is not being redirected return false
  return false
}
