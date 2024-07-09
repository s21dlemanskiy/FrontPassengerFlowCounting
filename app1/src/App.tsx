import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from "./utils/createApolloClient";
import { PassflowCounter } from './components/PassflowCounter/PassflowCounter';
// gql
function App() {
  const [client] = useState(createApolloClient("pass_Hasura"));
  return (
    <ApolloProvider client={client}>
       <div>
          <PassflowCounter/>
       </div>
    </ApolloProvider>
  )
}

export default App
