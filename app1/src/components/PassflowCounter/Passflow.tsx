import React, { useState } from "react";
import { formSelectedVariables } from "../../entities/formSelectedVariables";
import { Spin } from "antd";
import { SUM_PASSFLOW } from "../../query/sum_passflow";
import { sumPassflowQueryResult } from "../../entities/sumPassflowQueryResult";
import { useQuery } from "@apollo/client";

interface PassflowProps extends React.HTMLAttributes<HTMLDivElement> {
    values: formSelectedVariables
}

export const Passflow: React.FC<PassflowProps> = ({values, ...props}) => {
    const variables = (({ dateselect, ...o }) => {return {start_date: dateselect[0].$d, end_date: dateselect[1].$d, ...o}})(values);
    
    const { loading, error, data } = useQuery<sumPassflowQueryResult>(SUM_PASSFLOW, {variables: variables});
    
    if (loading) return <Spin/>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(data);

    return (
        <div {...props}>
            <a>Сумарный пасажиропоток за отведеный период:{(data?.passflow_db_aggregate.aggregate.sum.passflow || " null ").toString()} </a>
        </div>
    )
}