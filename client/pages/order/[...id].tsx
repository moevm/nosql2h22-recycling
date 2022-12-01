import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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

    const router = useRouter();
    const {
        id, wasteType, amount, price,
    } = router.query;

    return (
        <>
            <header>
                <MainNavbar isLogged={isLogged} content={useNavbarContent(pages)} />
            </header>
            <OrderPage
                {...content.hero}
                id={id as string ?? ""}
                wasteType={wasteType as string ?? ""}
                amount={amount as string ?? ""}
                price={price as string ?? ""}
            />
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
