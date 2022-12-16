import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Modal, Row, Col, Form, Container} from "react-bootstrap";
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
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [departure, setDeparture] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [subType, setSubType] = useState<string>("");

    const [lowerAmount, setLowerAmount] = useState<string>("");
    const [upperAmount, setUpperAmount] = useState<string>("");

    const [startDate,setStartDate] = useState<string>("");
    const [finishDate,setFinishDate] = useState<string>("");

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
                body: JSON.stringify({
                    filters:{
                        amount:{
                            from: lowerAmount,
                            to: upperAmount
                        },
                        date:{
                            from: startDate,
                            to: finishDate
                        },
                        pointOfDeparture: departure,
                        type: type,
                        subType: subType
                    },
                    login: localStorage.getItem("user"),
                    page:page,
                    perPage: perPage})
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
                <Card.Body style={{margin: '1vh 0vh 0vh 0vh', width: "150vh"}}>
                    <>
                        <label>Point of Departure:</label>
                        <input
                            type='text'
                            min={0}
                            style={{margin: '0vh 1vh 0vh 2vh'}}
                            placeholder="Search departure point"
                            onChange={(e) => {
                                setDeparture(e.target.value)
                            }}
                        />
                    </>
                    <>
                        <label>Type of Waste:</label>
                        <input
                            type='text'
                            min={0}
                            style={{margin: '0vh 1vh 0vh 2vh'}}
                            placeholder="Search type of waste"
                            onChange={(e) => {
                                setType(e.target.value)
                            }}
                        />
                    </>
                    <>
                        <label>Subtype:</label>
                        <input
                            type='text'
                            min={0}
                            style={{margin: '0vh 1vh 0vh 2vh'}}
                            placeholder="Search subtype"
                            onChange={(e) => {
                                setSubType(e.target.value)
                            }}
                        />
                    </>
                    <>
                        <Button onClick={requestForData} variant="success">
                            Update table
                        </Button>
                    </>
                    <Form.Check
                        style = {{width:"50vh",marginTop:'3vh', marginLeft:"2vh"}}
                        type="switch"
                        label="Show additional filters"
                        onChange={()=>{setShowAdd(!showAdd)}}
                    />
                    {showAdd && <>
                        <div style={{marginTop:"3vh"}}>
                            <>
                                <label>Start Date:</label>
                                <input
                                    type='date'
                                    min={0}
                                    style={{margin: '0vh 5vh 0vh 3vh'}}
                                    onChange={(e) => {
                                        setStartDate(e.target.value)
                                    }}
                                />
                            </>
                            <>
                                <label>Amount from:</label>
                                <input
                                    type='number'
                                    min={0}
                                    style={{margin: '0vh 1vh 0vh 2vh'}}
                                    onChange={(e) => {
                                        setLowerAmount(e.target.value)
                                    }}
                                />
                            </>
                        </div>
                        <br/>
                        <div style={{marginBottom:"3vh"}}>
                            <>
                                <label>Finish Date:</label>
                                <input
                                    type='date'
                                    min={0}
                                    style={{margin: '0vh 5vh 0vh 2vh'}}
                                    onChange={(e) => {
                                        setFinishDate(e.target.value)
                                    }}
                                />
                            </>
                            <>
                                <label>Amount to:</label>
                                <input
                                    type='number'
                                    min={0}
                                    style={{margin: '0vh 2vh 0vh 4.5vh'}}
                                    onChange={(e) => {
                                        setUpperAmount(e.target.value)
                                    }}
                                />
                            </>
                        </div>
                    </>
                    }
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
