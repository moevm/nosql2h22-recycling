import React from 'react';
import {Card, Table} from "react-bootstrap";
import {dataCurrentOrder} from "./CurrentOrder.content";

export const CurrentOrder = () => {

    return (
        <Card>
            <Card.Body style={{margin: '1vh 0vh 0vh 0vh', width: "100vh"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCurrentOrder.map((elem) =>(
                            <tr>
                                <td>{elem.parameter}</td>
                                <td>{elem.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}
