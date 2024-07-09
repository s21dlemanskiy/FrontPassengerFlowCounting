import { gql } from '@apollo/client';

export const TEST_QUERY = gql`
  query MyQuery {
    passflow_db(distinct_on: carrier) {
      carrier
    }
  }
  
`;