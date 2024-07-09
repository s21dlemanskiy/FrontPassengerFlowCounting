

export type sumPassflowQueryResult = {
    passflow_db_aggregate: {
        aggregate: {
          sum: {
            passflow: number|null
          }
        }
      }
}