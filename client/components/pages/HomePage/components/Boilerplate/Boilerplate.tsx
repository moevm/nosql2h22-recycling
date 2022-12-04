import React, { ReactNode, useState } from "react";
import Container from "react-bootstrap/Container";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSession } from "next-auth/react";
import styles from "./Boilerplate.module.css";
import { server } from "../../../../../config/axios";

export type IBoilerplateProps = {
    buttons: ReactNode | ReactNode[];
    menuItems: ReactNode | ReactNode[];
    maxWeight?: number;
    minWeight?: number;
    wasteType: string;
    reception: string;
};

export const Boilerplate = ({
    buttons, menuItems, maxWeight = 100, minWeight = 0, wasteType, reception,
}: IBoilerplateProps) => {
    const [count, setCount] = useState<number>(0);
    const { data: session } = useSession();

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
                    <input
                        onChange={(event) => {
                            setCount(Number(event.target.value));
                        }}
                        id="kilogramsRange"
                        type="range"
                        className="form-range"
                        min={minWeight}
                        max={maxWeight}
                    />
                    <Button
                        variant="success"
                        onClick={async () => {
                            try {
                                await server.post("/user/order", {
                                    login: session?.user?.email?.split("@")[0],
                                    count,
                                    material: wasteType.split(" ")[0],
                                    subtype: wasteType.split(" ")[1],
                                    reception,
                                    price: 100,
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        Confirm
                    </Button>
                </form>
            </div>
        </Container>
    );
};
