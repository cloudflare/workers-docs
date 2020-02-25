import { handleRequest } from './src/main'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})
