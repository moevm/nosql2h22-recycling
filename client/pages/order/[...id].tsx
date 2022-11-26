import React from "react";
import { useSession } from "next-auth/react";
import { MainNavbar } from "../../components/shared/MainNavbar";
import { OrderPage } from "../../components/pages/OrderPage";
import getContent from "../../helpers/getContent";
import { OrderContent, Page } from "../../types";
import { useNavbarContent } from "../../hooks/useNavbarContent";

export type IOrderProps = {
    pages: Page[];
    content: OrderContent;
};

const Order = ({ pages, content }: IOrderProps) => {
    const { data: session } = useSession();
    const isLogged = Boolean(session);

    return (
        <>
            <header>
                <MainNavbar isLogged={isLogged} content={useNavbarContent(pages)} />
            </header>
            <OrderPage {...content.hero} />
        </>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            pages: getContent("pages"),
            content: getContent("order"),
        },
    };
}

export default Order;
