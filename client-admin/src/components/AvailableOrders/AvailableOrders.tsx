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

    const userLogged = useContext(UserLogged);

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
            body: JSON.stringify({orderID: currentRequest.orderID, login: userLogged.user})
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
            body: JSON.stringify({filter: searchParameter, filterValue: request})
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
                setData(results);
            });
        },
        [debouncedSearchTerm]
    );

    return (
        <Card>
            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Something happened</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
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
