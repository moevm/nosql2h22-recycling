import React, {ChangeEvent, useEffect, useState} from 'react';
import {Form, Container, Row, Col, Button} from "react-bootstrap";
import {TableData} from "../TableData/TableData";
import {columns, header} from "./Transitiions.content";
import {TableCellCarrier} from "../TableData/TableData.types";
import useDebounce from "../Receptions/Reception.hooks";
import {CSVLink} from "react-csv";
import {ratios, metal, paper, plastic, glass, organic, battery} from '../MainStorage/MainStorage.helpers'

export const Transitions = () => {
    const [searchParameter, setSearchParameter] = useState<string>('Reception');
    const [currentData, setData] = useState<Array<TableCellCarrier>>([]);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedSubType, setSubType] = useState<string>('All');
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [exportedData,setExportedData] = useState<Array<any>>([]);
    const [showAdd, setShowAdd] = useState<boolean>(false);

    const [lowerAmount, setLowerAmount] = useState<string>("");
    const [upperAmount, setUpperAmount] = useState<string>("");

    const [startDate,setStartDate] = useState<string>("");
    const [finishDate,setFinishDate] = useState<string>("");

    const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(event.currentTarget.value);
    };

    const showSubtypes = () => {
        switch(selectedType){
            case 'Metal':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {metal.map((metal)=>(
                            <option>
                                {metal.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Plastic':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {plastic.map((plastic)=>(
                            <option>
                                {plastic.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Glass':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {glass.map((glass)=>(
                            <option>
                                {glass.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Organic':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {organic.map((paper)=>(
                            <option>
                                {paper.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Battery':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {battery.map((paper)=>(
                            <option>
                                {paper.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case 'Paper':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {paper.map((paper)=>(
                            <option>
                                {paper.name}
                            </option>
                        ))}
                    </Form.Select>
                )
        }
    }

    const searchHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParameter(event.target.value);
    };

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
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
                                Export table to CSV
                            </Button>
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
            { showAdd && <Container style={{width: '90vh', margin:'1vh 0vh 0vh 0vh'}}>
                {ratios.map((radio,idx)=>(
                    <>
                        <input
                            type='radio'
                            id={`radio-${idx}`}
                            value={radio.name}
                            name='recycle'
                            style={{margin: '0vh 3vh 0vh 0vh'}}
                            onChange={radioHandler}
                        />
                        <label style={{margin: '0vh 3vh 0vh -2vh'}}>{radio.name}</label>
                    </>
                ))}
                <div style={{width: "75vh",marginTop:'3vh'}}>
                    {showSubtypes()}
                </div>
                <Row style={{marginTop:'3vh'}}>
                    <Col>
                        <label style={{margin: '0vh 3vh 0vh 0vh'}}>Start date:</label>
                        <input
                            type='date'
                            style={{margin: '0vh 3vh 0vh 1vh'}}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                            }}
                        />
                    </Col>
                    <Col>
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
                </Row>
                <Row style={{marginTop:"1vh"}}>
                    <Col>
                        <label style={{margin: '0vh 3vh 0vh 0vh'}}>Finish date:</label>
                        <input
                            type='date'
                            style={{margin: '0vh 3vh 0vh 0vh'}}
                            onChange={(e) => {
                                setFinishDate(e.target.value)
                            }}
                        />
                    </Col>
                    <Col>
                        <label>Amount to:</label>
                        <input
                            type='number'
                            min={0}
                            style={{margin: '0vh 1vh 0vh 3vh'}}
                            placeholder="Amount to:"
                            onChange={(e) => {
                                setUpperAmount(e.target.value)
                            }}
                        />
                    </Col>
                </Row>
                <>
                    <Button style={{width:"30vh", marginTop:"3vh"}} variant="success" onClick={()=>{
                        requestForData(debouncedSearchTerm).then(results => {
                            setIsSearching(false);
                            setData(results.transits);
                            setTotal(results.countTransits);
                        });
                    }
                    }>Update table</Button>
                </>
            </Container>
            }
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

