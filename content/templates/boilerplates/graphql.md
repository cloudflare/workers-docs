---
title: Getting Started with Workers GraphQL Server
hidden: true
---

`workers-graphql-server` is a batteries-included [Apollo GraphQL](https://apollographql.com) server running on Cloudflare Workers.

[![Workers GraphQL Preview](/templates/media/workers-graphql-preview.png)](https://workers-graphql.signalnerve.workers.dev/___graphql)

If you haven’t used GraphQL before, the [“Learn”](https://graphql.org/learn/) section of the GraphQL docs is a great place to start. In this brief tutorial, we'll look at how to set up the basics of a GraphQL server with the `workers-graphql-server`, before deploying it and testing it using the Prisma [GraphQL Playground](https://github.com/prisma/graphql-playground), included in `workers-graphql-server`.

## Generating and configuring a project

As with all [Wrangler](https://github.com/cloudflare/wrangler) templates, generating a new project using the `workers-graphql-server` template is as simple as using `wrangler generate`:

```sh
wrangler generate my-graphql-server https://github.com/signalnerve/workers-graphql-server
```

While many of the files in the default template are pure configuration and out of scope for this tutorial, we should look briefly at `src/index.js`, the entrypoint for this template:

```js
const apollo = require('./handlers/apollo')
const playground = require('./handlers/playground')

const graphQLOptions = {
  // Set the path for the GraphQL server
  baseEndpoint: '/',
  // Set the path for the GraphQL playground
  // This option can be removed to disable the playground route
  playgroundEndpoint: '/___graphql',
  // When a request's path isn't matched, forward it to the origin
  forwardUnmatchedRequestsToOrigin: false,
  // Enable debug mode to return script errors directly in browser
  debug: false,
}

const handleRequest = request => {
  const url = new URL(request.url)
  try {
    if (url.pathname === graphQLOptions.baseEndpoint) {
      return apollo(request, graphQLOptions)
    } else if (
      graphQLOptions.playgroundEndpoint &&
      url.pathname === graphQLOptions.playgroundEndpoint
    ) {
      return playground(request, graphQLOptions)
    } else if (graphQLOptions.forwardUnmatchedRequestsToOrigin) {
      return fetch(request)
    } else {
      return new Response('Not found', { status: 404 })
    }
  } catch (err) {
    return new Response(graphQLOptions.debug ? err : 'Something went wrong', { status: 500 })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

When looking at a Workers project, the entrypoint file can give you a good indication of _how_ the project works. In this case, we have two _handler_ files that we immediately import into this project: `apollo`, which indicates something related to Apollo GraphQL, and `playground`, which represents an instance of the Prisma GraphQL Playground.

`graphQLOptions` is a simple JS object that allows you to configure different settings for your GraphQL server. `baseEndpoint` represents _where_ your actual GraphQL endpoint is served: generally, a GraphQL server exposes a **single endpoint** where clients make all API requests. By default, this endpoint is the root route (`/`), but can be configured to be at any endpoint that you choose.

Similarly, `playgroundEndpoint` exposes the Prisma GraphQL Playground at another endpoint. Unlike `baseEndpoint`, this field is optional: if removed, the playground can be disabled in your project. Check out a [demo of the playground](https://graphql-on-workers.signalnerve.com/___graphql) if you'd like to see what it looks like. By default, this endpoint is set to `___graphql`.

Depending on _where_ your application is deployed, you may choose to forward unmatched requests to your origin. If you're deploying to a domain you already have added to your Cloudflare account, you may want to _enable_ `forwardUnmatchedRequestsToOrigin`, to render the rest of your site directly from the origin. If you're deploying to your Workers.dev subdomain, you can leave this configuration set to `false`, the default value.

## Queries

GraphQL _queries_ allow you to retrieve data from your GraphQL server. By default, the `workers-graphql-server` includes a sample query, `pokemon`, which can be used to retrieve a Pokemon from the [PokeAPI](https://pokeapi.co/):

```graphql
query {
  pokemon(id: 1) {
    name
  }
}
```

In a GraphQL server, every query and resolver (which we'll talk about next) has an associated _type_: this allows GraphQL to know, for instance, that a Pokemon's `name` is a `String!`, or required string. For more information on GraphQL's type system, see the ["Schemas and Types"](https://graphql.org/learn/schema/) portion of the GraphQL docs.

GraphQL types make it super easy to know _how_ your data will be formatted, but they can be a bit of a hassle to write. For our example data, the `Query` type includes a single query, `pokemon`, which takes an `id` parameter of type `ID!` (required ID, indicating a unique key), and returns a type `Pokemon`. These types are often defined as a GraphQL "string" called `typeDefs`:

```js
const typeDefs = gql`
  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
  }

  type Query {
    pokemon(id: ID!): Pokemon
  }
`
```

## Resolvers

To allow GraphQL clients to make queries to the server, we need to configure some _resolvers_. Resolvers represent the glue code between GraphQL and JavaScript: for each configured query we've defined in the `Query` type, we'll create an associated function that actually makes an API call. For instance, given our `pokemon` query:

```js
const resolvers = {
  Query: {
    pokemon: async (_source, { id }, { dataSources }) => {
      return dataSources.pokemonAPI.getPokemon(id)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // ...
})
```

Each function inside of `resolvers` has a number of arguments, allowing you to do conditional logic based on arguments, context, and more – for more information on how to configure resolvers, see Apollo's ["Resolver map"](https://www.apollographql.com/docs/graphql-tools/resolvers/) documentation. In our example, we refer to `id`, a field passed inside of the second function argument (often called `args`), which corresponds to the `id` parameter in our `pokemon` query. To actually retrieve the corresponding data from the PokeAPI, we use a _data source_, which tells Apollo _how_ to make requests to an API server. The example `pokeapi.js` extends Apollo's `RESTDataSource` class, to show how to make `GET` requests to an API:

```js
const { RESTDataSource } = require('apollo-datasource-rest')

class PokemonAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2/'
  }

  async getPokemon(id) {
    return this.get(`pokemon/${id}`)
  }
}

module.exports = { PokemonAPI }
```

Apollo's data sources feature allows you to take any API and write a GraphQL-compatible interface for it. For more information on how data sources in Apollo work, [check the docs](https://www.apollographql.com/docs/apollo-server/features/data-sources/)! In this example server, we pass the `dataSources` key to the `ApolloServer` constructor, and return a `pokemonAPI` key:

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  dataSources: () => ({
    pokemonAPI: new PokemonAPI(),
  }),
})
```

## Resources

Building with GraphQL makes it incredibly easy for developers to build data-driven applications and use complex APIs, without having to be REST experts or even have any particular inclination towards backend development. Combined with Cloudflare Workers, it can be an incredibly powerful way to build lightning-fast, globally distributed API servers, without needing to worry about scaling your application.

If you're interested in contributing or providing feedback to the `workers-graphql-server` template, check out the project [on GitHub](https://github.com/signalnerve/workers-graphql-server)!

If you'd like to learn more about GraphQL, Apollo, or Cloudflare Workers, we've included a collection of good tutorials to get you started:

- [Learn GraphQL](https://graphql.org/learn/)
- [Apollo GraphQL tutorial](https://www.apollographql.com/docs/tutorial/introduction/)
- [Cloudflare Workers Quickstart](https://workers.cloudflare.com/docs/quickstart/)
