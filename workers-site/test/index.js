import test from 'ava'
import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
const makeServiceWorkerEnv = require('service-worker-mock')
Object.assign(global, makeServiceWorkerEnv())
export const getEvent = request => {
  const waitUntil = callback => {
    callback
  }
  return {
    request,
    waitUntil,
  }
}
test('getAssetFromKV with no trailing slash on a subdirectory', async t => {
  const event = getEvent(new Request('https://blah.com/sub/blah.png'))
  t.pass()

})