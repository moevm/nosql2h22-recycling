import React, {useContext, useEffect, useState} from 'react';
import {Card, Table} from "react-bootstrap";
import {dataCurrentOrder} from "./CurrentOrder.content";
import {UserLogged} from "../../App";
import {TableData} from "../TableData/TableData";
import {columns} from "./CurrentOrder.content";
import {useTableData} from "./CurrentOrder.hooks";

export const CurrentOrder = () => {
    const [currentData, setData] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);

    const userLogged = useContext(UserLogged);

    const createRequest = (event: any) => {
        let currentRequest = currentData[parseInt(event.target.id)];
        fetch('http://localhost:8000/api/driver/finish', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({orderID:currentRequest._id})
        })
            .then(response => response.json())
            .then(content => {
                setData(content.materials);
                setTotal(content.countOrders);
            })
            .catch(err => console.error(err));
    }

    useEffect(
        () => {
            fetch('http://localhost:8000/api/driver/main', {
                    method:"POST",
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({login: localStorage.getItem("user"), page:page, perPage: perPage})
                }
            )
                .then(response => response.json())
                .then(content => {
                    setData(content.orders);
                    setTotal(content.countOrders);
                })
                .catch(err => console.error(err));
        },
        [page,perPage]
    );

    return (
        <Card>
            <Card.Body style={{margin: '1vh 0vh 0vh 0vh', width: "100vh"}}>
                <TableData
                    total={total}
                    setPage={setPage}
                    setPerPage={setPerPage}
                    page={page}
                    perPage={perPage}
                    tableCells={useTableData(currentData, createRequest)}
                    header={columns}
                />
            </Card.Body>
        </Card>
    )
}
