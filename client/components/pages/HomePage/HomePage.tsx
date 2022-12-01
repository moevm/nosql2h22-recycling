import React from "react";
import Container from "react-bootstrap/Container";
import { Hero, IHeroProps } from "../../shared/Hero";
import { Boilerplate } from "./components/Boilerplate";
import { useReceptions, useWasteType, WasteType } from "./HomePage.hooks";

export type IHomePageProps = IHeroProps &
{
    isLogged: boolean;
    wasteTypes: Array<WasteType>;
    receptions: Array<string>
};

export const HomePage = ({
    title, description, footer, isLogged, wasteTypes, receptions,
}: IHomePageProps) => {
    return (
        <main>
            <Hero title={title} description={description} footer={footer} />
            {isLogged && (
                <Boilerplate
                    buttons={useWasteType(wasteTypes)}
                    menuItems={useReceptions(receptions)}
                />
            )}
        </main>
    );
};
