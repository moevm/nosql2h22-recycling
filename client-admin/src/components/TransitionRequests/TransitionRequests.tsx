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

    const requestForData = (request: string) =>{
        return fetch('http://localhost:8000/api/manager/requests', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({reception: userLogged.reception, filter: searchParameter, filterValue: request})
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
                <TableData tableCells={currentData} header={columns}/>
            </Card>
        </>
    );
};
