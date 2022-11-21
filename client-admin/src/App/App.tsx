import React from 'react';
import { AdminNavbar } from "../components/Navbar";
import { MainPage } from "../components/MainPage/MainPage";
import {useNavbarContent} from "./App.hooks";
import {pages} from "./App.helpers";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Login} from "../components/Login/Login";
import {AdminPage} from "../components/AdminPage/AdminPage";
import {ManagerPage} from "../components/ManagerPage/ManagerPage";
import {CarrierPage} from "../components/CarrierPage/CarrierPage";

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
                    <Route path="/manager_screen" element={<ManagerPage/>}/>
                    <Route path="/carrier_screen" element={<CarrierPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};
