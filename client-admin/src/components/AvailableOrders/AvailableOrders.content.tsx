import {TableCellAvailableOrders} from "../TableData/TableData.types";

export const columns = [
    {
        dataField: "orderID",
        text: "Order ID"
    },
    {
        dataField: "departure",
        text: "Point of Departure",
    },
    {
        dataField: "arrival",
        text: "Point of Arrival",
    },
    {
        dataField: "type",
        text: "Point of Departure",
    },
    {
        dataField: "subtype",
        text: "Point of Arrival",
    },
    {
        dataField: "amount",
        text: "Amount of waste",
    },
    {
        dataField: "action",
        text: "Action",
    }
]

export const dataAvailableOrders: TableCellAvailableOrders[] = [
    {departure: 'asdad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdsa"},
    {departure: 'asdad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdasda"},
    {departure: 'sffsdasdasdad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdsadsad"},
    {departure: '34dasddad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdsad"},
    {departure: 'asasdadad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdsad"},
    {departure: 'qwdad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: ""},
    {departure: 'jyjyjysdassdad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdasdasd"},
    {departure: 'qqwqdasdad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdsad"},
    {departure: 'zxzasdad', arrival: 'afa', type: 'Metal', subtype: 'Brass', amount: '123kg', action: "asdasdasd"},
]
