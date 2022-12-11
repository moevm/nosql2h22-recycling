import { Post, Route } from "tsoa";
import mongoose from "mongoose";
import BaseController from "./BaseController";
import { IMainStorage } from "../models/MainStorage";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Orders {
    countOrders: number,
    orders: Array<IMainStorage>
}

@Route("/api/admin")
export default class MainStorageController extends BaseController {
    @Post("/main")
    public async main(): Promise<Orders> {
        const {
            filters, page, perPage,
        } = this.req.body;
        let findDocs: Array<any>;
        const query = {};
        if (filters.type === "All" || filters.type === undefined) {
            query["history.3"] = { $exists: true };
        } else if (filters.subType === "All" || filters.subType === undefined) {
            query["history.3"] = { $exists: true };
            query["material.title"] = filters.type;
        } else {
            query["history.3"] = { $exists: true };
            query["material.title"] = filters.type;
            query["material.subtype"] = filters.subType;
        }

        const userData: Array<string> = filters.user.split(" ");
        let usersQuery: {};
        const users: Array<mongoose.Types.ObjectId> = [];
        if (userData.length === 1) {
            usersQuery = {
                role: "User",
                $or: [{ firstName: { $regex: `${userData[0]}`, $options: "i" } }, { lastName: { $regex: `${userData[0]}`, $options: "i" } }],
            };
        } else if (userData.length === 2) {
            usersQuery = {
                role: "User",
                $or: [{ firstName: { $regex: `^${userData[0]}$`, $options: "i" }, lastName: { $regex: `${userData[1]}`, $options: "i" } }, { firstName: { $regex: `${userData[1]}`, $options: "i" }, lastName: { $regex: `^${userData[0]}$`, $options: "i" } }],
            };
        } else {
            return { countOrders: 0, orders: [] };
        }

        const findUsers = await user.find(usersQuery, { _id: 1 });
        for (let i = 0; i < findUsers.length; i += 1) {
            // eslint-disable-next-line no-underscore-dangle
            users.push(findUsers[i]._id);
        }

        const driverData: Array<string> = filters.driver.split(" ");
        let driversQuery: {};
        const drivers: Array<mongoose.Types.ObjectId> = [];
        if (driverData.length === 1) {
            driversQuery = {
                role: "User",
                $or: [{ firstName: { $regex: `${driverData[0]}`, $options: "i" } }, { lastName: { $regex: `${driverData[0]}`, $options: "i" } }],
            };
        } else if (driverData.length === 2) {
            driversQuery = {
                role: "User",
                $or: [{ firstName: { $regex: `^${driverData[0]}$`, $options: "i" }, lastName: { $regex: `${driverData[1]}`, $options: "i" } }, { firstName: { $regex: `${driverData[1]}`, $options: "i" }, lastName: { $regex: `^${driverData[0]}$`, $options: "i" } }],
            };
        } else {
            return { countOrders: 0, orders: [] };
        }

        const findDrivers = await user.find(driversQuery, { _id: 1 });
        for (let i = 0; i < findDrivers.length; i += 1) {
            // eslint-disable-next-line no-underscore-dangle
            drivers.push(findDrivers[i]._id);
        }

        const intersectionUsersDrivers = findUsers.filter((x) => { return findDrivers.some((x2) => { return x.toString() === x2.toString(); }); });

        const findOrderIDs = await order.find({ _id: { $in: intersectionUsersDrivers } }, { _id: 1 });
        const orderIDs: Array<mongoose.Types.ObjectId> = [];
        for (let i = 0; i < findOrderIDs.length; i += 1) {
            // eslint-disable-next-line no-underscore-dangle
            orderIDs.push(findOrderIDs[i]._id);
        }

        // eslint-disable-next-line no-underscore-dangle
        query["_id"] = { $in: orderIDs };

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
                query["material.count"] = { $gte: new Date(0) };
            } else {
                query["material.count"] = { $gte: new Date(0), $lte: new Date(filters.date.to) };
            }
        } else if (filters.date.to === "") {
            query["material.count"] = { $gte: new Date(filters.date.from) };
        } else {
            query["material.count"] = { $gte: new Date(filters.date.from), $lte: new Date(filters.date.to) };
        }

        const countOrders: number = await order.find(query).count();
        if (perPage === "All") {
            findDocs = await order.find(
                query,
                {
                    _id: 1, date: 1, "material.title": 1, "material.subtype": 1, "material.count": 1, status: 1, users: 1,
                },
            ).sort({ date: 1 });
        } else {
            findDocs = await order.find(
                query,
                {
                    _id: 1, date: 1, "material.title": 1, "material.subtype": 1, "material.count": 1, status: 1, users: 1,
                },
            ).sort({ date: 1 }).skip((Number(page) - 1) * Number(perPage)).limit(Number(perPage));
        }
        const orders: Array<IMainStorage> = [];
        for (let i = 0; i < findDocs.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userName = await user.find({ _id: { $in: findDocs[i].users }, role: "User" }, { firstName: 1, lastName: 1, _id: 0 });
            // eslint-disable-next-line no-await-in-loop
            const driverName = await user.find({ _id: { $in: findDocs[i].users }, role: "Driver" }, { firstName: 1, lastName: 1, _id: 0 });
            orders.push({
                // eslint-disable-next-line no-underscore-dangle
                ID: findDocs[i]._id.toString(),
                Date: findDocs[i].date.toISOString().split("T")[0],
                Driver: `${driverName[0].firstName} ${driverName[0].lastName}`,
                User: `${userName[0].firstName} ${userName[0].lastName}`,
                Amount: findDocs[i].material.count,
                Status: findDocs[i].status,
                SubType: findDocs[i].material.subtype,
                Type: findDocs[i].material.title,
            });
        }
        return { orders, countOrders };
    }
}
