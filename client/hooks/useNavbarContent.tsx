import Nav from "react-bootstrap/Nav";
import React, { useMemo } from "react";
import { Page } from "../types";

export const useNavbarContent = (pages: Page[]) => {
    return useMemo(() => {
        return (
            <Nav className="me-auto flex-row">
                {pages.map((page: Page) => {
                    return (
                        <Nav.Link style={{ color: "white" }} href={page.link}>
                            {page.title}
                        </Nav.Link>
                    );
                })}
            </Nav>
        );
    }, [pages]);
};
