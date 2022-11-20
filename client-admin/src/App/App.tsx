import React from 'react';
import { AdminNavbar } from "../components/Navbar";
import { MainPage } from "../components/MainPage/MainPage";
import {useNavbarContent} from "./App.hooks";
import {pages} from "./App.helpers";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Login} from "../components/Login/Login";
import {AdminPage} from "../components/AdminPage/AdminPage";

export const App = () => {
    return (
        <>
            <header>
                <AdminNavbar expand="lg" content={useNavbarContent(pages)}/>
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/admin_screen" element={<AdminPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};
