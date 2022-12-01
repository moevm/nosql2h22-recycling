import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Container from "react-bootstrap/Container";
import { Hero, IHeroProps } from "../../shared/Hero";
import styles from "./StatisticsPage.module.css";
import { TableData } from "../../shared/TableData";

export type IStatisticsPageProps = IHeroProps & {};

export const columns = [
    {
        dataField: "id",
        text: "ID",
        sort: true,
    },
    {
        dataField: "date",
        text: "Date",
        sort: true,
    },
    {
        dataField: "type_of_waste",
        text: "Type of Waste",
    },
    {
        dataField: "subtype",
        text: "SubType",
    },
    {
        dataField: "among",
        text: "Among of waste",
        sort: true,
    },
    {
        dataField: "status",
        text: "Status",
    },
];

export const data: any[] = [
    {
        id: <a href="/order/1?amount=1&wasteType=Metal&price=50"> 1 </a>,
        date: "13-10-2021",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "34kg",
        status: "Status",
    },
    {
        id: <a href="/order/45"> 45 </a>,
        date: "13-11-2021",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "32kg",
        status: "Status",
    },
    {
        id: <a href="/order/111"> 111 </a>,
        date: "12-10-2021",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "14kg",
        status: "Status",
    },
    {
        id: <a href="/order/124"> 124 </a>,
        date: "13-10-2021",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "354kg",
        status: "Status",
    },
    {
        id: 22,
        date: "13-10-2021",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "324kg",
        status: "Status",
    },
    {
        id: 158,
        date: "03-10-2020",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "31kg",
        status: "Status",
    },
    {
        id: 11,
        date: "13-11-2021",
        type_of_waste: "Plastic",
        subtype: "Aluminium",
        among: "324kg",
        status: "Status",
    },
    {
        id: 12,
        date: "03-14-2021",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "31kg",
        status: "Status",
    },
    {
        id: 13,
        date: "19-10-2021",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "324kg",
        status: "Status",
    },
    {
        id: 3736,
        date: "12-10-2020",
        type_of_waste: "Metal",
        subtype: "Aluminium",
        among: "31kg",
        status: "Status",
    },
];

export const StatisticsPage = ({ title, description, footer }: IStatisticsPageProps) => {
    return (
        <main>
            <Hero title={title} description={description} footer={footer} />
            <Container>
                <div className={styles["StatisticsPage-Header"]}>
                    <Dropdown>
                        <DropdownToggle>
                            Filters
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                All
                            </DropdownItem>
                            <DropdownItem>
                                Metal
                            </DropdownItem>
                            <DropdownItem>
                                Plastic
                            </DropdownItem>
                            <DropdownItem>
                                Paper
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div>
                        <span> Current loyalty: </span>
                    </div>
                </div>
                <TableData tableCells={data} headers={columns} />
            </Container>
        </main>
    );
};
