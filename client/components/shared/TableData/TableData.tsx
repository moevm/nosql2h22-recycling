import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { pagination } from "./TableData.helpers";

export type ITableDataProps = {
    tableCells: Array<Array<any>>;
    headers: Array<ColumnDescription>;
    page: number;
    perPage: number;
    total: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
};

export const TableData = ({
    tableCells, headers, page, perPage, total, setPerPage, setPage,
}: ITableDataProps) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const handleTableChange = (type, { page, sizePerPage }) => {
        setTimeout(() => {
            setPage(page);
            setPerPage(sizePerPage);
        }, 500);
    };

    return (
        <BootstrapTable
            remote
            bootstrap4
            keyField="id"
            data={tableCells}
            columns={headers}
            pagination={paginationFactory({ page, sizePerPage: perPage, totalSize: total })}
            onTableChange={handleTableChange}
        />
    );
};
