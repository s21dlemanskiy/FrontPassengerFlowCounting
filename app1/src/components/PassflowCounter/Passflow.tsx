import React, { useEffect } from "react";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { message, Spin } from "antd";
import { SUM_PASSFLOW } from "../../query/sum_passflow";
import { sumPassflowQueryResult } from "../../entities/sumPassflowQueryResult";
import { useQuery } from "@apollo/client";

interface PassflowProps extends React.HTMLAttributes<HTMLDivElement> {
    values: formSelectedVariables
}
// Object.fromEntries(Object.entries(o).filter((key, val) => typeof val !== "undefined" && val.length > 0))

export const Passflow: React.FC<PassflowProps> = ({values, ...props}) => {
    const variables = (({ dateselect, ...o }) => {
        // @ts-expect-error typescript think that dateselect can be less than 1 element and can be undefind but he can't due form logic
        return {
            start_date: dateselect[0].$d,
            end_date: dateselect[1].$d,
            ...(Object.fromEntries(Object.entries(o).flatMap(([key, val]) => [
                    [key, typeof val !== "undefined" ? val : []],
                    [`include_all_${key}`, typeof val === "undefined" || val.length == 0 ]
                ])))
        }
    })(values);
    
    const { loading, error, data } = useQuery<sumPassflowQueryResult>(SUM_PASSFLOW, {variables: variables});
    
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (error) {
            messageApi.error({
          type: 'error',
          content: error.message,
            })
        }
    }, [error]);

    console.log(data);

    return (
        <div {...props}>
            {contextHolder}
            <a>Сумарный пасажиропоток за отведеный период:{loading ? <Spin/>:(data?.passflow_db_aggregate.aggregate.sum.passflow || " Не найдено ").toString()} </a>
        </div>
    )
}