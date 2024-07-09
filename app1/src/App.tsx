import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from "./utils/createApolloClient";
import { SelectionForm } from './components/SelectionForm/SelectionForm';
// gql
function App() {
  const [client] = useState(createApolloClient("pass_Hasura"));
  return (
    <ApolloProvider client={client}>
       <div>
          <SelectionForm/>
       </div>
    </ApolloProvider>
  )
}

export default App
