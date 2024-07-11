import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from "./utils/createApolloClient";
import { Passflow } from './components/Passflow/Passflow';
// gql
function App() {
  const [client] = useState(createApolloClient("pass_Hasura"));
  return (
    <ApolloProvider client={client}>
       <div>
          <Passflow/>
       </div>
    </ApolloProvider>
  )
}

export default App
