import React from 'react';
import { Table, Pagination } from 'react-bootstrap';
import {TableCell} from "./TableData.types";

export type TableDataProps = {
    tableCells: Array<Array<TableCell>>;
    header: string[];
}


export const TableData = ({tableCells, header}: TableDataProps) => {
    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                {header.map((cell) => (
                    <th>
                        {cell}
                    </th>
                ))}
                </thead>
                <tbody>
                    {tableCells.map((str) => (
                        <tr>
                            {str.map((cell) => (
                                <td>
                                    {cell.content}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
