import { gql } from '@apollo/client';

export const SUM_PASSFLOW = gql`
query MyQuery($pass_departures: [String!], $train_departures: [String!], $pass_destinations: [String!], $train_destinations: [String!], $train_numbers: [String!], $selected_carriers: [String!], $start_date: date!, $end_date: date!) @cached {
    passflow_db_aggregate(where: {departure_pass: {_in: $pass_departures}, departure_station: {_in: $train_departures}, destination_pass: {_in: $pass_destinations}, destination_station: {_in: $train_destinations}, train_number: {_in: $train_numbers}, carrier: {_in: $selected_carriers}, date: {_gte: $start_date, _lte: $end_date}}) {
      aggregate {
        sum {
          passflow
        }
      }
    }
  }
  
`