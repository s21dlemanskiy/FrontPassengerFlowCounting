import { toUniqueVariablesDict } from "../utils/converters/to_unique_variables_dict";
import { variablesDict } from "../entities/variablesDict";
import { useState } from "react";
import { variablesQueryResult } from "../entities/variablesQueryResult";


export const useSelectorOptions = () => {
    const [carriers, updateCarriers] = useState<string[]>([])
    const [pass_departures, updatePassDepartures] = useState<string[]>([])
    const [pass_destinations, updatePassDestinations] = useState<string[]>([])
    const [train_departures, updateTrainDepartures] = useState<string[]>([])
    const [train_destinations, updateTrainDestinations] = useState<string[]>([])
    const [train_numbers, updateTrainNumber] = useState<string[]>([])

    const updateSelectorOptions: (data: variablesQueryResult) => void = (data: variablesQueryResult) => {
        const vars: variablesDict = toUniqueVariablesDict(data);
        updateCarriers(vars.carrier)
        updatePassDepartures(vars.departure_pass)
        updateTrainDepartures(vars.departure_station)
        updatePassDestinations(vars.destination_pass)
        updateTrainDestinations(vars.destination_station)
        updateTrainNumber(vars.train_number)
    }


    return {carriers, pass_departures, pass_destinations, train_departures, train_destinations, train_numbers, updateSelectorOptions}
}