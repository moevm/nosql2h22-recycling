import Nav from "react-bootstrap/Nav";
import {useMemo} from "react";

import {Page} from "./index";

export const useNavbarContent = (pages: Page[]) => {
    return useMemo(() => {
        return (
            <Nav className="me-auto">
                {pages.map((page: Page) => {
                    return <Nav.Link href={page.link}> {page.title} </Nav.Link>
                })}
            </Nav>
        );
    }, [pages]);
}
