import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { IMainStorage } from "../models/MainStorage";
import { order } from "../models/Order";

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
                    _id: 1, date: 1, "material.title": 1, "material.subtype": 1, "material.count": 1, status: 1,
                },
            );
        } else {
            findDocs = await order.find(
                query,
                {
                    _id: 1, date: 1, "material.title": 1, "material.subtype": 1, "material.count": 1, status: 1,
                },
            ).skip((Number(page) - 1) * Number(perPage)).limit(Number(perPage));
        }
        const orders: Array<IMainStorage> = [];
        for (let i = 0; i < findDocs.length; i += 1) {
            orders.push({
                // eslint-disable-next-line no-underscore-dangle
                ID: findDocs[i]._id.toString(),
                Date: `${findDocs[i].date.getDate().toString().padStart(2, "0")}.${findDocs[i].date.getMonth().toString().padStart(2, "0")}.${findDocs[i].date.getFullYear()} ${findDocs[i].date.getHours().toString().padStart(2, "0")}:${findDocs[i].date.getMinutes().toString().padStart(2, "0")}`,
                Amount: findDocs[i].material.count,
                Status: findDocs[i].status,
                SubType: findDocs[i].material.subtype,
                Type: findDocs[i].material.title,
            });
        }
        return { orders, countOrders };
    }
}
