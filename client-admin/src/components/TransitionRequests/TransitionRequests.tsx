import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import { Card, Col, Form, Row} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns} from "./TransitionRequests.content";
import {TableCellManagerReception} from "../TableData/TableData.types";
import {UserLogged} from "../../App";
import useDebounce from "../ManagerReception/ManagerReception.hooks";

export const TransitionRequests = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Request ID');
    const [currentData, setData] = useState<Array<TableCellManagerReception>>([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);

    const userLogged = useContext(UserLogged);

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
        setSearchInput('');
    };

    const showInput = () =>{
        if(searchParameter === 'Date'){
            return(
                <input onChange={(event => {setSearchInput(event.target.value)})}
                       style={{margin:'0.5vh 0vh 0vh 0vh'}}
                       type="date"
                       placeholder={`Search ${searchParameter}`}
                />
            );
        }else{
            return (
                <input onChange={(event => {setSearchInput(event.target.value)})}
                       style={{margin:'0.5vh 0vh 0vh 0vh'}}
                       type="search"
                       placeholder={`Search ${searchParameter}`}
                />
            );
        }
    }

    const debouncedSearchTerm = useDebounce(searchInput, 500);

    useEffect(
        () => {
            fetch('http://localhost:8000/api/manager/requests', {
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
                    setData(content.requests);
                    setTotal(content.countRequests);
                })
                .catch(err => console.error(err));
        },
        []
    );

    const requestForData = (request: string) =>{
        return fetch('http://localhost:8000/api/manager/requests', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({reception: localStorage.getItem("reception"), filter: searchParameter, filterValue: request, page:page, perPage:perPage})
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
                setData(results.requests);
                setTotal(results.countRequests);
            });
        },
        [debouncedSearchTerm, page,perPage]
    );

    return (
        <>
            <Card>
                <Card.Body style={{width: '90vh', padding:'1vh', margin:'1vh 0vh 0vh 0vh'}}>
                    <Row>
                        <Col xs lg="4">
                            <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                                <option value='Request ID'>Request ID</option>
                                <option value='Date'>Date</option>
                                <option value='Type of waste'>Type of waste</option>
                                <option value='Subtype'>Subtype</option>
                            </Form.Select>
                        </Col>
                        <Col lg="4">
                            {showInput()}
                        </Col>
                    </Row>
                </Card.Body>
                <TableData
                    total={total}
                    setPage={setPage}
                    setPerPage={setPerPage}
                    page={page}
                    perPage={perPage}
                    tableCells={currentData}
                    header={columns}
                />
            </Card>
        </>
    );
};
