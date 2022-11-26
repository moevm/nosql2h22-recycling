import React from "react";
import { useSession } from "next-auth/react";
import { MainNavbar } from "../../components/shared/MainNavbar";
import { StatisticsPage } from "../../components/pages/StatisticsPage";
import { Page, StatisticsContent } from "../../types";
import { useNavbarContent } from "../../hooks/useNavbarContent";
import getContent from "../../helpers/getContent";

export type IStatisticsProps = {
    pages: Page[];
    content: StatisticsContent;
};

const Statistics = ({ pages, content }: IStatisticsProps) => {
    const { data: session } = useSession();
    const isLogged = Boolean(session);

    return (
        <>
            <header>
                <MainNavbar isLogged={isLogged} content={useNavbarContent(pages)} />
            </header>
            <StatisticsPage {...content.hero} />
        </>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            pages: getContent("pages"),
            content: getContent("statistics"),
        },
    };
}

export default Statistics;
