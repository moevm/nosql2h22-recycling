import React, { useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {ratios, metal, paper, plastic, glass, organic, battery} from "./MainStorage.helpers";
import {TableData} from "../TableData/TableData";
import {columns, header} from "./MainStorage.content"
import {Container, Col, Row} from "react-bootstrap";
import {CSVLink} from "react-csv";

export const MainStorage = () => {
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedSubType, setSubType] = useState<string>('All');
    const [currentData, setData] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [exportedData,setExportedData] = useState<Array<any>>([]);

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };

    const exportData = () =>{
        fetch('http://localhost:8000/api/admin/main', {
                method:"POST",
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({type:selectedType, subType: selectedSubType, page: page, perPage:"All"})
            }
        )
            .then(response => response.json())
            .then(content => {
                setExportedData(content.orders);
                console.log(content.orders);
            })
            .catch(err => console.error(err));
    }

    const getData = () => {
        fetch('http://localhost:8000/api/admin/main', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({type:selectedType, subType: selectedSubType, page: page, perPage:perPage})
        }
        )
            .then(response => response.json())
            .then(content => {
                setData(content.orders);
                setTotal(content.countOrders);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getData();
        exportData();
    }, [])

    useEffect(() => {
        getData();
    }, [selectedType, selectedSubType,page, perPage])

    const showSubtypes = () => {
        switch(selectedType){
            case 'All':
                return (
                    <Form.Select aria-label="Default select example" onChange={(e)=>{setSubType(e.target.value)}}>
                        {ratios.map((radio,idx)=>(
                            <option>
                                {radio.name}
                            </option>
                        ))}
                    </Form.Select>
                )
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

    return (
        <>
            <div>
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
                <Container style={{width: '90vh', margin: '3vh 0vh 3vh 0vh'}}>
                    <Row>
                        <Col>
                            {showSubtypes()}
                        </Col>
                        <Col>
                            <Button onClick={exportData} style={{width: '30vh'}} variant='success' >
                                <CSVLink style={{color:'white',textDecoration: 'none'}} data={exportedData} headers={header} separator={";"} filename="AdminStorageTable">
                                    <>Export</>
                                </CSVLink>
                            </Button>

                        </Col>
                    </Row>
                </Container>
            </div>
            <TableData
                total={total}
                setPage={setPage}
                setPerPage={setPerPage}
                page={page}
                perPage={perPage}
                tableCells={currentData}
                header={columns}
            />
        </>
    );
};
