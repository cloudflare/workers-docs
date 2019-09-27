import test from 'ava'
import { handleRequest } from '../src/main'
import { mockGlobal, getEvent } from '../src/mocks'

const origin = "https://developers.cloudflare.com"

test('test new redirect maps to updated URL', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/reference/workers-concepts/security/`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 301)
  t.is(res.headers.get("location"), `${origin}/workers/about/security`)
})
test('test old redirect maps to new URL', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/recipes/`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 301)
  t.is(res.headers.get("location"), `${origin}/workers/templates`)
})
test('canonical directory redirect', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/templates`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 301)
  t.is(res.headers.get("location"), `${origin}/workers/templates/`)
})
test('if URL exists, then serve it', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/templates/`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 200)
  t.true(!!await res.text())
})
test('if URL does not exists, then redirect to root', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/blah/`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 301)
  t.is(res.headers.get("location"), `${origin}/workers`)
})
test('if archvive does  exist, then show that archive root', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/archive/recipes/pre-shared-keys/`),
  )
  const res = await handleRequest(event)
  // console.log('res.headers.get("location"', res.headers.get("location")
  t.is(res.status, 200)
  t.true(!!await res.text())
})
