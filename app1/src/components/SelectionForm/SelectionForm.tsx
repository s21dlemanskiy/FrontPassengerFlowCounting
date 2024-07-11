import React, { useEffect, useMemo } from "react";
import { ALL_VARIABLES } from "../../query/all_variable";
import { useQuery } from "@apollo/client";
import { Button, DatePicker, Flex, Form, message, Select, Spin } from "antd";
import { variablesQueryResult } from "../../entities/variablesQueryResult";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { useSelectorOptions } from "../../hooks/useSelectorsOptions";
// import { CustomSelect } from "../../UI/CustomSelect/CustomSelect";
import { FormItemWraper } from "../../UI/FormItemWraper/FormItemWraper";
import dayjs from "dayjs";
import cls from "./SelectionForm.module.css";

const { RangePicker } = DatePicker; 



export const SelectionForm: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({...props}) => {
    const { loading, error, data } = useQuery<variablesQueryResult>(ALL_VARIABLES)


    const {carriers, pass_departures, pass_destinations, train_departures, train_destinations, train_numbers, updateSelectorOptions} = useSelectorOptions();
    useMemo(() => {
        if (typeof data === "undefined") {
            return;
        }
        updateSelectorOptions(data)
    }, [data])


    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        if (error) {
            messageApi.error({
          type: 'error',
          content: error.message,
            })
        }
    }, [error]);


    // const SELECTS_CONFIG = [{
    //     options:train_departures,
    //     label: "Cт. отправления поезда",
    //     name:"train_departures" 
    // },
    // {
    //     options:train_destinations,
    //     label: "Ст. назанчения поезда",
    //     name:"train_destinations" 
    // },
    // {
    //     options:pass_departures,
    //     label: "Откуда",
    //     name:"pass_departures" 
    // },
    // {
    //     options:pass_destinations,
    //     label: "Куда",
    //     name:"pass_destinations" 
    // },
    // {
    //     options:carriers,
    //     label: "Перевозчик",
    //     name:"selected_carriers" 
    // },
    // {
    //     options:train_numbers,
    //     label: "Номер поезда",
    //     name:"train_numbers" 
    // }]
    return (
        <Spin spinning={loading} tip="Loading" size="large">
        {contextHolder}
            <div {...props}>
                <Flex className={cls.flex}>
                    {/* { SELECTS_CONFIG.map(({options, label, name}, index) => 
                            <FormItemWraper key={index} label={label} className={cls.multiSelect} name={name}>
                                <CustomSelect placeholder={label} options={options} callback={(value) => console.log(value)} />
                            </FormItemWraper>
                        )} */}
                    <FormItemWraper label={"Cт. отправления поезда"} className={cls.multiSelect} name={"train_departures"}>
                            <Select maxTagCount={2} maxTagTextLength={6}  options={
                              train_departures.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Cт. отправления поезда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Ст. назанчения поезда"} className={cls.multiSelect} name={"train_destinations"}>
                            <Select maxTagCount={2} maxTagTextLength={6}  options={
                              train_destinations.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Ст. назанчения поезда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Откуда"} className={cls.multiSelect} name={"pass_departures"}>
                            <Select maxTagCount={2} maxTagTextLength={6}  options={
                              pass_departures.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Откуда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Куда"} className={cls.multiSelect} name={"pass_destinations"}>
                            <Select maxTagCount={2} maxTagTextLength={6}  options={
                              pass_destinations.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Куда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Перевозчик"} className={cls.multiSelect} name={"selected_carriers"}>
                            <Select maxTagCount={2} maxTagTextLength={6}  options={
                              carriers.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Перевозчик"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Номер поезда"} className={cls.multiSelect} name={"train_numbers"}>
                            <Select maxTagCount={2} maxTagTextLength={6}  options={
                              train_numbers.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Номер поезда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper
                        className={cls.rangePicker}
                        name={"dateselect"}
                        label={"Дата начала/окончания выборки"}
                        rules={[
                            {
                            required: true,
                            message: `Выберите дату выборки!`,
                            },
                        ]}>
                        <RangePicker 
                            {...(typeof data !== "undefined" ?
                                {
                                    minDate: dayjs(data.passflow_db_aggregate.aggregate.min.date, "YYYY-MM-DD"),
                                    maxDate: dayjs(data.passflow_db_aggregate.aggregate.max.date, "YYYY-MM-DD")
                                } : {})
                            }
                            format={"YYYY-MM-DD"}
                            id={"dateselect"} 
                            placeholder={['Дата начала выборки', 'Дата окончания выборки']} />
                    </FormItemWraper>
                </Flex>
            </div>
        </Spin>
    )
}