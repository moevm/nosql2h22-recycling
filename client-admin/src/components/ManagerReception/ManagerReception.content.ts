import {TableCellManagerReception} from "../TableData/TableData.types";

export const columns = [
    {
        dataField: "type",
        text: "Type of waste",
    },
    {
        dataField: "subtype",
        text: "Subtype",
    },
    {
        dataField: "amount",
        text: "Amount of waste",
    },
    {
        dataField: "occupancy",
        text: "Occupancy",
    },
    {
        dataField: "request",
        text: "Request",
    },
]

export const data: TableCellManagerReception[] = [
    {type: "Metal", subtype: 'qwaderty',amount: '43kg', occupancy:"0.43%", request: ''},
    {type: "Metal", subtype: 'qweasdrty',amount: '43kg', occupancy:"0.43%", request: ''},
    {type: "Pape", subtype: 'qwadseraty',amount: '43kg', occupancy:"0.43%", request: ''},
    {type: "Metal", subtype: 'asda',amount: '43kg', occupancy:"0.43%", request: ''},
    {type: "Metal", subtype: 'segr',amount: '43kg', occupancy:"0.43%", request: ''},
    {type: "Metal", subtype: 'asd',amount: '43kg', occupancy:"0.43%", request: ''},
    {type: "Metal", subtype: 'qwasderty',amount: '43kg', occupancy:"0.43%", request: ''},

]
