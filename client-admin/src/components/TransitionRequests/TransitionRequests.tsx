import React, {ChangeEvent, useState} from "react";
import { Card, Col, Form, Row} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data} from "./TransitionRequests.content";

export const TransitionRequests = () => {
    const [searchParameter, setSearchParameter] = useState<string>('id')

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };
    return (
        <>
            <Card>
                <Card.Body style={{width: '90vh', padding:'1vh', margin:'1vh 0vh 0vh 0vh'}}>
                    <Row>
                        <Col xs lg="4">
                            <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                                <option value='id'>Request ID</option>
                                <option value='type of waste'>Type of waste</option>
                                <option value='subtype'>Subtype</option>
                            </Form.Select>
                        </Col>
                        <Col lg="4">
                            <input style={{margin:'0.5vh 0vh 0vh 0vh'}} type="search" placeholder={`Search ${searchParameter}`} />
                        </Col>
                    </Row>
                </Card.Body>
                <TableData tableCells={data} header={columns}/>
            </Card>
        </>
    );
};
