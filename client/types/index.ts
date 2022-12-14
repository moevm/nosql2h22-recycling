import { WasteType } from "../components/pages/HomePage";

export type Page = {
    link: string;
    title: string;
};

export type HeroContent = {
    title: string;
    description?: string;
    footer?: string;
};

export type HomeContent = {
    hero: {
        logged: HeroContent;
        initial: HeroContent;
    }
};

export type OrderContent = {
    hero: HeroContent;
};

export type StatisticsContent = {
    hero: HeroContent;
};

export type BoilerplateContent = {
    wasteTypes: Array<WasteType>;
    receptions: Array<string>;
};
