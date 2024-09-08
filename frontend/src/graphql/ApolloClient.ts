import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Apollo Client configuration
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql', // Replace with your actual GraphQL server URL
  }),
  cache: new InMemoryCache(),
});

export default client;
