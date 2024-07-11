import { Select } from "antd"
import React from "react"

interface CustomSelectProps {
    placeholder: string;
    options: string[];
    callback: (value: string) => void | undefined;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({placeholder, options, callback}) => {

    return (
        <Select maxTagCount={2} maxTagTextLength={6}  options={
            options.map((option) => {return { value: option, label: option }})
            }
            onChange={callback}
            showSearch={true}
            mode="multiple"
            placeholder={placeholder} ></Select>
    )
}