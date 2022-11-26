import React from "react";
import Container from "react-bootstrap/Container";

export type IHeroProps = {
    title: string;
    description?: string;
    footer?: string;
};

export const Hero = ({ title, description, footer }: IHeroProps) => {
    return (
        <Container>
            <h1>
                {title}
            </h1>
            {Boolean(description) && (
                <p>
                    {description}
                </p>
            )}
            {Boolean(footer) && (
                <p>
                    {footer}
                </p>
            )}
        </Container>
    );
};
