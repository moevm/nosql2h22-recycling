import React, { ReactNode, useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavbarProps } from "react-bootstrap";

import { signIn, signOut } from "next-auth/react";
import styles from "./MainNavbar.module.css";
import { NavUser } from "./components";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

export type IMainNavbarProps = NavbarProps & {
    content?: ReactNode | ReactNode[];
    isLogged: boolean;
};

export const MainNavbar = ({ content, isLogged, ...rest }: IMainNavbarProps) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const loginConfirmHandler = useCallback(async () => {
        await signIn("yandex");
    }, [signIn]);

    const logoutConfirmHandler = useCallback(async () => {
        await signOut();
    }, [signOut]);

    const loginOpenHandler = useCallback(() => {
        setShowLoginModal(true);
    }, []);

    const loginCloseHandler = useCallback(() => {
        setShowLoginModal(false);
    }, []);

    const logoutOpenHandler = useCallback(() => {
        setShowLogoutModal(true);
    }, []);

    const logoutCloseHandler = useCallback(() => {
        setShowLogoutModal(false);
    }, []);

    return (
        <>
            <Navbar className={styles.MainNavbar} {...rest}>
                <Container>
                    <Navbar.Brand style={{ color: "white" }} href="/"> React-Bootstrap </Navbar.Brand>
                    {content}
                    <Navbar.Collapse className="justify-content-end">
                        <NavUser
                            onLogin={loginOpenHandler}
                            onLogout={logoutOpenHandler}
                        />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ConfirmationModal
                title="Login with yandex:"
                onConfirm={loginConfirmHandler}
                onClose={loginCloseHandler}
                show={showLoginModal}
            />
            <ConfirmationModal
                title="Are you sure want to logout?"
                onConfirm={logoutConfirmHandler}
                onClose={logoutCloseHandler}
                show={showLogoutModal}
            />
        </>
    );
};
