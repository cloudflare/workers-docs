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

  ['/reference/storage/overview', '/reference/storage'],
  [
    '/reference/storage/overview/writing-data',
    '/reference/apis/configuration_variables/kv#writing-key-value-pairs',
  ],
  [
    '/reference/storage/reading-data',
    '/reference/apis/configuration_variables/kv#reading-key-value-pairs',
  ],
  [
    '/reference/storage/writing-data',
    '/reference/apis/configuration_variables/kv#writing-key-value-pairs',
  ],
  ['/reference/storage/limitations', '/about/limits#kv'],
  ['/reference/storage/expiring-keys', '/reference/apis/configuration_variables/kv/#expiring-keys'],
  // Redirecting to https://api.cloudflare.com/#workers-kv-namespace-properties
  // would probably be best since we don't have good KV API docs anymore,, but
  // the KV landing page isn't terrible.
  ['/reference/storage/api', '/reference/storage'],

  //Template pages
  ['/tutorials/build-a-rustwasm-function', '/templates/pages/rustwasm'],
  ['/templates/boilerplates/router', '/templates/pages/router'],
  ['/templates/featured_boilerplates/graphql', '/templates/pages/graphql'],
  ['/templates/snippets/ab_testing', '/templates/pages/ab_testing'],
  ['/templates/snippets/aggregate_requests', '/templates/pages/aggregate_requests'],
  ['/templates/snippets/alter_headers', '/templates/pages/alter_headers'],
  ['/templates/snippets/auth_with_headers', '/templates/pages/auth_with_headers'],
  ['/templates/snippets/bulk_origin_proxies', '/templates/pages/bulk_origin_proxies'],
  ['/templates/snippets/bulk_redirects', '/templates/pages/bulk_redirects'],
  ['/templates/snippets/conditional_response', '/templates/pages/conditional_response'],
  ['/templates/snippets/cookie_extract', '/templates/pages/cookie_extract'],
  ['/templates/snippets/cors_header_proxy', '/templates/pages/cors_header_proxy'],
  ['/templates/snippets/country_code', '/templates/pages/country_code'],
  ['/templates/snippets/hotlink-protection', '/templates/pages/hotlink-protection'],
  ['/templates/snippets/modify_req_props', '/templates/pages/modify_req_props'],
  ['/templates/snippets/post_data', '/templates/pages/post_data'],
  ['/templates/snippets/private_data_loss', '/templates/pages/private_data_loss'],
  ['/templates/snippets/send_raw_html', '/templates/pages/send_raw_html'],
  ['/templates/snippets/signed_request', '/templates/pages/signed_request'],

  ['/sites/reference', '/tooling/wrangler/sites'],
  ['/sites/ignore-assets', '/tooling/wrangler/sites/#ignoring-subsets-of-static-assets'],

  // This is a remnant of some buggy workers.cloudflare.com code,
  // we should explicitly handle this and send them to the right place
  ['/workers/docs', '/workers'],
  [
    '/reference/storage/reading-key-value-pairs',
    '/reference/apis/kv#reading-key-value-pairs',
  ],
  ['/reference/storage/listing-keys', '/reference/apis/kv#listing-keys'],
  [
    '/reference/storage/writing-key-value-pairs',
    '/reference/apis/kv#writing-key-value-pairs',
  ],
  [
    '/reference/storage/deleting-key-value-pairs',
    '/reference/apis/kv#deleting-key-value-pairs',
  ],
  ['/reference/storage/limits', '/about/limits#kv'],
  ['/reference/storage/pricing', '/about/pricing#kv'],
])
