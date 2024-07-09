import { toUniqueVariablesDict } from "../utils/converters/to_unique_variables_dict";
import { variablesDict } from "../entities/variablesDict";
import { useState } from "react";
import { variablesQueryResult } from "../entities/variablesQueryResult";

const compareArrays = <T>(a: T[], b: T[]) => 
    a.length === b.length && a.every((element, index) => element === b[index]);

export const useSelectorOptions = () => {
    const [carriers, updateCarriers] = useState<string[]>()
    const [pass_departures, updatePassDepartures] = useState<string[]>()
    const [pass_destinations, updatePassDestinations] = useState<string[]>()
    const [train_departures, updateTrainDepartures] = useState<string[]>()
    const [train_destinations, updateTrainDestinations] = useState<string[]>()
    const [train_numbers, updateTrainNumber] = useState<string[]>()

    const updateSelectorOptions: (data: variablesQueryResult) => void = (data: variablesQueryResult) => {
        const vars: variablesDict = toUniqueVariablesDict(data);
        if (typeof carriers === "undefined" || !compareArrays(carriers, vars.carrier) ){
            updateCarriers(vars.carrier)
        }
        if (typeof pass_departures === "undefined" || !compareArrays(pass_departures, vars.departure_pass) ){
            updatePassDepartures(vars.departure_pass)
        }
        if (typeof train_departures === "undefined" || !compareArrays(train_departures, vars.departure_station) ){
            updateTrainDepartures(vars.departure_station)
        }
        if (typeof pass_destinations === "undefined" || !compareArrays(pass_destinations, vars.destination_pass) ){
            updatePassDestinations(vars.destination_pass)
        }
        if (typeof train_destinations === "undefined" || !compareArrays(train_destinations, vars.destination_station) ){
            updateTrainDestinations(vars.destination_station)
        }
        if (typeof train_numbers === "undefined" || !compareArrays(train_numbers, vars.train_number) ){
            updateTrainNumber(vars.train_number)
        }
    }


    return {carriers, pass_departures, pass_destinations, train_departures, train_destinations, train_numbers, updateSelectorOptions}
}