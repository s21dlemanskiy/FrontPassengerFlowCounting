import { gql } from '@apollo/client';

export const SUM_PASSFLOW = gql`
query MyQuery($pass_departures: [String!],
    $train_departures: [String!],
    $pass_destinations: [String!],
    $train_destinations: [String!],
    $train_numbers: [String!],
    $selected_carriers: [String!],
    $include_all_pass_departures: Boolean!,
    $include_all_train_departures: Boolean!,
    $include_all_pass_destinations: Boolean!,
    $include_all_train_destinations: Boolean!,
    $include_all_train_numbers: Boolean!,
    $include_all_selected_carriers: Boolean!,
    $start_date: date!,
    $end_date: date!) {
    passflow_db_aggregate(where: {
        _and: [
        {_or: [
            {_not: {passflow: {_is_null: $include_all_pass_departures}}},
            {departure_pass: {_in: $pass_departures}}
        ]},
        {_or: [
            {_not: {passflow: {_is_null: $include_all_train_departures}}},
            {departure_station: {_in: $train_departures}}
        ]},
        {_or: [
            {_not: {passflow: {_is_null: $include_all_pass_destinations}}},
            {destination_pass: {_in: $pass_destinations}}
        ]},
        {_or: [
            {_not: {passflow: {_is_null: $include_all_train_destinations}}},
            {destination_station: {_in: $train_destinations}}
        ]},
        {_or: [
            {_not: {passflow: {_is_null: $include_all_train_numbers}}},
            {train_number: {_in: $train_numbers}}
        ]},
        {_or: [
            {_not: {passflow: {_is_null: $include_all_selected_carriers}}},
            {carrier: {_in: $selected_carriers}}
        ]},
        {date: {_gte: $start_date, _lte: $end_date}}
        ]}) {
    aggregate {
            sum {
                    passflow
                }
            }
        }
    }
  
`