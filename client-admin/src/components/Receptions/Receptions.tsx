import React, {ChangeEvent, useEffect, useState} from 'react';
import {Form, Container, Row, Col, Button} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, header} from "./Reception.content";
import {CSVLink} from 'react-csv';
import useDebounce from "./Reception.hooks";

export const Receptions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception')
    const [currentData, setData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [exportData, setExportedData] = useState<Array<any>>([]);
    const [showAdd, setShowAdd] = useState<boolean>(false);

    const [lowerBattery, setLowerBattery] = useState<string>("");
    const [upperBattery, setUpperBattery] = useState<string>("");

    const [lowerOrganic, setLowerOrganic] = useState<string>("");
    const [upperOrganic, setUpperOrganic] = useState<string>("");

    const [lowerPaper, setLowerPaper] = useState<string>("");
    const [upperPaper, setUpperPaper] = useState<string>("");

    const [lowerGlass, setLowerGlass] = useState<string>("");
    const [upperGlass, setUpperGlass] = useState<string>("");

    const [lowerPlastic, setLowerPlastic] = useState<string>("");
    const [upperPlastic, setUpperPlastic] = useState<string>("");

    const [lowerMetal, setLowerMetal] = useState<string>("");
    const [upperMetal, setUpperMetal] = useState<string>("");

    const [lowerAmount, setLowerAmount] = useState<string>("");
    const [upperAmount, setUpperAmount] = useState<string>("");

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

            fetch('http://localhost:8000/api/admin/receptions', {
                    method:"POST",
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({filter: searchParameter, filterValue: '', page: page, perPage: "All"})
                }
            )
                .then(response => response.json())
                .then(content => {
                    setExportedData(content.receptions);
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
            <Container style={{width: '120vh', margin:'1vh 0vh 0vh 0vh'}}>
                <Row>
                    <Col>
                        <Form.Select onChange={searchHandler}  aria-label="Choose parameter of search">
                            <option value='Reception'>Reception</option>
                            <option value='Manager'>Manager</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <input style={{width: '40vh'}} onChange={inputHandler} type="search" placeholder={`Search ${searchParameter}`} />
                    </Col>
                    <Col>
                        <CSVLink data={exportData} headers={header} separator={";"} filename="AdminReceptionsTable">
                            <Button style={{width: '40vh'}} variant='success' >Export table to CSV</Button>
                        </CSVLink>
                    </Col>
                </Row>
            </Container>
            <Form.Check
                style = {{width:"50vh",marginTop:'3vh', marginLeft:"2vh"}}
                type="switch"
                label="Show additional filters"
                onChange={()=>{setShowAdd(!showAdd)}}
            />
            {showAdd && <div>
                <Container style={{width: '99%', margin: '3vh 0vh 3vh 0vh'}}>
                    <Row>
                        <Col>
                            <label>Battery from:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 1vh'}}
                                placeholder="Battery from:"
                                onChange={(e) => {
                                    setLowerBattery(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Organic from:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 1vh'}}
                                placeholder="Organic from:"
                                onChange={(e) => {
                                    setLowerOrganic(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Paper from:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 1vh'}}
                                placeholder="Paper from:"
                                onChange={(e) => {
                                    setLowerPaper(e.target.value)
                                }}
                            />
                        </Col>
                    </Row>
                    <Row style={{marginTop: "1vh"}}>
                        <Col>
                            <label>Battery to:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 3.5vh'}}
                                placeholder="Battery to:"
                                onChange={(e) => {
                                    setUpperBattery(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Organic to:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 3.5vh'}}
                                placeholder="Organic to:"
                                onChange={(e) => {
                                    setUpperOrganic(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Paper to:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 3.5vh'}}
                                placeholder="Paper to:"
                                onChange={(e) => {
                                    setUpperPaper(e.target.value)
                                }}
                            />
                        </Col>

                    </Row>
                </Container>
                <Container style={{width: '99%', margin: '3vh 0vh 3vh 0vh'}}>
                    <Row>
                        <Col>
                            <label>Glass from:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 3vh'}}
                                placeholder="Glass from:"
                                onChange={(e) => {
                                    setLowerGlass(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Plastic from:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 1vh'}}
                                placeholder="Plastic from:"
                                onChange={(e) => {
                                    setLowerPlastic(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Metal from:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 1vh'}}
                                placeholder="Metal from:"
                                onChange={(e) => {
                                    setLowerMetal(e.target.value)
                                }}
                            />
                        </Col>
                    </Row>
                    <Row style={{marginTop: "1vh"}}>
                        <Col>
                            <label>Glass to:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 5.5vh'}}
                                placeholder="Glass to:"
                                onChange={(e) => {
                                    setUpperGlass(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Plastic to:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 3.5vh'}}
                                placeholder="Plastic to:"
                                onChange={(e) => {
                                    setUpperPlastic(e.target.value)
                                }}
                            />
                        </Col>
                        <Col>
                            <label>Metal to:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 3.5vh'}}
                                placeholder="Metal to:"
                                onChange={(e) => {
                                    setUpperMetal(e.target.value)
                                }}
                            />
                        </Col>
                    </Row>
                    <Row style={{marginTop:"3vh"}}>
                        <Col lg={4}>
                            <label>Amount from:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 0.5vh'}}
                                placeholder="Amount from:"
                                onChange={(e) => {
                                    setLowerAmount(e.target.value)
                                }}
                            />
                        </Col>
                        <Col lg={4}>
                            <label>Amount to:</label>
                            <input
                                type='number'
                                min={0}
                                style={{margin: '0vh 1vh 0vh 2vh'}}
                                placeholder="Amount to:"
                                onChange={(e) => {
                                    setUpperAmount(e.target.value)
                                }}
                            />
                        </Col>
                        <Col lg={3}>
                            <>
                                <Button variant="success" onClick={()=>{
                                    requestForData(debouncedSearchTerm).then(results => {
                                        setIsSearching(false);
                                        setData(results.receptions);
                                        setTotal(results.countReceptions);
                                    });}
                                }>Update table</Button>
                            </>
                        </Col>
                    </Row>
                </Container>
            </div>}
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
