import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client'

import { onError } from '@apollo/client/link/error'

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql'

const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // GitHub Personal Access Token
  },
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Handle GraphQL-specific errors (e.g., validation, resolver errors)
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  // Handle network-level errors (e.g., connection issues)
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const link = ApolloLink.from([errorLink, httpLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
