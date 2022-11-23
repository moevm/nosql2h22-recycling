import React, {ChangeEvent, useState} from 'react';
import { Card, Col, Container, Form, Row} from "react-bootstrap";
import {dataCurrentOrder} from '../CurrentOrder/CurrentOrder.content';
import {TableData} from "../TableData/TableData";
import {columns, dataAvailableOrders} from "./AvailableOrders.content";

export const AvailableOrders = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception')

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };


    return (
        <Card>
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
            <TableData tableCells={dataAvailableOrders} header={columns}/>
        </Card>
    )
}
