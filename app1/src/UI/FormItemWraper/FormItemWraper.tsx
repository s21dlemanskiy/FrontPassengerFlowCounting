
import { Form } from "antd"
import React from "react"
import cls from "./FormItemWraper.module.css";
import { FormItemProps } from "antd/lib";

interface FormItemWraperProps extends FormItemProps {
    label: string;
    formId?: string | undefined;
    flex?: number;
}

export const FormItemWraper: React.FC<FormItemWraperProps> = ({ flex, children, formId, label, ...props}) => {
    if (typeof formId === "undefined" || formId === null) {
        formId = props.name;
    }
    console.warn(cls.formWrap)
    return (
        <div className={cls.formWrap} style={{flex}}>
            <div className={cls.labelWrap}>
                <label className={cls.formLabel} htmlFor={formId}>{label}</label>
            </div>
            <Form.Item
                id={formId}
                {...props}
                noStyle={true}
                >
                {children}
            </Form.Item>
        </div>
    )
}