
import { Form, FormItemProps } from "antd"
import React from "react"
import "./FormItemWraper.css";

export const FormItemWraper: React.FC<FormItemProps> = ({ children, ...props}) => {
    return (
        <Form.Item
            className="my-form"
            layout={"vertical"}
            {...props}
            >
            {children}
        </Form.Item>
    )
}