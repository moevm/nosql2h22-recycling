import React from 'react';
import { AdminNavbar } from "../components/Navbar";
import {useNavbarContent} from "./App.hooks";
import {pages} from "./App.helpers";

export const App = () => {
    return (
        <>
            <header>
                <AdminNavbar expand="lg" content={useNavbarContent(pages)}/>
            </header>
            <main>
                <p> Example </p>
            </main>
            <footer>
                <p> Footer </p>
            </footer>
        </>
    );
};
