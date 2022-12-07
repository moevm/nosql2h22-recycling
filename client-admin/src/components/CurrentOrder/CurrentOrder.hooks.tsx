import {Button} from "react-bootstrap";
import React, { useEffect, useMemo, useState} from "react";

export const useTableData = (data: Array<any>, show: any) => {
    return useMemo(() => {
        return data.map((elem,idx) => {
            return Object.fromEntries(Object.keys(elem).map((key) => {
                if (key !== "request") {
                    // @ts-ignore
                    return [key, elem[key]];
                }
                return [key, <>
                    <Button onClick={show} variant='success' id={idx.toString()}>Finish</Button>
                </>];
            }));
        });
    }, [data]);
}
