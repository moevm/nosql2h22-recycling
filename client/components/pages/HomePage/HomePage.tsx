import React from "react";
import { Hero, IHeroProps } from "../../shared/Hero";

export type IHomePageProps = IHeroProps & {};

export const HomePage = ({ title, description, footer }: IHomePageProps) => {
    return (
        <main>
            <Hero title={title} description={description} footer={footer} />
        </main>
    );
};
