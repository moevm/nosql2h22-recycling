import {TableCellReceptions} from "../TableData/TableData.types";

export const header = [
    { label: "ID", key: "id" },
    { label: "Reception", key: "reception" },
    { label: "Manager", key: "manager" },
    { label: "Paper", key: "paper" },
    { label: "Glass", key: "glass" },
    { label: "Plastic", key: "plastic" },
    { label: "Metal", key: "metal" },
    { label: "Amount of waste", key: "amount" },
    { label: "Percentage", key: "percentage" }
]

export const columns = [
    {
        dataField: "id",
        text: "ID",
        sort: true
    },
    {
        dataField: "reception",
        text: "Reception",
    },
    {
        dataField: "manager",
        text: "Manager"
    },
    {
        dataField: "paper",
        text: "Paper",
    },
    {
        dataField: "glass",
        text: "Glass",
    },
    {
        dataField: "plastic",
        text: "Plastic",
    },
    {
        dataField: "metal",
        text: "Metal",
    },
    {
        dataField: "amount",
        text: "Amount of waste",
    },
    {
        dataField: "percentage",
        text: "Percentage"
    }
];

export const data: TableCellReceptions[] = [
    {id: 1, reception: 'qwerty', manager: "Vitalya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 12, reception: 'qwerty2', manager: "Vitalya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 13, reception: 'qwerty2', manager: "slon",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 14, reception: 'qwerty2', manager: "Sanya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 15, reception: 'asd', manager: "Vitalya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 16, reception: 'asdd', manager: "Vitalya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "324kg", percentage: "44%" },
    {id: 23, reception: 'asdd', manager: "Vitalya Los",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 136, reception: 'as2dd', manager: "Vitalya Zhop",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
]
