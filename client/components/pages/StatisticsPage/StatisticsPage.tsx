import React, { useEffect, useState } from "react";
import {Dropdown, Modal, ModalDialog} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Container from "react-bootstrap/Container";
import { useSession } from "next-auth/react";
import { Hero, IHeroProps } from "../../shared/Hero";
import styles from "./StatisticsPage.module.css";
import { TableData } from "../../shared/TableData";
import { server } from "../../../config/axios";
import { useFilters } from "./StatisticsPage.hooks";
import Button from "react-bootstrap/Button";

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

const typeFilters = [
    { value: "All", type: "type" },
    { value: "Metal", type: "type" },
    { value: "Plastic", type: "type" },
    { value: "Glass", type: "type" },
    { value: "Paper", type: "type" },
    { value: "Organic", type: "type" },
    { value: "Battery", type: "type" },
];

const subtypeFilters = [
    { value: "All", type: "subtype" },
    { value: "Corrugated cardboard", type: "subtype" },
    { value: "Other cardboard", type: "subtype" },
    { value: "Paper", type: "subtype" },
    { value: "Wax paper", type: "subtype" },
    { value: "Steel", type: "subtype" },
    { value: "Aluminum", type: "subtype" },
    { value: "Colorless glass", type: "subtype" },
    { value: "Green glass", type: "subtype" },
    { value: "Brown glass", type: "subtype" },
    { value: "Bottle glass dark brown", type: "subtype" },
    { value: "Bottle glass light brown", type: "subtype" },
    { value: "Glass with low lead content", type: "subtype" },
    { value: "Crystal", type: "subtype" },
    { value: "Glass coated with copper", type: "subtype" },
    { value: "Silver plated glass", type: "subtype" },
    { value: "Gilded glass", type: "subtype" },
    { value: "Polyethylene terephthalate", type: "subtype" },
    { value: "High density polyethylene", type: "subtype" },
    { value: "PVC", type: "subtype" },
    { value: "Low density polyethylene", type: "subtype" },
    { value: "Polypropylene", type: "subtype" },
    { value: "Polystyrene", type: "subtype" },
    { value: "Other types of plastic", type: "subtype" },
    { value: "ABS plastic", type: "subtype" },
    { value: "Wood", type: "subtype" },
    { value: "Cork", type: "subtype" },
    { value: "Cotton", type: "subtype" },
    { value: "Jute fiber", type: "subtype" },
    { value: "Lead acid battery", type: "subtype" },
    { value: "Alkaline element", type: "subtype" },
    { value: "Nickel-cadmium battery", type: "subtype" },
    { value: "Nickel metal hydride battery", type: "subtype" },
    { value: "Lithium battery", type: "subtype" },
    { value: "Silver-zinc accumulator", type: "subtype" },
    { value: "Manganese-zinc element", type: "subtype" },
];

const statusFilters = [
    { value: "All", type: "status" },
    { value: 'Created', type: "status"},
    { value: 'For export', type: "status"},
    { value: 'In delivery', type: "status"},
    { value: 'Delivered', type: "status"},
]

export type IFilters = {
    type?: string;
    subtype?: string;
    status?: string;
    date?: { from: Date, to: Date }
    weight?: { from: number, to: number }
};

export const StatisticsPage = ({ title, description, footer }: IStatisticsPageProps) => {
    const { data: session, status } = useSession();
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(5);
    const [orders, setOrders] = useState([]);
    const [loyalty, setLoyalty] = useState(0);
    const [filter, setFilter] = useState<IFilters>({});
    const [weightModalVisible, setWeightModalVisible] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [weightMin, setWeightMin] = useState(0);
    const [weightMax, setWeightMax] = useState(150);
    const [dateMin, setDateMin] = useState(new Date(0));
    const [dateMax, setDateMax] = useState(new Date());

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
        console.log(filter);
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
                            Type filters
                        </DropdownToggle>
                        <DropdownMenu>
                            {useFilters(typeFilters, setFilter)}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownToggle>
                            Subtype filters
                        </DropdownToggle>
                        <DropdownMenu>
                            {useFilters(subtypeFilters, setFilter)}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownToggle>
                            Status filters
                        </DropdownToggle>
                        <DropdownMenu>
                            {useFilters(statusFilters, setFilter)}
                        </DropdownMenu>
                    </Dropdown>
                    <Button onClick={() => {setDateModalVisible(true)}}>Date filter</Button>
                    <Button onClick={() => {setWeightModalVisible(true)}}>Weight filter</Button>
                    <Button onClick={() => {setFilter({})}}>
                        Reset all
                    </Button>
                    <div>
                        <span>
                            Current loyalty:
                            {" "}
                            {loyalty}
                        </span>
                    </div>
                </div>
                <p>Chosen filters: {Object.entries(filter).map((pair) => {
                    const [key, item] = pair;
                    if (typeof item === "string") return `${key}: ${item}`;
                    return `${key}: ${Object.values(item).join(', ')}`;
                }).join("; ")}</p>
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
            {weightModalVisible && <Modal show={weightModalVisible} onHide={() => {
            setWeightModalVisible(false);}
            }>
                <Modal.Header>Choose waste range:</Modal.Header>
                <Modal.Body>
                    <label htmlFor="kilogramsMin" className="form-label"> Minimal weight:</label>
                    <input
                        onChange={(event) => {
                            setWeightMin(Math.min(weightMax, Number(event.target.value)))
                        }}
                        id="kilogramsMin"
                        type="number"
                        className="form-number"
                        min={0}
                        max={150}
                    />
                    <label htmlFor="kilogramsMax" className="form-label"> Maximal weight:</label>
                    <input
                        onChange={(event) => {
                            setWeightMax(Math.max(weightMin, Number(event.target.value)))
                        }}
                        id="kilogramsMax"
                        type="number"
                        className="form-number"
                        min={0}
                        max={150}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setFilter((prevState) => {
                            const newState = Object.assign({}, prevState);
                            newState.weight = { from: weightMin, to: weightMax };
                            return newState;
                        });
                        setWeightModalVisible(false);
                    }}> Confirm </Button>
                </Modal.Footer>
            </Modal>}
            {dateModalVisible && <Modal show={dateModalVisible} onHide={() => {
                setDateModalVisible(false);}
            }>
                <Modal.Header>Choose date range:</Modal.Header>
                <Modal.Body>
                    <label htmlFor="dateMin" className="form-label">Start date:</label>
                    <input
                        onChange={(event) => {
                            const date = new Date(event.target.value);
                            const timeMin = date.getTime();
                            const timeMax = dateMax.getTime();
                            setDateMin(timeMin < timeMax ? date : dateMax);
                        }}
                        id="dateMin"
                        type="date"
                    />
                    <label htmlFor="dateMax" className="form-label"> End date:</label>
                    <input
                        onChange={(event) => {
                            const date = new Date(event.target.value);
                            const timeMax = date.getTime();
                            const timeMin = dateMin.getTime();
                            setDateMin(timeMin < timeMax ? date : dateMin);
                        }}
                        id="dateMax"
                        type="date"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setFilter((prevState) => {
                            const newState = Object.assign({}, prevState);
                            newState.date = { from: dateMin, to: dateMax };
                            return newState;
                        });
                        setDateModalVisible(false);
                    }}> Confirm </Button>
                </Modal.Footer>
            </Modal>}
        </main>
    );
};
