import React from "react";
import { useSession } from "next-auth/react";
import { MainNavbar } from "../components/shared/MainNavbar";
import { HomePage } from "../components/pages/HomePage";
import getContent from "../helpers/getContent";
import { Page } from "../types";
import { useNavbarContent } from "../hooks/useNavbarContent";

export type IHomeProps = {
    pages: Page[];
};

const Home = ({ pages }: IHomeProps) => {
    const { data: session } = useSession();
    const isLogged = Boolean(session);

    return (
        <>
            <header>
                <MainNavbar isLogged={isLogged} content={useNavbarContent(pages)} expand="lg" />
            </header>
            <HomePage />
        </>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            pages: getContent("pages"),
        },
    };
}

export default Home;
