import {TableCellManagerReception} from "../TableData/TableData.types";
import {Button, Container, Row, Col} from "react-bootstrap";
import React, {Dispatch, SetStateAction, useMemo} from "react";

export const useTableData = (data: Array<TableCellManagerReception>, show: Dispatch<SetStateAction<boolean>>) => {

    return useMemo(() => {
        return data.map((elem,idx) => {
            return Object.fromEntries(Object.keys(elem).map((key) => {
                if (key !== "request") {
                    // @ts-ignore
                    return [key, elem[key]];
                }
                return [key, <>
                    <Button onClick={() => {
                        show(true);
                    }} variant='success' id={`yes-${idx}`}>Create request</Button>
                </>];
            }));
        });
    }, [data]);
}
