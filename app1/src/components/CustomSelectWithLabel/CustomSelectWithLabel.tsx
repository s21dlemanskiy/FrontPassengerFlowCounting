import { Form, Select } from "antd"
import React from "react"
import cls from './CustomSelectWithLabelProps.module.css';

interface CustomSelectWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    label_text: string;
    options: string[];
    callback: (value: string) => void;
}

export const CustomSelectWithLabel: React.FC<CustomSelectWithLabelProps> = ({id, label_text, options, callback, ...props}) => {

    return (
        <div {...{className: cls.flexcomponent, ...props}}>
            <Form.Item
                layout={"vertical"}
                name={id}
                label={label_text}
                rules={[
                    { required: true, message: `Выберите ${label_text}!`, type: 'array'},
                ]}
                >
                <Select maxTagCount={2} maxTagTextLength={6}  options={
                    options.map((option) => {return { value: option, label: option }})
                    }
                    onChange={callback}
                    showSearch={true}
                    mode="multiple"
                    placeholder={label_text} ></Select>
            </Form.Item>
        </div>
    )
}