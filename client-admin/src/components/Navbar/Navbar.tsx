import React, {ReactNode, useContext, useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavbarProps} from "react-bootstrap";
import {UserLogged} from '../../App'
import "./Navbar.css";

export type IAdminNavbarProps = NavbarProps & {
    content?: ReactNode | ReactNode[];
};

export const AdminNavbar = ({content, ...rest}: IAdminNavbarProps) => {
    const userLogged = useContext(UserLogged);

    const showLoginLogout = () => {
       if(localStorage.getItem("user") !== ""){
           return (
               <>
                   <h3 className='user-name'>{localStorage.getItem("user")}</h3>
                   <a href="/login">
                       <button className='button-logout'>Log Out</button>
                   </a>
               </>

           )
       }else{
           return(
               <>
                   <a href="/login">
                       <button className='button-login'>Log In</button>
                   </a>
               </>
           )
       }
    }

    return (
        <Navbar className="AdminNavbar" {...rest}>
            <h4>Recycle Admin</h4>
            <Container>
                <span>{content}</span>
                {showLoginLogout()}
            </Container>
        </Navbar>
    );
};
