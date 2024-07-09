import React, { useMemo } from "react";
import { ALL_VARIABLES } from "../../query/all_variable";
import { useQuery } from "@apollo/client";
import { Button, DatePicker, Flex, Form, Spin } from "antd";
import { variablesQueryResult } from "../../entities/variablesQueryResult";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { useSelectorOptions } from "../../hooks/useSelectorsOptions";
import { CustomSelectWithLabel } from "../CustomSelectWithLabel/CustomSelectWithLabel";
import { useSelectedRefs } from "../../hooks/useSelectedRefs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker; 

interface SelectionFormProps extends React.HTMLAttributes<HTMLDivElement> {
    callback: (values: formSelectedVariables) => void;
}

export const SelectionForm: React.FC<SelectionFormProps> = ({callback, ...props}) => {
    const { loading, error, data } = useQuery<variablesQueryResult>(ALL_VARIABLES)
    const {carriers, pass_departures, pass_destinations, train_departures, train_destinations, train_numbers, updateSelectorOptions} = useSelectorOptions();
    const {selected_carriers, selected_pass_departures, selected_pass_destinations, selected_train_departures, selected_train_destinations, selected_train_numbers} = useSelectedRefs()
    useMemo(() => {
        if (typeof data === "undefined") {
            return;
        }
        updateSelectorOptions(data)
    }, [data])
    if (loading) return <Spin/>;
    if (error) return <p>Error : {error.message}</p>;
    return (
    <div {...props}>
        <Form layout={"vertical"} style={{height: "100%"}} onFinish={callback}>
            <Flex justify={'space-around'} align={"center"}>
                <CustomSelectWithLabel 
                    id="train_departures" 
                    options={typeof train_departures === "undefined" ? [] : train_departures} 
                    label_text="Cт. отправления поезда" 
                    callback={(value) => selected_train_departures.current = value}/>
                <CustomSelectWithLabel 
                    id="train_destinations" 
                    options={train_destinations as string[]}
                    label_text="Ст. назанчения поезда" 
                    callback={(value) => selected_train_destinations.current = value}/>
                <CustomSelectWithLabel 
                    id="pass_departures" 
                    options={pass_departures as string[]}
                    label_text="Откуда" 
                    callback={(value) => selected_pass_departures.current = value}/>
                <CustomSelectWithLabel 
                    id="pass_destinations" 
                    options={pass_destinations as string[]}
                    label_text="Куда" 
                    callback={(value) => selected_pass_destinations.current = value}/>
                <CustomSelectWithLabel 
                    id="selected_carriers" 
                    options={carriers as string[]}
                    label_text="Перевозчик" 
                    callback={(value) => selected_carriers.current = value}/>
                <CustomSelectWithLabel 
                    id="train_numbers" 
                    options={train_numbers as string[]}
                    label_text="Номер поезда" 
                    callback={(value) => selected_train_numbers.current = value}/>
                <Form.Item
                    layout={"vertical"}
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
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Подсчитать пассажиропоток
                </Button>
            </Flex>
        </Form>
    </div>
    )
}