import {TableCellReceptions} from "../TableData/TableData.types";

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
    {id: 12, reception: '13-10-2021', manager: "Vitalya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 13, reception: '13-10-2021', manager: "slon",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 14, reception: '13-10-2021', manager: "Sanya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 15, reception: '13-10-2021', manager: "Vitalya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },
    {id: 16, reception: '13-10-2021', manager: "Vitalya",paper: 'Metal',
        glass: 'Aluminium',plastic: '34kg',metal: 'Status', amount: "34kg", percentage: "434%" },

]
