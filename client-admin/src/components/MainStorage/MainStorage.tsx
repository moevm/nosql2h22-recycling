import React, {ChangeEvent, useEffect, useState} from 'react';
import { Form } from 'react-bootstrap';
import {ratios, metal, paper, plastic, glass} from "./MainStorage.helpers";
import {TableData} from "../TableData/TableData";
import {data, columns} from "./MainStorage.content"
import Container from "react-bootstrap/Container";

export const MainStorage = () => {
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedSubType, setSubType] = useState<string>('All')
    const [currectData, setData] = useState<Array<any>>([])
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };

    const getData = () => {
        fetch('http://localhost:8000/api/admin/main', {
            method:"POST",
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({type:selectedType, subType: selectedSubType})
        }
        )
            .then(response => response.json())
            .then(content => {
                setData(content);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getData();
    }, [selectedType, selectedSubType])

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
                <Container style={{width: '20vh', margin: '3vh 0vh 3vh 0vh'}}>
                    {showSubtypes()}
                </Container>
            </div>
            <TableData tableCells={currectData} header={columns}/>
        </>
    );
};
