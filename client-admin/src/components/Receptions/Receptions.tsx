import React, {ChangeEvent, useState} from 'react';
import {Form, Container, Row, Col, Button} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data, header} from "./Reception.content";
import {CSVLink} from 'react-csv';

export const Receptions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('reception')
    const [currentData, setData] = useState(data);
    const [currentCols, setCols] = useState(columns);
    const [searchInput, setSearchInput] = useState("");

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(event.currentTarget.value);
    };

    return (
        <>
            <Container style={{width: '90vh', margin:'1vh 0vh 0vh 0vh'}}>
                <Row>
                    <Col xs lg="3">
                        <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                            <option value='reception'>Reception</option>
                            <option value='manager'>Manager</option>
                        </Form.Select>
                    </Col>
                    <Col lg="4">
                        <input onChange={inputHandler} type="search" placeholder={`Search ${searchParameter}`} />
                    </Col>
                    <Col lg="2">
                        <Button style={{width: '12vh', backgroundColor: '#029d27'}} variant='success'>Import</Button>
                    </Col>
                    <Col lg="2">
                        <CSVLink data={data} headers={header} separator={";"} filename="AdminReceptionsTable">
                            <Button style={{width: '12vh'}} variant='success' >Export</Button>
                        </CSVLink>
                    </Col>
                </Row>
            </Container>
            <div style={{margin: '3vh 0vh 0vh 0vh'}}>
                <TableData  header={currentCols} tableCells={currentData}/>
            </div>
        </>
    );
};
