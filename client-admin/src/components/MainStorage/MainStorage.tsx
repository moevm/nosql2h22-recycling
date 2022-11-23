import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import {ratios, metal, paper, plastic, glass} from "./MainStorage.helpers";
import {TableData} from "../TableData/TableData";
import {data, columns} from "./MainStorage.content"
import Container from "react-bootstrap/Container";

export const MainStorage = () => {
    const [selectedType, setSelectedType] = useState<string>('1');

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };

    const showSubtypes = () => {
        switch(selectedType){
            case '1':
                return (
                    <Form.Select aria-label="Default select example">
                        {ratios.map((radio,idx)=>(
                            <option>
                                {radio.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case '2':
                return (
                    <Form.Select aria-label="Default select example">
                        {metal.map((metal)=>(
                            <option>
                                {metal.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case '3':
                return (
                    <Form.Select aria-label="Default select example">
                        {plastic.map((metal)=>(
                            <option>
                                {metal.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case '4':
                return (
                    <Form.Select aria-label="Default select example">
                        {glass.map((metal)=>(
                            <option>
                                {metal.name}
                            </option>
                        ))}
                    </Form.Select>
                )
            case '5':
                return (
                    <Form.Select aria-label="Default select example">
                        {paper.map((metal)=>(
                            <option>
                                {metal.name}
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
                            value={radio.value}
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
            <TableData tableCells={data} header={columns}/>
        </>
    );
};
