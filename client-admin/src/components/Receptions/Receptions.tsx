import React, {ChangeEvent, useEffect, useState} from 'react';
import {Form, Container, Row, Col, Button} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data, header} from "./Reception.content";
import {CSVLink} from 'react-csv';
import useDebounce from "./Reception.hooks";

export const Receptions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception')
    const [currentData, setData] = useState(data);
    const [currentCols, setCols] = useState(columns);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(event.currentTarget.value);
    };

    const debouncedSearchTerm = useDebounce(searchInput, 500);

    useEffect(
        () => {
            fetch('http://localhost:8000/api/admin/receptions', {
                    method:"POST",
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({filter: searchParameter, filterValue: '', page: page, perPage:perPage})
                }
            )
                .then(response => response.json())
                .then(content => {
                    setData(content.receptions);
                    setTotal(content.countReceptions);
                })
                .catch(err => console.error(err));
        },
        []
    );

    const requestForData = (request: string) =>{
        return fetch('http://localhost:8000/api/admin/receptions', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({filter: searchParameter, filterValue: request, page: page, perPage:perPage})
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
                setData(results.receptions);
                setTotal(results.countReceptions);
            });
        },
        [debouncedSearchTerm, page, perPage]
    );

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
                <TableData
                    total={total}
                    setPage={setPage}
                    setPerPage={setPerPage}
                    page={page}
                    perPage={perPage}
                    tableCells={currentData}
                    header={columns}
                />
            </div>
        </>
    );
};
