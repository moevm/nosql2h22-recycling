import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { Card, Col, Container, Form, Row, Modal, Button } from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns} from "./AvailableOrders.content";
import {useTableData} from './AvailableOrders.hooks';
import useDebounce from "../Receptions/Reception.hooks";
import {UserLogged} from "../../App";

export const AvailableOrders = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Point of Departure')
    const [show, setShow] = useState<boolean>(false);
    const [currentData, setData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [showAdd, setShowAdd] = useState<boolean>(false);

    const [lowerAmount, setLowerAmount] = useState<string>("");
    const [upperAmount, setUpperAmount] = useState<string>("");

    const [startDate,setStartDate] = useState<string>("");
    const [finishDate,setFinishDate] = useState<string>("");

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    const debouncedSearchTerm = useDebounce(searchInput, 500);

    const acceptRequest = (event: any) => {
        setShow(true);
        let currentRequest = currentData[parseInt(event.target.id)];
        console.log(currentRequest)

        fetch('http://localhost:8000/api/driver/confirm', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            // @ts-ignore
            body: JSON.stringify({orderID: currentRequest.orderID, login: localStorage.getItem("user")})
        })
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    const requestForData = (request: string) =>{
        return fetch('http://localhost:8000/api/driver/orders', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({filters:{
                    date:{
                        to: finishDate,
                        from: startDate
                    },
                    amount:{
                        to: upperAmount,
                        from: lowerAmount
                    }
                },
                page:page, perPage:perPage, mainFilter: searchParameter, mainFilterValue: searchInput})
        })
            .then(r => r.json())
            .catch(error => {
                console.error(error);
                return [];
            });
    }

    useEffect(
        () => {
            setIsSearching(true);
            requestForData(debouncedSearchTerm).then(results => {
                setIsSearching(false);
                setData(results.orders);
                setTotal(results.countOrders);
            });
        },
        [debouncedSearchTerm, page, perPage]
    );

    return (
        <Card>
            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Information alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Request has accepted</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{
                        setShow(false);
                        requestForData(debouncedSearchTerm).then(results => {
                            setIsSearching(false);
                            setData(results.orders);
                            setTotal(results.countOrders);
                        });
                    }}
                            variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
            <Card.Body>
                <Container style={{width: '90vh', margin:'1vh 0vh 0vh 0vh'}}>
                    <Row>
                        <Col xs lg="4">
                            <Form.Select style={{width: '25vh'}} onChange={searchHandler}  aria-label="Choose parameter of search">
                                <option value="Point of Departure">Point of Departure</option>
                                <option value="Type of waste">Type of waste</option>
                                <option value="Subtype">Subtype</option>
                            </Form.Select>
                        </Col>
                        <Col lg="4">
                            <input style={{width: '30vh', marginTop:"0.5vh"}}
                                   onChange={(event)=>{setSearchInput(event.target.value)}}
                                   type="search"
                                   placeholder={`Search ${searchParameter}`}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
            <Form.Check
                style = {{width:"50vh", marginLeft:"3vh"}}
                type="switch"
                label="Show additional filters"
                onChange={()=>{setShowAdd(!showAdd)}}
            />
            {showAdd && <Container style={{width: '150vh', margin:'1vh 0vh 2vh 0vh'}}>
                <Row style={{marginTop:'3vh'}}>
                    <Col>
                        <label style={{margin: '0vh 3vh 0vh 0vh'}}>Start date:</label>
                        <input
                            type='date'
                            style={{margin: '0vh 3vh 0vh 1vh'}}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                            }}
                        />
                    </Col>
                    <Col>
                        <label>Amount from:</label>
                        <input
                            type='number'
                            min={0}
                            style={{margin: '0vh 1vh 0vh 0.5vh'}}
                            placeholder="Amount from:"
                            onChange={(e) => {
                                setLowerAmount(e.target.value)
                            }}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:"1vh"}}>
                    <Col>
                        <label style={{margin: '0vh 3vh 0vh 0vh'}}>Finish date:</label>
                        <input
                            type='date'
                            style={{margin: '0vh 3vh 0vh 0vh'}}
                            onChange={(e) => {
                                setFinishDate(e.target.value)
                            }}
                        />
                    </Col>
                    <Col>
                        <label>Amount to:</label>
                        <input
                            type='number'
                            min={0}
                            style={{margin: '0vh 1vh 0vh 3vh'}}
                            placeholder="Amount to:"
                            onChange={(e) => {
                                setUpperAmount(e.target.value)
                            }}
                        />
                    </Col>
                    <Col>
                        <>
                            <Button style={{width:"60%", marginLeft:"18%",marginRight:"22%"}} variant="success" onClick={()=>{
                                requestForData(debouncedSearchTerm).then(results => {
                                    setIsSearching(false);
                                    setData(results.orders);
                                    setTotal(results.countOrders);
                                });}
                            }>Update table</Button>
                        </>
                    </Col>
                </Row>
            </Container>}
            <TableData tableCells={useTableData(currentData, acceptRequest)}
                       header={columns}
                       total={total}
                       setPage={setPage}
                       setPerPage={setPerPage}
                       page={page}
                       perPage={perPage}
            />
        </Card>
    )
}
