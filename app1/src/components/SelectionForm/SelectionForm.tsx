import React, { useEffect, useMemo } from "react";
import { ALL_VARIABLES } from "../../query/all_variable";
import { useQuery } from "@apollo/client";
import { ConfigProvider, DatePicker, Flex, Select } from "antd";
import { variablesQueryResult } from "../../entities/variablesQueryResult";
import { useSelectorOptions } from "../../hooks/useSelectorsOptions";
import { FormItemWraper } from "../../UI/FormItemWraper/FormItemWraper";
import dayjs from "dayjs";
import cls from "./SelectionForm.module.css";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import ruRU from 'antd/lib/locale/ru_RU';
import 'dayjs/locale/ru';


dayjs.locale('ru');
dayjs.extend(localizedFormat);

const { RangePicker } = DatePicker; 

interface SelectionFormProps extends React.HTMLAttributes<HTMLDivElement> {
    setLoading: (loading: boolean) => void,
    raiseError: (errorMassage: string, onClose?: () => void) => void
}


export const SelectionForm: React.FC<SelectionFormProps> = ({ raiseError, setLoading, ...props}) => {
    const { loading, error, data, refetch } = useQuery<variablesQueryResult>(ALL_VARIABLES)


    const {carriers, pass_departures, pass_destinations, train_departures, train_destinations, train_numbers, updateSelectorOptions} = useSelectorOptions();
    useMemo(() => {
        if (typeof data !== "undefined") {
            updateSelectorOptions(data);
        }
    }, [data])

    useEffect(() => {
        setLoading(loading)
    }, [loading])

    useEffect(() => {
        if (error && !loading){
            console.log(error.extraInfo)
            raiseError(error.message, refetch);
        }
    }, [error])


    return (
        <div {...props}>
                <Flex className={cls.flexContainer}>
                    <FormItemWraper label={"Cт. отправления поезда"} name={"train_departures"}>
                            <Select className={cls.multiSelect} maxTagCount={2} maxTagTextLength={6}  options={
                              train_departures.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Cт. отправления поезда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Ст. назанчения поезда"} name={"train_destinations"}>
                            <Select className={cls.multiSelect} maxTagCount={2} maxTagTextLength={6}  options={
                              train_destinations.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Ст. назанчения поезда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper  label={"Откуда"}  name={"pass_departures"}>
                            <Select className={cls.multiSelect} maxTagCount={2} maxTagTextLength={6}  options={
                              pass_departures.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Откуда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Куда"}  name={"pass_destinations"}>
                            <Select className={cls.multiSelect} maxTagCount={2} maxTagTextLength={6}  options={
                              pass_destinations.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Куда"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Перевозчик"} name={"selected_carriers"}>
                            <Select className={cls.multiSelect} maxTagCount={2} maxTagTextLength={6}  options={
                              carriers.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Перевозчик"} ></Select>
                    </FormItemWraper>
                    <FormItemWraper label={"Номер поезда"} name={"train_numbers"}>
                            <Select className={cls.multiSelect} maxTagCount={2} maxTagTextLength={6}  options={
                              train_numbers.map((option) => {return { value: option, label: option }})
                              }
                              showSearch={true}
                              mode="multiple"
                              placeholder={"Номер поезда"} ></Select>
                    </FormItemWraper>
                    <ConfigProvider locale={ruRU}>
                        {
                        typeof data !== "undefined" ? 
                        <FormItemWraper
                            initialValue={[
                                        dayjs(data.passflow_db_aggregate.aggregate.min.date, "YYYY-MM-DD"),
                                        dayjs(data.passflow_db_aggregate.aggregate.max.date, "YYYY-MM-DD")
                                    ]}
                            flex={2}
                            name={"dateselect"}
                            label={"Дата начала/окончания выборки"}
                            rules={[
                                {
                                required: true,
                                message: `Выберите дату выборки!`,
                                },
                            ]}>
                            <RangePicker 
                                className={cls.rangePicker}
                                minDate={dayjs(data.passflow_db_aggregate.aggregate.min.date, "YYYY-MM-DD")}
                                maxDate={dayjs(data.passflow_db_aggregate.aggregate.max.date, "YYYY-MM-DD")}
                                format={"YYYY-MM-DD"}
                                id={"dateselect"} 
                                placeholder={['Дата начала выборки', 'Дата окончания выборки']} />
                                
                        </FormItemWraper>
                        :
                        <FormItemWraper
                            flex={2}
                            label={"Дата начала/окончания выборки"}>
                            <RangePicker 
                                className={cls.rangePicker}
                                format={"YYYY-MM-DD"}
                                placeholder={['Дата начала выборки', 'Дата окончания выборки']} />
                                
                        </FormItemWraper>
                        }
                        
                    </ConfigProvider>
                </Flex>
        </div>
    )
}