import React, {ChangeEvent, useState} from 'react';
import { Card, Col, Container, Form, Row, Modal, Button } from "react-bootstrap";
import {dataCurrentOrder} from '../CurrentOrder/CurrentOrder.content';
import {TableData} from "../TableData/TableData";
import {columns, dataAvailableOrders} from "./AvailableOrders.content";
import {useTableData} from './AvailableOrders.hooks'

export const AvailableOrders = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception')
    const [show, setShow] = useState<boolean>(false);

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

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
                        <Col xs lg="3">
                            <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                                {dataCurrentOrder.map((elem)=>(
                                    <option>{elem.parameter}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col lg="4">
                            <input type="search" placeholder={`Search ${searchParameter}`} />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
            <TableData tableCells={useTableData(dataAvailableOrders, setShow)} header={columns}/>
        </Card>
    )
}
