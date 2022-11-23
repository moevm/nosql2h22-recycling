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
}

export const TableData = ({tableCells, header}: TableDataProps  ) => {
    console.log(tableCells);
    return (
        <>
            <BootstrapTable
                hover
                striped
                bordered
                bootstrap4
                keyField="id"
                data={tableCells}
                columns={header}
                pagination={paginationFactory({ sizePerPageList: [ {
                        text: '5', value: 5
                    }, {
                        text: '7', value: 7
                    }, {
                        text: 'All', value: tableCells.length
                    } ]})}
            />
        </>
    );
};

