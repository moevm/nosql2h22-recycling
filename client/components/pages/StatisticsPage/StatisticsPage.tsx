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

export const StatisticsPage = ({ title, description, footer }: IStatisticsPageProps) => {
    const { data: session, status } = useSession();
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [orders, setOrders] = useState([]);
    const [loyalty, setLoyalty] = useState(0);

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
        server.get(`/user/orders?login=${login}&page=${page}&perPage=${perPage}`).then((res) => {
            setTotal(res.data.count);
            setOrders(buildData(res.data.result));
        }).catch((e) => {
            console.error(e);
        });
    }, [page, perPage, status]);

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
