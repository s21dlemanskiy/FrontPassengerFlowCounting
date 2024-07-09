import { gql } from '@apollo/client';

export const ALL_VARIABLES = gql`
query MyQuery @cached {
    passflow_db {
      departure_pass
      departure_station
      destination_pass
      destination_station
      train_number
      carrier
    }
    passflow_db_aggregate {
        aggregate {
          min {
            date
          }
          max {
            date
          }
        }
      }
  }  
`