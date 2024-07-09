import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export default function createApolloClient(HasuraAdminSecret: string) {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://literate-cheetah-36.hasura.app/v1/graphql',
      headers: {
        "x-hasura-admin-secret": HasuraAdminSecret
      }
    }),
    cache: new InMemoryCache(),
  });
 }