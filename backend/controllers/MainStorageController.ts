import { Post, Route } from "tsoa";
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
            type, subType, page, perPage,
        } = this.req.body;
        let findDocs: Array<any>;
        let query: {};
        if (type === "All" || type === undefined) {
            query = {
                "history.3": { $exists: true },
            };
        } else if (subType === "All" || subType === undefined) {
            query = {
                "history.3": { $exists: true },
                "material.title": type,
            };
        } else {
            query = {
                "history.3": { $exists: true },
                "material.title": type,
                "material.subtype": subType,
            };
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
