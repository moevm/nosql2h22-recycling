import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import {ratios, metal, paper, plastic, glass} from "./MainStorage.helpers";
import {TableData} from "../TableData/TableData";
import {data, columns} from "./MainStorage.content"

export const MainStorage = () => {
    const [selectedType, setSelectedType] = useState<string>('1');

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };

    const showSubtypes = () => {
        if(selectedType === '1'){
            return (
                <Form.Select aria-label="Default select example">
                    {ratios.map((radio,idx)=>(
                        <option>
                            {radio.name}
                        </option>
                    ))}
                </Form.Select>
            )
        }else if(selectedType === '2'){
            return (
                <Form.Select aria-label="Default select example">
                    {metal.map((metal)=>(
                        <option>
                            {metal.name}
                        </option>
                    ))}
                </Form.Select>
            )
        }else if(selectedType === '3'){
            return (
                <Form.Select aria-label="Default select example">
                    {plastic.map((metal)=>(
                        <option>
                            {metal.name}
                        </option>
                    ))}
                </Form.Select>
            )
        }else if(selectedType === '4'){
            return (
                <Form.Select aria-label="Default select example">
                    {glass.map((metal)=>(
                        <option>
                            {metal.name}
                        </option>
                    ))}
                </Form.Select>
            )
        }else{
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
                <div style={{width: '15vh', margin: '3vh 0vh 0vh 0vh'}}>
                    {showSubtypes()}
                </div>
            </div>
            <TableData tableCells={data} header={columns}/>
        </>
    );
};
