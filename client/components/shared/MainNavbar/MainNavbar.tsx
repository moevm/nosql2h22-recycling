import React, { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavbarProps } from "react-bootstrap";

import styles from "./MainNavbar.module.css";
import { NavUser } from "./components";

export type IMainNavbarProps = NavbarProps & {
    content?: ReactNode | ReactNode[];
    isLogged: boolean;
};

export const MainNavbar = ({ content, isLogged, ...rest }: IMainNavbarProps) => {
    return (
        <Navbar className={styles.MainNavbar} {...rest}>
            <Container>
                <Navbar.Brand style={{ color: "white" }} href="/"> React-Bootstrap </Navbar.Brand>
                {content}
                <Navbar.Collapse className="justify-content-end">
                    <NavUser isLogged={isLogged} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
