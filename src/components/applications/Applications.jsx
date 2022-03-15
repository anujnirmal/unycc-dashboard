import React from 'react'
import TableComp from "../table/TableComp";
import "./applications.css";

const Applications = ( props ) => {
    const [page, setPage] = React.useState("application");


    return (
        <div>
            <TableComp page={page} applicationReload={ props.applicationReload }/>
        </div>
    )
}

export default Applications
