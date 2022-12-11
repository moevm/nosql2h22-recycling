import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Modal, Table} from "react-bootstrap";
import {UserLogged} from "../../App";
import {TableData} from "../TableData/TableData";
import {columns} from "./CurrentOrder.content";
import {useTableData} from "./CurrentOrder.hooks";

export const CurrentOrder = () => {
    const [currentData, setData] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [show, setShow] = useState<boolean>(false);

    const userLogged = useContext(UserLogged);

    const createRequest = (event: any) => {
        setShow(true);
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

    const requestForData = () =>{
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
    }

    useEffect(
        () => {
            requestForData();
        },
        [page,perPage]
    );

    return (
        <>
            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Information alert</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Request has finished.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=>{
                        setShow(false);
                        requestForData();
                    }}
                            variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
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
        </>
    )
}
