import React from "react";
import { Hero, IHeroProps } from "../../shared/Hero";

export type IStatisticsPageProps = IHeroProps & {};

export const StatisticsPage = ({ title, description, footer }: IStatisticsPageProps) => {
    return (
        <main>
            <Hero title={title} description={description} footer={footer} />
        </main>
    );
};
