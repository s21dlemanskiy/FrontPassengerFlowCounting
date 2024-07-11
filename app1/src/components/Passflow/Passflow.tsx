import React, { useState } from "react";
import { SelectionForm } from "../SelectionForm/SelectionForm";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { PassflowCounter } from "../PassflowCounter/PassflowCounter";
import { Button, Flex, Form } from "antd";

export const Passflow: React.FC = () => {

    const [selectedValues, updateSelectedValues] = useState<formSelectedVariables|undefined>(undefined);

    const featchPassflow: (values: formSelectedVariables) => void = (values) => {
        updateSelectedValues(values)
    }
    
    console.log(selectedValues)
    return (
        <Form onFinish={featchPassflow}>
            <SelectionForm />
            <br/>
            <Flex align="center">
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Подсчитать пассажиропоток
                    </Button>
                </Form.Item>
                {
                    typeof selectedValues !== "undefined" ?
                    <PassflowCounter values={selectedValues} /> :
                    <></>
                }
            </Flex>
        </Form>
    )
}