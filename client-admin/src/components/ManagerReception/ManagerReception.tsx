import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data} from "./ManagerReception.content";
import {useTableData} from "./ManagerReception.hooks"
import {TableCellManagerReception} from "../TableData/TableData.types";
import {UserLogged} from "../../App";
import useDebounce from "./ManagerReception.hooks";


export const ManagerReception = () => {
    const [searchParameter, setSearchParameter] = useState<string>('type');
    const [currentData, setData] = useState<Array<TableCellManagerReception>>([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const userLogged = useContext(UserLogged);

    const debouncedSearchTerm = useDebounce(searchInput, 500);

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    useEffect(()=>{
        fetch('http://localhost:8000/api/manager/reception', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({login: userLogged.user, filter: searchParameter, filterValue: ''})
        })
            .then(response => response.json())
            .then(content => {
                setData(content);
            })
            .catch(err => console.error(err));
    }, [])

    const requestForData = (request: string) =>{
        return fetch('http://localhost:8000/api/manager/reception', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({login: userLogged.user, filter: searchParameter, filterValue: request})
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
                        <input onChange={(event => {setSearchInput(event.target.value)})} style={{margin:'0.5vh 0vh 0vh 0vh'}} type="search" placeholder={`Search ${searchParameter}`} />
                    </Col>
                </Row>
            </Card.Body>
            <TableData tableCells={useTableData(currentData, setShow)} header={columns}/>
        </Card>
    );
};
