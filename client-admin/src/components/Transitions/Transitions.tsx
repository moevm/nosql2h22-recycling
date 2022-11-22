import React, {ChangeEvent, useState} from 'react';
import {Form, Container, Row, Col, Card} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data} from "./Transitiions.content";

export const Transitions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Carrier')

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    return (
        <>
            <Container style={{width: '90vh', margin:'1vh 0vh 0vh 0vh'}}>
                <Row>
                    <Col xs lg="3">
                        <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                            <option value='Reception'>Reception</option>
                            <option value='Manager'>Manager</option>
                        </Form.Select>
                    </Col>
                    <Col lg="4">
                        <input type="search" placeholder={`Search ${searchParameter}`} />
                    </Col>
                </Row>
            </Container>
            <div style={{margin: '3vh 0vh 0vh 0vh'}}>
                <TableData  header={columns} tableCells={data}/>
            </div>
        </>
    );
};

