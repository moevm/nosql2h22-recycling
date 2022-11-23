import React, {ReactNode} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavbarProps} from "react-bootstrap";

import "./Navbar.css";

export type IAdminNavbarProps = NavbarProps & {
    content?: ReactNode | ReactNode[];
};

export const AdminNavbar = ({content, ...rest}: IAdminNavbarProps) => {
    return (
        <Navbar className="AdminNavbar" {...rest}>
            <h4>Recycle Admin</h4>
            <Container>
                <span>{content}</span>
                <a href="/login"><button className='button-login'>Log in</button></a>
            </Container>
        </Navbar>
    );
};
