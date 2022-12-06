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
    const [show, setShow] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);

    const userLogged = useContext(UserLogged);

    const debouncedSearchTerm = useDebounce(searchInput, 500);

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    const createRequest = (event: any) => {
        setShow(true);
        let currentRequest = currentData[parseInt(event.target.id)];
        fetch('http://localhost:8000/api/manager/export', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({reception: userLogged.reception, type: currentRequest.type, subtype: currentRequest.subtype})
        })
            .then(response => response.json())
            .then(content => {
                setData(content.materials);
                userLogged.setReception(content.reception);
            })
            .catch(err => console.error(err));
    }

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
                setData(content.materials);
                userLogged.setReception(content.reception);
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
                setData(results.materials);
            });
        },
        [debouncedSearchTerm]
    );

    return (
        <Card>
            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Information alert</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Request has created/</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=>{setShow(false)}} variant="secondary">Close</Button>
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
            <TableData tableCells={useTableData(currentData, createRequest)}
                       header={columns}
                       total={total}
                       setPage={setPage}
                       setPerPage={setPerPage}
                       page={page}
                       perPage={perPage}
            />
        </Card>
    );
};
