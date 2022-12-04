import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Login.css'
import {UserLogged} from "../../App";

export const Login = () => {
    const [show, setShow] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate();

    const userLogged = useContext(UserLogged);

    const handleClose = () => {
        navigate('/');
        setShow(false)
    };

    const handleLogin = () => {
        fetch('http://localhost:8000/api/login', {
                method:"POST",
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({login: email, password: password})
            }
        )
            .then(response => response.json())
            .then(content => {
                userLogged.setUser(content.role);
                if(content.role === "Admin"){
                    userLogged.stateFunc(true);
                    navigate('/admin_screen')
                }
                if(content.role === "Manager"){
                    userLogged.stateFunc(true);
                    navigate('/manager_screen')
                }
                if(content.role === "Driver"){
                    userLogged.stateFunc(true);
                    navigate('/carrier_screen')
                }
            })
            .catch(err => console.error(err));
    }

    const savePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const saveEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    return (
        <Modal show={show} onHide={handleClose} className='modal-styles'>
            <Modal.Header closeButton>
                <Modal.Title>Authentication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            onChange={saveEmail}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Password'
                            onChange={savePassword}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='footer'>
                <Button variant="primary" onClick={handleLogin}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
