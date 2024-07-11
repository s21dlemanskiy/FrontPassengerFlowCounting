import { gql } from '@apollo/client';

export const ALL_VARIABLES = gql`
query MyQuery @cached {
    departure_pass: passflow_db(distinct_on: departure_pass) {
        departure_pass
      }
      departure_station: passflow_db(distinct_on: departure_station) {
        departure_station
    }
    destination_pass: passflow_db(distinct_on: destination_pass) {
        destination_pass
        }
    destination_station: passflow_db(distinct_on: destination_station) {
        destination_station
    }
    train_number: passflow_db(distinct_on: train_number) {
        train_number
    }
    carrier: passflow_db(distinct_on: carrier) {
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