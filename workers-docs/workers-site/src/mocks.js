const makeServiceWorkerEnv = require('service-worker-mock')

const HASH = '123HASHBROWN'

export const getEvent = (request) => {
  const waitUntil = (callback) => {
    callback
  }
  return {
    request,
    waitUntil,
  }
}
export const mockResponseRedirect = (url, code) =>
  new Response(null, { status: code, headers: { location: url } })

export const mockKV = () => {
  const store = {
    'workers/templates/index.123HASHBROWN.html': 'workers/templates/index.html',
    'workers/archive/recipes/pre-shared-keys/index.123HASHBROWN.html':
      'workers/archive/recipes/pre-shared-keys/index.html',
    'workers/archive/recipes/static-site/index.123HASHBROWN.html': `workers/archive/recipes/static-site/index.html`,
  }
  return {
    get: (path) => store[path] || null,
  }
}

export const mockManifest = () => {
  return JSON.stringify({
    'workers/templates/index.html': `workers/templates/index.${HASH}.html`,
    'workers/archive/recipes/pre-shared-keys/index.html': `workers/archive/recipes/pre-shared-keys/index.${HASH}.html`,
    'workers/archive/recipes/static-site/index.html': `workers/archive/recipes/static-site/index.${HASH}.html`,
  })
}
let cacheStore = {}
export const mockCaches = () => {
  return {
    default: {
      match: (key) => {
        return cacheStore[key] || null
      },
      put: (key, val) => {
        return (cacheStore[key] = val)
      },
    },
  }
}

export function mockGlobal() {
  Object.assign(global, makeServiceWorkerEnv())
  Object.assign(global, { __STATIC_CONTENT_MANIFEST: mockManifest() })
  Object.assign(global, { __STATIC_CONTENT: mockKV() })
  Object.assign(global, { caches: mockCaches() })
  Object.assign(global, {
    Response: Object.assign(Response, { redirect: mockResponseRedirect }),
  })
}
