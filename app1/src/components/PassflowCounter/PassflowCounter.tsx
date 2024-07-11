import React, { useState } from "react";
import { SelectionForm } from "../SelectionForm/SelectionForm";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { Passflow } from "./Passflow";
import { Button, Flex, Form } from "antd";

export const PassflowCounter: React.FC = () => {

    const [selectedValues, updateSelectedValues] = useState<formSelectedVariables|undefined>(undefined);

    const featchPassflow: (values: formSelectedVariables) => void = (values) => {
        updateSelectedValues(values)
    }
    
    console.log(selectedValues)
    return (
        <Form style={{width: "100%", alignContent:"center",}} onFinish={featchPassflow}>
            <SelectionForm style={{width: "100%",alignContent:"center", backgroundColor: "blue", borderRadius: "10px"}} />
            <br/>
            <Flex align="center">
                <Form.Item >
                    <Button style={{marginTop: "40px"}} type="primary" htmlType="submit">
                        Подсчитать пассажиропоток
                    </Button>
                </Form.Item>
                {
                    typeof selectedValues !== "undefined" ?
                    <Passflow values={selectedValues} /> :
                    <></>
                }
            </Flex>
        </Form>
    )
}