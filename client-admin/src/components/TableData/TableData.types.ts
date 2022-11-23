import {ReactNode} from "react";

export type header = {
    dataField:string;
    text:string;
    sort?: boolean;
}

export type TableCellStorage = {
    id: number;
    date: string;
    type_of_waste: string;
    subtype: string;
    among: string;
    status: string;
}

export type TableCellReceptions = {
    id: number,
    reception: string,
    manager: string,
    paper: string,
    glass: string,
    plastic: string,
    metal: string,
    amount: string,
    percentage: string,
}

export type TableCellCarrier = {
    id: number,
    carrier: string,
    reception: string,
    amount: string,
}

export type TableCellCurrentOrder = {
    parameter: string,
    value: string,
}

export type TableCellAvailableOrders = {
    departure:string,
    arrival:string,
    type:string,
    subtype:string,
    amount:string,
    action: string,
}


export type TableCellManagerReception = {
    type:string,
    subtype:string,
    amount:string,
    occupancy: string,
    request: string,
}


