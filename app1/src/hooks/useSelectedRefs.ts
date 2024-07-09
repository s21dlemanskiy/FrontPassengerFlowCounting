import { useRef } from "react"


export const useSelectedRefs = () => {
    const selected_carriers = useRef<string>();
    const selected_pass_departures = useRef<string>();
    const selected_pass_destinations = useRef<string>();
    const selected_train_departures = useRef<string>();
    const selected_train_destinations = useRef<string>();
    const selected_train_numbers = useRef<string>();
    return {selected_carriers, selected_pass_departures, selected_pass_destinations, selected_train_departures, selected_train_destinations, selected_train_numbers}
}