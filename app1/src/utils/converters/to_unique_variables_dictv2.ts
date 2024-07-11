import { variablesDict } from "../../entities/variablesDict";
import { variablesQueryResultV2 } from "./../../entities/variablesQueryResultV2"


export const toUniqueVariablesDictV2 = (query_result: variablesQueryResultV2) => {
    const variables: variablesDict = {
        departure_pass: Array<string>(),
        departure_station: Array<string>(),
        destination_pass: Array<string>(),
        destination_station: Array<string>(),
        train_number: Array<string>(),
        carrier: Array<string>()
    };
    Object.keys(variables).map((key) => {
        variables[key] = query_result[key].map((entery) => entery[key])
    })
    return variables;
}