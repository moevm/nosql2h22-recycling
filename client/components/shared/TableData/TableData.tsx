import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { pagination } from "./TableData.helpers";

export type ITableDataProps = {
    tableCells: Array<Array<any>>;
    headers: Array<ColumnDescription>;
};

export const TableData = ({ tableCells, headers }: ITableDataProps) => {
    return (
        <BootstrapTable
            bootstrap4
            keyField="id"
            data={tableCells}
            columns={headers}
            pagination={pagination}
        />
    );
};
