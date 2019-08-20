export const newDocsOverview = 'https://workers.cloudflare.com/docs'
export const newDocsBase = 'https://workers.cloudflare.com/docs'
// map for new docs to redirect to
export const newDocsMap = new Map([
  // e.g. /reference/workers-concepts/modifying-requests will now redirect to /templates/modifying-requests
  [
    '/reference/workers-concepts/modifying-requests',
    '/templates/snippets/modify_req_props',
  ],
  ['/test/path', '/from/new'],
  ['/tutorials/build-a-todo-list', '/templates/featured/build-a-todo-list'],
  [
    '/tutorials/build-a-rustwasm-function',
    '/templates/featured/build-a-rustwasm-function',
  ],
])
