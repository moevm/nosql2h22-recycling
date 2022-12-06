import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Container from "react-bootstrap/Container";
import { useSession } from "next-auth/react";
import { Hero, IHeroProps } from "../../shared/Hero";
import styles from "./StatisticsPage.module.css";
import { TableData } from "../../shared/TableData";
import { server } from "../../../config/axios";
import { useFilters } from "./StatisticsPage.hooks";

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
// @ts-ignore
export const buildData = (res) => {
    console.log(res);
    // @ts-ignore
    return res?.map((order) => {
        return {
            id: (
                // eslint-disable-next-line no-underscore-dangle
                <a href={`/order/${order?._id}?amount=${order?.material?.count}&wasteType=${order?.material?.title}&price=${order?.material?.price}`}>
                    {/* eslint-disable-next-line no-underscore-dangle */}
                    {order?._id}
                </a>
            ),
            date: order?.date,
            type_of_waste: order?.material?.title,
            subtype: order?.material?.subtype,
            among: `${order?.material?.count} kg`,
            status: order?.status,
        };
    });
};

const filters = ["All", "Metal", "Plastic", "Glass", "Paper", "Organic", "Battery"];

export const StatisticsPage = ({ title, description, footer }: IStatisticsPageProps) => {
    const { data: session, status } = useSession();
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [orders, setOrders] = useState([]);
    const [loyalty, setLoyalty] = useState(0);
    const [filter, setFilter] = useState<string>("All");

    useEffect(() => {
        const login = session?.user?.email?.split("@")[0];
        server.get(`/user?login=${login}`).then((res) => {
            setLoyalty(res.data.loyalty);
        }).catch((err) => {
            console.error(err);
        });
    }, [session]);

    useEffect(() => {
        const login = session?.user?.email?.split("@")[0];
        console.log(login);
        // @ts-ignore
        server.get(filter !== "All"
            ? `/user/orders?login=${login}&page=${page}&perPage=${perPage}&filter=${filter}`
            : `/user/orders?login=${login}&page=${page}&perPage=${perPage}&filter=.`).then((res) => {
            setTotal(res.data.count);
            setOrders(buildData(res.data.result));
        }).catch((e) => {
            console.error(e);
        });
    }, [page, perPage, status, filter]);

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
                            {useFilters(filters, setFilter)}
                        </DropdownMenu>
                    </Dropdown>
                    <div>
                        <span>
                            Current loyalty:
                            {" "}
                            {loyalty}
                        </span>
                    </div>
                </div>
                {(status === "authenticated") && (
                    <TableData
                        total={total}
                        setPage={setPage}
                        setPerPage={setPerPage}
                        page={page}
                        perPage={perPage}
                        tableCells={orders || []}
                        headers={columns}
                    />
                )}
            </Container>
        </main>
    );
};
