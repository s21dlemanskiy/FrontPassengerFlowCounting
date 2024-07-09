import React, { useState } from "react";
import { SelectionForm } from "../SelectionForm/SelectionForm";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { Passflow } from "./Passflow";

export const PassflowCounter: React.FC = () => {

    const [selectedValues, updateSelectedValues] = useState<formSelectedVariables|undefined>(undefined);

    const featchPassflow: (values: formSelectedVariables) => void = (values) => {
        updateSelectedValues(values)
    }
    console.log(selectedValues)
    return (
        <>
            <SelectionForm onFinishFunc={featchPassflow}/>
            {
                typeof selectedValues !== "undefined" ?
                <Passflow values={selectedValues} /> :
                <></>
            }
        </>
    )
}