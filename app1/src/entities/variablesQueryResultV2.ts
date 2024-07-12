

export interface variablesQueryResultV2 {
    departure_pass: {
        departure_pass: string;
    }[],
    departure_station: {
        departure_station: string;
    }[],
    destination_pass: {
        destination_pass: string;
    }[],
    destination_station: {
        destination_station: string;
    }[],
    train_number: {
        train_number: string;
    }[],
    carrier: {
        carrier: string;
    }[],
    passflow_db_aggregate: {
        aggregate: {
            min: {
                date: string
            },
            max: {
                date: string
            }
        }
    }
}


export interface variablesQueryResultV2WithoutDate {
    [key: string]: {[key: string] : string}[] 
    departure_pass: {
        departure_pass: string;
    }[],
    departure_station: {
        departure_station: string;
    }[],
    destination_pass: {
        destination_pass: string;
    }[],
    destination_station: {
        destination_station: string;
    }[],
    train_number: {
        train_number: string;
    }[],
    carrier: {
        carrier: string;
    }[]
}