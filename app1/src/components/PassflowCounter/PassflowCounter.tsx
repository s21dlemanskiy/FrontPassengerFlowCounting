import React, { useEffect } from "react";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { message, Spin } from "antd";
import { SUM_PASSFLOW } from "../../query/sum_passflow";
import { sumPassflowQueryResult } from "../../entities/sumPassflowQueryResult";
import { useQuery } from "@apollo/client";

interface PassflowCounterProps extends React.HTMLAttributes<HTMLDivElement> {
    values: formSelectedVariables
}

export const PassflowCounter: React.FC<PassflowCounterProps> = ({values, ...props}) => {
    const variables = (({ dateselect, ...otherData }) => {
        // @ts-expect-error typescript think that dateselect can be less than 1 element and can be undefind but he can't due form logic
        return {
            start_date: dateselect[0].$d,
            end_date: dateselect[1].$d,
            // there i create include_all_ field for values that have no seelcted values (except data, it is requred)
            ...(Object.fromEntries(Object.entries(otherData).flatMap(([key, val]) => [
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

    return (
        <div {...props}>
            {contextHolder}
            <a id="passflow">{loading ? 
                        <Spin/>
                        : (data?.passflow_db_aggregate.aggregate.sum.passflow || " не найдено ").toString()} </a>
            <label htmlFor="passflow">Пассажиров</label>
        </div>
    )
}