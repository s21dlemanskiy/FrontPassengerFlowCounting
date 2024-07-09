import { variablesDict } from "../../entities/variablesDict";
import { variablesQueryResult } from "./../../entities/variablesQueryResult"


export const toUniqueVariablesDict = (query_result: variablesQueryResult) => {
    const variables: variablesDict = {
        departure_pass: Array<string>(),
        departure_station: Array<string>(),
        destination_pass: Array<string>(),
        destination_station: Array<string>(),
        train_number: Array<string>(),
        carrier: Array<string>()
    };
    const used_values = new Set();
    query_result.passflow_db.map((varset) => {
        for (const [key, value] of Object.entries(varset)) {
            if (!used_values.has(value)) {
                if (Object.prototype.hasOwnProperty.call(variables, key)){
                    used_values.add(value)
                    variables[key].push(value);
                }
            }
        }
    })
    return variables;
}