
export type formSelectedVariables = { 
    train_departures: string[],
    train_destinations: string[],
    pass_departures: string[],
    pass_destinations: string[],
    selected_carriers: string[],
    train_numbers: string[],
    dateselect: [
        {
            "$d": Date,
            "$D": number,
            "$M": number
            [kay: string]: unknown
        }
    ]
 }