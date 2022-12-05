import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { Hero, IHeroProps } from "../../shared/Hero";
import { TableData } from "../../shared/TableData";
import { server } from "../../../config/axios";

export const columns = [
    {
        dataField: "date",
        text: "Updated at",
        sort: true,
    },
    {
        dataField: "status",
        text: "Status",
        sort: true,
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

export type IHistory = {
    status: string;
    date: string;
};

export const OrderPage = ({
    title, description, footer, id, wasteType, amount, price,
}: IOrderPageProps) => {
    const [history, setHistory] = useState<IHistory[]>([]);
    useEffect(() => {
        server.get(`/order?orderID=${id}`).then((res) => {
            setHistory(res.data.history);
        }).catch((err) => {
            console.error(err);
        });
    }, []);
    return (
        <main>
            <Hero title={title} description={description} footer={footer} />
            <Container>
                <p>{`Order id: ${id}, Waste type: ${wasteType}, Amount: ${amount} kg, Price: ${price}$`}</p>
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={history}
                    columns={columns}
                    pagination={paginationFactory({
                        sizePerPageList: [{
                            text: "5", value: 5,
                        }, {
                            text: "7", value: 7,
                        }, {
                            text: "10", value: 10,
                        }],
                    })}
                />
            </Container>
        </main>
    );
};
