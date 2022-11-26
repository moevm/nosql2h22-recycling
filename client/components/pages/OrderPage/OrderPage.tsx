import React from "react";
import { Hero, IHeroProps } from "../../shared/Hero";

export type IOrderPageProps = IHeroProps & {};

export const OrderPage = ({ title, description, footer }: IOrderPageProps) => {
    return (
        <main>
            <Hero title={title} description={description} footer={footer} />
        </main>
    );
};
