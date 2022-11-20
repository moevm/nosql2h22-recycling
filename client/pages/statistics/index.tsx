import React from "react";
import { useSession } from "next-auth/react";
import { MainNavbar } from "../../components/shared/MainNavbar";
import { StatisticsPage } from "../../components/pages/StatisticsPage";
import { Page } from "../../types";
import { useNavbarContent } from "../../hooks/useNavbarContent";
import getContent from "../../helpers/getContent";

export type IStatisticsProps = {
    pages: Page[];
};

const Statistics = ({ pages }: IStatisticsProps) => {
    const { data: session } = useSession();
    const isLogged = Boolean(session);

    return (
        <>
            <header>
                <MainNavbar isLogged={isLogged} content={useNavbarContent(pages)} />
            </header>
            <StatisticsPage />
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

export default Statistics;
