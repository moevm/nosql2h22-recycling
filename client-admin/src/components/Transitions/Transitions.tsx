import React, {ChangeEvent, useEffect, useState} from 'react';
import {Form, Container, Row, Col} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, data} from "./Transitiions.content";
import {TableCellCarrier} from "../TableData/TableData.types";
import useDebounce from "../Receptions/Reception.hooks";

export const Transitions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception');
    const [currentData, setData] = useState<Array<TableCellCarrier>>([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);

    const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(event.currentTarget.value);
    };

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    const debouncedSearchTerm = useDebounce(searchInput, 500);

    useEffect(
        () => {
            fetch('http://localhost:8000/api/admin/transit', {
                    method:"POST",
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({filter: searchParameter, filterValue: ''})
                }
            )
                .then(response => response.json())
                .then(content => {
                    setData(content);
                })
                .catch(err => console.error(err));
        },
        []
    );

    const requestForData = (request: string) =>{
        return fetch('http://localhost:8000/api/admin/transit', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({filter: searchParameter, filterValue: request})
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

    return (
        <>
            <Container style={{width: '90vh', margin:'1vh 0vh 0vh 0vh'}}>
                <Row>
                    <Col xs lg="3">
                        <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                            <option value='Reception'>Reception</option>
                            <option value='Carrier'>Carrier</option>
                        </Form.Select>
                    </Col>
                    <Col lg="4">
                        <input onChange={inputHandler} type="search" placeholder={`Search ${searchParameter}` } />
                    </Col>
                </Row>
            </Container>
            <div style={{margin: '3vh 0vh 0vh 0vh'}}>
                <TableData  total={total}
                            setPage={setPage}
                            setPerPage={setPerPage}
                            page={page}
                            perPage={perPage}
                            tableCells={currentData}
                            header={columns}/>
            </div>
        </>
    );
};

