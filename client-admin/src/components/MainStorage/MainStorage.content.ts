import {TableCell} from "../TableData/TableData.types";

export const columns = [
    {
        dataField: "id",
        text: "ID",
        sort: true
    },
    {
        dataField: "date",
        text: "Date",
        sort: true
    },
    {
        dataField: "type_of_waste",
        text: "Type of Waste"
    },
    {
        dataField: "subtype",
        text: "SubType",
    },
    {
        dataField: "among",
        text: "Among of waste",
        sort: true
    },
    {
        dataField: "status",
        text: "Status",
    }
];

export const data: TableCell[] = [
    {id: '1',date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '34kg',status: 'Status'},
    {id: '1214',date: '13-11-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '32kg',status: 'Status'},
    {id: '11',date: '12-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '14kg',status: 'Status'},
    {id: '124',date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '354kg',status: 'Status'},
    {id: '133',date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '324kg',status: 'Status'},
    {id: '8761',date: '03-10-2020',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '31kg',status: 'Status'},
]
