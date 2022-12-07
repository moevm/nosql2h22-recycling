import {TableCellCurrentOrder} from "../TableData/TableData.types";

export const columns = [
    {
        dataField: "_id",
        text: "Request ID",
    },
    {
        dataField: "Amount",
        text: "Amount",
    },
    {
        dataField: "PointOfArrival",
        text: "Point Of Arrival",
    },
    {
        dataField: "PointOfDeparture",
        text: "Point Of Departure",
    },
    {
        dataField: "TypeOfWaste",
        text: "Type Of Waste",
    },
    {
        dataField: "Subtype",
        text: "Subtype",
    },
    {
        dataField: "request",
        text: "Finish request",
    },
]

export const dataCurrentOrder: TableCellCurrentOrder[] = [
    {parameter: 'Driver', value: "Ryan Gosling"},
    {parameter: 'Point of Departure', value: "Derbent"},
    {parameter: 'Point of Arrival', value: "Tam"},
    {parameter: 'Type of waste', value: "Metal"},
    {parameter: 'Subtype', value: "Aluminium"},
    {parameter: 'Amount', value: "434kg"},
]

