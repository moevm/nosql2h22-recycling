import React, {useContext, useEffect, useState} from 'react';
import {Card, Table} from "react-bootstrap";
import {dataCurrentOrder} from "./CurrentOrder.content";
import {UserLogged} from "../../App";

export const CurrentOrder = () => {
    const [currentOrder, setOrder] = useState<any>({});

    const userLogged = useContext(UserLogged);

    useEffect(
        () => {
            fetch('http://localhost:8000/api/driver/main', {
                    method:"POST",
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({login: userLogged.user})
                }
            )
                .then(response => response.json())
                .then(content => {
                    setOrder(content);
                    console.log(content);
                })
                .catch(err => console.error(err));
        },
        []
    );

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
                        {Object.keys(currentOrder).map((elem) =>(
                            <tr>
                                <td>{elem}</td>
                                <td>{currentOrder[elem]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}
