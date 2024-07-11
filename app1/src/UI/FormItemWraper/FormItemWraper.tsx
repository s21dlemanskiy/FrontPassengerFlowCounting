
import { Form } from "antd"
import React from "react"
import cls from "./FormItemWraper.module.css";

interface FormItemWraperProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    name: string;
    formId?: string | undefined;
}

export const FormItemWraper: React.FC<FormItemWraperProps> = ({ children, ...props}) => {
    if (typeof props.formId === "undefined" || props.formId === null) {
        props.formId = props.name;
    }
    console.warn(cls.customForm)
    return (
        <div {...props}>
            <div className={cls.labelWrap}>
                <label className={cls.formLabel} htmlFor={props.formId}>{props.label}</label>
            </div>
            <Form.Item
                id={props.formId}
                noStyle={true}
                >
                {children}
            </Form.Item>
        </div>
    )
}