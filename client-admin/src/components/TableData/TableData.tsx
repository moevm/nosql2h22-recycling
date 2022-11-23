import React from 'react';
import {TableCellStorage, TableCellReceptions, TableCellCarrier} from "./TableData.types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export type TableDataProps = {
    tableCells: Array<TableCellStorage> | Array<TableCellReceptions> | Array<TableCellCarrier>;
    header: header[];
}

// demonstration type, should be deleted
export type header = {
    dataField:string;
    text:string;
    sort?: boolean;
}

export const TableData = ({tableCells, header}: TableDataProps  ) => {
    return (
        <>
            <BootstrapTable
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
