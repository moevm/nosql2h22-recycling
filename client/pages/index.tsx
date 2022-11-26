import React from "react";
import { useSession } from "next-auth/react";
import { MainNavbar } from "../components/shared/MainNavbar";
import { HomePage } from "../components/pages/HomePage";
import getContent from "../helpers/getContent";
import { HomeContent, Page, BoilerplateContent } from "../types";
import { useNavbarContent } from "../hooks/useNavbarContent";

export type IHomeProps = {
    pages: Page[];
    content: HomeContent;
    boilerplate: BoilerplateContent;
};

const Home = ({ pages, content, boilerplate }: IHomeProps) => {
    const { data: session } = useSession();
    const isLogged = Boolean(session);

    const homeHeroProps = isLogged ? content.hero.logged : content.hero.initial;

    return (
        <>
            <header>
                <MainNavbar isLogged={isLogged} content={useNavbarContent(pages)} expand="lg" />
            </header>
            <HomePage isLogged={isLogged} {...homeHeroProps} {...boilerplate} />
        </>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            pages: getContent("pages"),
            content: getContent("home"),
            boilerplate: getContent("boilerplate"),
        },
    };
}

export default Home;
