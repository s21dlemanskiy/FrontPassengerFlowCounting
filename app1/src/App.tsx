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
          <h2>Сервис по подсчету пассажиропотока</h2>
          <Passflow/>
       </div>
    </ApolloProvider>
  )
}

export default App
