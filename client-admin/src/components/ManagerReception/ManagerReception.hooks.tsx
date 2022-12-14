import {TableCellManagerReception} from "../TableData/TableData.types";
import {Button} from "react-bootstrap";
import React, { useEffect, useMemo, useState} from "react";

export const useTableData = (data: Array<TableCellManagerReception>, show: any) => {
    return useMemo(() => {
        return data.map((elem,idx) => {
            return Object.fromEntries(Object.keys(elem).map((key) => {
                if (key !== "request") {
                    // @ts-ignore
                    return [key, elem[key]];
                }
                return [key, <>
                    <Button onClick={show} variant='success' id={idx.toString()}>Create request</Button>
                </>];
            }));
        });
    }, [data]);
}

export default function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
}
