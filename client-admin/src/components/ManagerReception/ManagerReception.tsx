import React, {ChangeEvent, useState} from "react";
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data} from "./ManagerReception.content";
import {useTableData} from "./ManagerReception.hooks"

export const ManagerReception = () => {
    const [searchParameter, setSearchParameter] = useState<string>('type of waste')

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    const [show, setShow] = useState<boolean>(false);

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
            <Card.Body style={{width: '90vh', padding:'1vh', margin:'1vh 0vh 0vh 0vh'}}>
                <Row>
                    <Col xs lg="4">
                        <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                            <option value='type of waste'>Type of waste</option>
                            <option value='subtype'>Subtype</option>
                        </Form.Select>
                    </Col>
                    <Col lg="4">
                        <input style={{margin:'0.5vh 0vh 0vh 0vh'}} type="search" placeholder={`Search ${searchParameter}`} />
                    </Col>
                </Row>
            </Card.Body>
            <TableData tableCells={useTableData(data, setShow)} header={columns}/>
        </Card>
    );
};
