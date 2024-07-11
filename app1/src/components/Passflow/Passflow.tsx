import React, { useState } from "react";
import { SelectionForm } from "../SelectionForm/SelectionForm";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { PassflowCounter } from "../PassflowCounter/PassflowCounter";
import { Button, Form, message, Spin } from "antd";
import cls from "./Passflow.module.css";

export const Passflow: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [selectedValues, updateSelectedValues] = useState<formSelectedVariables|undefined>(undefined);

    const featchPassflow: (values: formSelectedVariables) => void = (values) => {
        updateSelectedValues(values)
    }

    const [messageApi, contextHolder] = message.useMessage();
    const raiseError = (massage: string, onClose?: () => void) => {
            messageApi.error({
                type: 'error',
                content: massage,
                duration: 10,
                onClose: onClose
            })
    };
    
    console.log(selectedValues)
    return (
        <Spin spinning={loading} tip="Loading..." size="large">
            {contextHolder}
            <Form className={cls.formRoot} onFinish={featchPassflow}>
                <h2 className={cls.myTitle}>Сервис по подсчету пассажиропотока</h2>
                <br/>
                <SelectionForm raiseError={raiseError} setLoading={setLoading} className={cls.selectingForm} />
                <br/>
                <div className={cls.myFlex}>
                    <Button className={cls.myButton} type="primary" htmlType="submit">
                        Подсчитать пассажиропоток
                    </Button>
                    {
                        typeof selectedValues !== "undefined" ?
                        <PassflowCounter raiseError={raiseError} className={cls.passflowCounter} values={selectedValues} /> :
                        <></>
                    }
                </div>
            </Form>
        </Spin>
    )
}