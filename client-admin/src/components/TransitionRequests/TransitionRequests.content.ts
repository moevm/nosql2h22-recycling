import {TableRequests} from '../TableData/TableData.types'

export const columns = [
    {
        dataField: "req_id",
        text: "RequestID",
        sort: true
    },
    {
        dataField: "date",
        text: "Date",
        sort: true
    },
    {
        dataField: "user",
        text: "User",
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
        text: "Amount of waste",
        sort: true
    },
    {
        dataField: "status",
        text: "Status",
    }
];

export const data: TableRequests[] = [
    {req_id: 12,date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '34kg',status: 'Status'},
    {req_id: 45,date: '13-11-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '32kg',status: 'Status'},
    {req_id: 111,date: '12-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '14kg',status: 'Status'},
    {req_id: 124,date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '354kg',status: 'Status'},
    {req_id: 22,date: '13-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '324kg',status: 'Status'},
    {req_id: 158,date: '03-10-2020',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '31kg',status: 'Status'},
    {req_id: 11,date: '13-11-2021',type_of_waste: 'Plastic',
        subtype: 'Aluminium',among: '324kg',status: 'Status'},
    {req_id: 12,date: '03-14-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '31kg',status: 'Status'},
    {req_id: 13,date: '19-10-2021',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '324kg',status: 'Status'},
    {req_id: 3736,date: '12-10-2020',type_of_waste: 'Metal',
        subtype: 'Aluminium',among: '31kg',status: 'Status'},
]
