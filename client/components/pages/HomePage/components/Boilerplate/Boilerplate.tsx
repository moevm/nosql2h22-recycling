import React, { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from "./Boilerplate.module.css";

export type IBoilerplateProps = {
    buttons: ReactNode | ReactNode[];
    menuItems: ReactNode | ReactNode[];
    maxWeight?: number;
    minWeight?: number;
};

export const Boilerplate = ({
    buttons, menuItems, maxWeight = 100, minWeight = 0,
}: IBoilerplateProps) => {
    return (
        <Container className={styles.Boilerplate}>
            <div className={styles["Boilerplate-Left"]}>
                <Dropdown>
                    <Dropdown.Toggle>
                        Dropdown Button
                    </Dropdown.Toggle>
                    {buttons}
                </Dropdown>

            </div>
            <div className={styles["Boilerplate-Right"]}>
                <form>
                    <label htmlFor="receptionsDropdown" className="form-label"> Choose reception point: </label>
                    <Dropdown id="receptionsDropdown">
                        <Dropdown.Toggle>
                            Dropdown Button
                        </Dropdown.Toggle>
                        { menuItems }
                    </Dropdown>
                    <label htmlFor="kilogramsRange" className="form-label"> Kilograms of waste</label>
                    <input id="kilogramsRange" type="range" className="form-range" />
                    <Button variant="success"> Confirm </Button>
                </form>
            </div>
        </Container>
    );
};
