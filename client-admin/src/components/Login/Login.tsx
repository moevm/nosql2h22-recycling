import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import './Login.css'

export const Login = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleLogin = () => {

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
