import { useQuery } from "@apollo/client"
import { TEST_QUERY } from "../query/test"
import React from "react"



export const Test: React.FC = () => {
    const { loading, error, data } = useQuery(TEST_QUERY)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    console.log(data)
    return (
        <>
        <a>done!</a>
        </>
    )
}