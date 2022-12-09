import React, {ReactNode} from 'react';
import {
    TableCellStorage,
    TableCellReceptions,
    TableCellCarrier,
    TableCellCurrentOrder,
    header,
    TableCellAvailableOrders
} from "./TableData.types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export type TableDataProps = {
    tableCells: Array<any> | ReactNode[] | Array<TableCellStorage> |
        Array<TableCellReceptions> |
        Array<TableCellCarrier> |
        Array<TableCellCurrentOrder> |
        Array<TableCellAvailableOrders>;
    header: header[];
    page: number;
    perPage: number;
    total: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TableData = ({tableCells, header, page, perPage, total, setPerPage, setPage,}: TableDataProps  ) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const handleTableChange = (type, { page, sizePerPage }) => {
        setTimeout(() => {
            setPage(page);
            setPerPage(sizePerPage);
        }, 10);
    };

    return (
        <div style = {{width:'195vh', margin:'0vh 0vh 0vh 1vh'}}>
            <BootstrapTable
                hover
                remote
                bootstrap4
                keyField="id"
                data={tableCells}
                columns={header}
                pagination={paginationFactory({ page, sizePerPage: perPage, totalSize: total })}
                onTableChange={handleTableChange}
            />
        </div>
    );
};
