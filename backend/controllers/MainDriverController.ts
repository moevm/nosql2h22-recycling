import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { user } from "../models/User";
import { order } from "../models/Order";

interface Order {
    _id: string,
    date: string,
    PointOfDeparture: string,
    PointOfArrival: string,
    TypeOfWaste: string,
    Subtype: string,
    Amount: number,
    request: ""
}

interface Driver {
    driver: string,
    orders: Array<Order>,
    countOrders: number
}

@Route("/api/driver")
export default class MainDriverController extends BaseController {
    @Post("/main")
    public async main(): Promise<Driver> {
        const {
            login, page, perPage, filters,
        } = this.req.body;
        let skip: number;
        let limit: number;
        let countOrders: number = 0;
        const query = {};
        const orders: Array<Order> = [];
        if (perPage === "All") {
            skip = 0;
            limit = 0;
        } else {
            skip = (Number(page) - 1) * Number(perPage);
            limit = Number(perPage);
        }

        query["reception.address"] = { $regex: filters.pointOfDeparture, $options: "i" };
        query["material.title"] = { $regex: filters.type, $options: "i" };
        query["material.subtype"] = { $regex: filters.subType, $options: "i" };

        if (filters.amount.from === "") {
            if (filters.amount.to === "") {
                query["material.count"] = { $gte: 0 };
            } else {
                query["material.count"] = { $gte: 0, $lte: parseInt(filters.amount.to, 10) };
            }
        } else if (filters.amount.to === "") {
            query["material.count"] = { $gte: parseInt(filters.amount.from, 10) };
        } else {
            query["material.count"] = { $gte: parseInt(filters.amount.from, 10), $lte: parseInt(filters.amount.to, 10) };
        }

        if (filters.date.from === "") {
            if (filters.date.to === "") {
                query["date"] = { $gte: new Date(0) };
            } else {
                query["date"] = { $gte: new Date(0), $lte: new Date(filters.date.to) };
            }
        } else if (filters.date.to === "") {
            query["date"] = { $gte: new Date(filters.date.from) };
        } else {
            query["date"] = { $gte: new Date(filters.date.from), $lte: new Date(filters.date.to) };
        }

        const driverData = await user.find(
            { login },
            {
                firstName: 1, lastName: 1, orders: 1, _id: 0,
            },
        );

        query["_id"] = { $in: driverData[0].orders };
        query["status"] = "In delivery";
        const findOrders = await order.find(
            query,
        ).sort({ date: 1 }).skip(skip).limit(limit);
        countOrders = await order.find(
            query,
        ).count();
        const driver = `${driverData[0].firstName} ${driverData[0].lastName}`;
        for (let i = 0; i < findOrders.length; i += 1) {
            orders.push({
                date: findOrders[i].date.toISOString().split("T")[0],
                Amount: findOrders[i].material.count,
                PointOfArrival: "Storage",
                PointOfDeparture: findOrders[i].reception.address,
                Subtype: findOrders[i].material.subtype,
                TypeOfWaste: findOrders[i].material.title,
                request: "",
                // eslint-disable-next-line no-underscore-dangle
                _id: findOrders[i]._id.toString(),
            });
        }
        return { driver, countOrders, orders };
    }
}
