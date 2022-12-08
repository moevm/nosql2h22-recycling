import {TableCellStorage} from "../TableData/TableData.types";

export const header = [
    { label: "ID", key: "ID" },
    { label: "Date", key: "Date" },
    { label: "Type", key: "Type" },
    { label: "SubType", key: "SubType" },
    { label: "Amount of waste", key: "Amount" },
    { label: "Status", key: "Status" },
]

export const columns = [
    {
        dataField: "ID",
        text: "ID",
        sort: true
    },
    {
        dataField: "Date",
        text: "Date",
        sort: true
    },
    {
        dataField: "User",
        text: "User",
    },
    {
        dataField: "Driver",
        text: "Driver",
    },
    {
        dataField: "Type",
        text: "Type of Waste"
    },
    {
        dataField: "SubType",
        text: "SubType",
    },
    {
        dataField: "Amount",
        text: "Amount of waste",
        sort: true
    },
    {
        dataField: "Status",
        text: "Status",
    }
];

export const data: TableCellStorage[] = [
    {id: 1,date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '34kg',status: 'Status'},
    {id: 45,date: '13-11-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '32kg',status: 'Status'},
    {id: 111,date: '12-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '14kg',status: 'Status'},
    {id: 124,date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '354kg',status: 'Status'},
    {id: 22,date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '324kg',status: 'Status'},
    {id: 158,date: '03-10-2020',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '31kg',status: 'Status'},
    {id: 11,date: '13-11-2021',type_of_waste: 'Plastic',
        subtype: 'Aluminium',among: '324kg',status: 'Status'},
    {id: 12,date: '03-14-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '31kg',status: 'Status'},
    {id: 13,date: '19-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '324kg',status: 'Status'},
    {id: 3736,date: '12-10-2020',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '31kg',status: 'Status'},
]
