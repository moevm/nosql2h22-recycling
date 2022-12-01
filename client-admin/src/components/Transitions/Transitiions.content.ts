import {TableCellCarrier} from "../TableData/TableData.types";

export const columns = [
    {
        dataField: "id",
        text: "ID",
        sort: true
    },
    {
        dataField: "carrier",
        text: "Carrier",
    },
    {
        dataField: "reception",
        text: "Reception",
    },
    {
        dataField: "amount",
        text: "Amount of waste",
    },
];

export const data: TableCellCarrier[] = [
    {id: 1, carrier: 'qwerty', reception: "Dagestan",amount: '1143kg'},
    {id: 2, carrier: 'Tolyan', reception: "asd",amount: '43kg'},
    {id: 3, carrier: 'Michalych', reception: "asdas",amount: '43kg'},
    {id: 4, carrier: 'qwerty2', reception: "asd",amount: '43kg'},
    {id: 15, carrier: 'qwerty3', reception: "asd",amount: '43kg'},
    {id: 22, carrier: 'qwerty4', reception: "Tikhvin",amount: '43kg'},
    {id: 12, carrier: 'qwerty5', reception: "asdas",amount: '43kg'},
    {id: 13, carrier: 'qwerty6', reception: "Viasdastalya",amount: '43kg'},
    {id: 14, carrier: 'qwerty7', reception: "Viasdasalya",amount: '123kg'},
]
