import React, {ChangeEvent, useState} from 'react';
import {Form, Container, Row, Col, Button, Card} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data} from "./Reception.content";

export const Receptions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception')

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
                    <Col lg="2">
                        <Button style={{width: '12vh', backgroundColor: '#029d27'}} variant='success'>Import</Button>
                    </Col>
                    <Col lg="2">
                        <Button style={{width: '12vh'}} variant='success' >Export</Button>
                    </Col>
                </Row>
            </Container>
            <div style={{margin: '3vh 0vh 0vh 0vh'}}>
                <TableData  header={columns} tableCells={data}/>
            </div>
        </>
    );
};
