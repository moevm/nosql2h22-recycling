import React, {ChangeEvent, useEffect, useState} from 'react';
import {Form, Container, Row, Col, Button} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, header} from "./Transitiions.content";
import {TableCellCarrier} from "../TableData/TableData.types";
import useDebounce from "../Receptions/Reception.hooks";
import {CSVLink} from "react-csv";

export const Transitions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception');
    const [currentData, setData] = useState<Array<TableCellCarrier>>([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [exportedData,setExportedData] = useState<Array<any>>([]);

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
                    body: JSON.stringify({filter: searchParameter, filterValue: '', page:page, perPage:perPage})
                }
            )
                .then(response => response.json())
                .then(content => {
                    setData(content.transits);
                    setTotal(content.countTransits)
                })
                .catch(err => console.error(err));

            fetch('http://localhost:8000/api/admin/transit', {
                    method:"POST",
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({filter: searchParameter, filterValue: '', page:page, perPage:"All"})
                }
            )
                .then(response => response.json())
                .then(content => {
                    setExportedData(content.transits);
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
            body: JSON.stringify({filter: searchParameter, filterValue: request, page:page, perPage:perPage})
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
                setData(results.transits);
                setTotal(results.countTransits);
            });
        },
        [debouncedSearchTerm, page, perPage]
    );

    return (
        <>
            <Container style={{width: '90vh', margin:'1vh 0vh 0vh 0vh'}}>
                <Row>
                    <Col>
                        <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                            <option value='Reception'>Reception</option>
                            <option value='Carrier'>Carrier</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <input style={{width: '30vh'}} onChange={inputHandler} type="search" placeholder={`Search ${searchParameter}` } />
                    </Col>
                    <Col>
                        <CSVLink style={{color:'white',textDecoration: 'none'}} data={exportedData} headers={header} separator={";"} filename="AdminTransitionsTable">
                            <Button style={{width: '30vh'}} variant='success' >
                                Export
                            </Button>
                        </CSVLink>
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

