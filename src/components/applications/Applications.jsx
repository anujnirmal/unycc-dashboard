import React from 'react'
import TableComp from "../table/TableComp";
import "./applications.css";

const Applications = () => {
    const [page, setPage] = React.useState("application");

    return (
        <div>
            <TableComp page={page}/>
        </div>
    )
}

export default Applications
