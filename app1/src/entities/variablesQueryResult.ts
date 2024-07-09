

export interface variablesQueryResult {
    passflow_db: {
        departure_pass: string,
        departure_station: string,
        destination_pass: string,
        destination_station: string,
        train_number: string,
        carrier: string
    }[],
    passflow_db_aggregate: {
        aggregate: {
          min: {
            date: Date
          },
          max: {
            date: Date
          }
        }
      }
}