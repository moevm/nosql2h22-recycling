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
            <Container>
                {content}
            </Container>
        </Navbar>
    );
};
