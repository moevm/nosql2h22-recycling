import React from 'react';
import { Table, Pagination } from 'react-bootstrap';
import {TableCell} from "./TableData.types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export type TableDataProps = {
    tableCells: Array<TableCell>;
    header: header[];
}

// demonstration type, should be deleted
export type header = {
    dataField:string;
    text:string;
    sort?: boolean;
}

export const TableData = ({tableCells, header}: TableDataProps) => {
    return (
        <>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={tableCells}
                columns={header}
                pagination={paginationFactory({ sizePerPage: 5 })}
            />
        </>
    );
};
