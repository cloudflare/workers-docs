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
test('test old redirect for archives always maps to new URL', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/archive/recipes/static-site/`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 301)
  t.is(res.headers.get("location"), `${origin}/workers/sites`)
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
test('if archive does  exist, then show that archived doc', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/archive/recipes/a-b-testing/`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 301)
  t.is(res.headers.get("location"), `${origin}/workers/templates/pages/ab_testing`)
})
test('if archive does not exist, and it was redirected have new link', async t => {
  mockGlobal()
  const event = getEvent(
    new Request(`${origin}/workers/archive/recipes/pre-shared-keys/`),
  )
  const res = await handleRequest(event)
  t.is(res.status, 200)
  t.true(!!await res.text())
})
test('conditional_response', async t => {
  mockGlobal()
  const event = getEvent(new Request(`${origin}/workers/templates/snippets/conditional_response/`))
  const res = await handleRequest(event)
  t.is(res.status, 301)

  t.is(res.headers.get('location'), `${origin}/workers/templates/pages/conditional_response`)
})
