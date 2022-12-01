import React from "react";
import Container from "react-bootstrap/Container";
import { Hero, IHeroProps } from "../../shared/Hero";
import { TableData } from "../../shared/TableData";

export const columns = [
    {
        dataField: "updated-by",
        text: "Updated by",
        sort: true,
    },
    {
        dataField: "updated-at",
        text: "Updated at",
        sort: true,
    },
    {
        dataField: "transaction-date",
        text: "Transaction date",
    },
    {
        dataField: "status",
        text: "Status",
    },
];

export const data: any[] = [
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
    {
        "updated-by": "Daniil Mikulik",
        "updated-at": "13-10-2021",
        "transaction-date": "18-02-2020",
        status: "Delivered",
    },
];

export type IOrderPageProps = IHeroProps & { id: string, wasteType: string; amount: string; price: string; };

export const OrderPage = ({
    title, description, footer, id, wasteType, amount, price,
}: IOrderPageProps) => {
    return (
        <main>
            <Hero title={title} description={description} footer={footer} />
            <Container>
                <p>{`Order id: ${id}, Waste type: ${wasteType}, Amount: ${amount} kg, Price: ${price}$`}</p>
                <TableData tableCells={data} headers={columns} />
            </Container>
        </main>
    );
};
