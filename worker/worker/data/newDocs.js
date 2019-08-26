export const newDocsOverview = 'https://workers.cloudflare.com/docs'
export const newDocsBase = 'https://workers.cloudflare.com/docs'
// map for new docs to redirect to
export const newDocsMap = new Map([
  // e.g. /reference/workers-concepts/modifying-requests will now redirect to /templates/modifying-requests
  ['/reference/workers-concepts/modifying-requests', '/templates/snippets/modify_req_props'],
  ['/quickstart/installing-the-cli', '/quickstart#installing-the-cli'],
  ['/quickstart/cli-setup', '/quickstart#installing-the-cli'],
  ['/quickstart/updating-the-cli', '/quickstart#updating-the-cli'],
  ['/quickstart/generating-a-project', '/quickstart#generating-a-project'],
  ['/quickstart/configuring-and-publishing', '/quickstart#configure'],
  ['/quickstart/deploying-to-your-domain', '/quickstart#release-to-your-domain'],
  ['/quickstart/api-keys', '/quickstart#finding-your-cloudflare-api-keys'],
])
