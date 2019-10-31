export const newDocsOverview = 'https://developers.cloudflare.com/workers'
export const newDocsBase = 'https://developers.cloudflare.com/workers'
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

  ['/reference/workers-concepts', '/about'],
  ['/reference/workers-concepts/how-it-works', '/about/how-it-works'],
  ['/reference/workers-concepts/routes', '/about/routes'],
  ['/reference/workers-concepts/security', '/about/security'],
  ['/reference/workers-concepts/using-cache', '/about/using-cache'],
  ['/reference/workers-concepts/request-context', '/about/tips/request-context'],
  ['/reference/workers-concepts/fetch-event-lifecycle ', '/about/tips/fetch-event-lifecycle '],
  ['/reference/workers-concepts/signing-requests', '/about/tips/signing-requests'],

  ['/reference/tooling', '/tooling/'],
  ['/reference/tooling/playground', '/tooling/playground'],
  ['/reference/tooling/api', '/tooling/api'],
  ['/reference/tooling/wrangler', '/tooling/wrangler'],
  ['/reference/tooling/serverless', '/tooling/serverless'],

  ['/reference/runtime/apis', '/reference/apis/'],
  ['/reference/runtime/apis/cache', '/reference/apis/cache'],
  ['/reference/runtime/apis/encoding', '/reference/apis/encoding'],
  ['/reference/runtime/apis/fetch-event', '/reference/apis/fetch-event'],
  ['/reference/runtime/apis/fetch', '/reference/apis/fetch'],
  ['/reference/runtime/apis/standard', '/reference/apis/standard'],
  ['/reference/runtime/apis/streams', '/reference/apis/streams'],
  ['/reference/runtime/apis/web-crypto', '/reference/apis/web-crypto'],

  ['/reference/storage/overview/writing-data', '/reference/storage/writing-data'],

  ['/tutorials/build-a-rustwasm-function', '/templates/boilerplates/rustwasm'],

  ['/sites/reference', '/tooling/wrangler/sites'],
  ['/sites/ignore-assets', '/tooling/wrangler/sites/#ignoring-subsets-of-static-assets'],

  // This is a remnant of some buggy workers.cloudflare.com code,
  // we should explicitly handle this and send them to the right place
  ['/workers/docs', '/workers'],
])
