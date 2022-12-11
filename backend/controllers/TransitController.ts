import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Transit {
    carrier: string,
    reception: string,
    date: string,
    type: string,
    subType: string,
    amount: number
}

interface Transits {
    countTransits: number,
    transits: Array<Transit>
}

@Route("/api/admin")
export default class MainStorageController extends BaseController {
    @Post("/transit")
    public async transit(): Promise<Transits> {
        const {
            mainFilter, mainFilterValue, filters, page, perPage,
        } = this.req.body;
        let query: {};
        let skip: number;
        let limit: number;
        let findDocs: Array<any> = [];
        const transits: Array<Transit> = [];
        if (perPage === "All") {
            skip = 0;
            limit = 0;
        } else {
            skip = (Number(page) - 1) * Number(perPage);
            limit = Number(perPage);
        }

        let startDate: Date;
        let endDate: Date;
        let startAmount: number;
        let endAmount: number;
        const { type } = filters;
        const { subType } = filters;
        if (filters.date.from === "") {
            if (filters.date.to === "") {
                startDate = new Date(0);
                endDate = new Date();
            } else {
                startDate = new Date(0);
                endDate = new Date(filters.date.to);
            }
        } else if (filters.date.to === "") {
            startDate = new Date(filters.date.from);
            endDate = new Date();
        } else {
            startDate = new Date(filters.date.from);
            endDate = new Date(filters.date.to);
        }

        if (filters.amount.from === "") {
            if (filters.amount.to === "") {
                startAmount = 0;
                endAmount = Number.MAX_SAFE_INTEGER;
            } else {
                startAmount = 0;
                endAmount = parseInt(filters.amount.to, 10);
            }
        } else if (filters.amount.to === "") {
            startAmount = parseInt(filters.amount.from, 10);
            endAmount = Number.MAX_SAFE_INTEGER;
        } else {
            startAmount = parseInt(filters.amount.from, 10);
            endAmount = parseInt(filters.amount.to, 10);
        }

        if (mainFilter === "Reception") {
            findDocs = await order.find({
                "reception.address": { $regex: mainFilterValue, $options: "i" },
                status: "In delivery",
                "material.title": { $regex: type, options: "i" },
                "material.subtype": { $regex: subType, options: "i" },
                date: { $gte: startDate, $lte: endDate },
                "material.count": { $gte: startAmount, $lte: endAmount },
            }, {
                users: 1, "reception.address": 1, "material.title": 1, "material.subtype": 1, "material.count": 1, history: 1, _id: 0,
            });
        } if (mainFilter === "Carrier") {
            const userData: Array<string> = mainFilterValue.split(" ");
            if (userData.length === 1) {
                query = {
                    role: "Driver",
                    $or: [{ firstName: { $regex: `${userData[0]}`, $options: "i" } }, { lastName: { $regex: `${userData[0]}`, $options: "i" } }],
                };
            } else if (userData.length === 2) {
                query = {
                    role: "Driver",
                    $or: [{ firstName: { $regex: `^${userData[0]}$`, $options: "i" }, lastName: { $regex: `${userData[1]}`, $options: "i" } }, { firstName: { $regex: `${userData[1]}`, $options: "i" }, lastName: { $regex: `^${userData[0]}$`, $options: "i" } }],
                };
            } else {
                return { countTransits: 0, transits: [] };
            }
            const findOrders = await user.find(query, { orders: 1, _id: 0 });
            if (findOrders.length === 0) {
                return { countTransits: 0, transits: [] };
            }
            for (let i = 0; i < findOrders.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                findDocs = findDocs.concat(await order.find({
                    _id: { $in: findOrders[i].orders },
                    status: "In delivery",
                    "material.title": { $regex: type, options: "i" },
                    "material.subtype": { $regex: subType, options: "i" },
                    date: { $gte: startDate, $lte: endDate },
                    "material.count": { $gte: startAmount, $lte: endAmount },
                }, {
                    users: 1, "reception.address": 1, "material.title": 1, "material.subtype": 1, "material.count": 1, history: 1, _id: 0,
                }));
            }
        }
        const countTransits = findDocs.length;
        if (limit === 0) {
            limit = countTransits;
        }
        for (let i = skip; i < skip + limit; i += 1) {
            if (i >= countTransits) {
                break;
            }
            // eslint-disable-next-line no-await-in-loop
            const carrier = await user.find({ role: "Driver", _id: { $in: findDocs[i].users } }, { firstName: 1, lastName: 1, _id: 0 });
            transits.push({
                date: findDocs[i].history[2].date.toISOString().split("T")[0],
                subType: findDocs[i].material.subtype,
                type: findDocs[i].material.title,
                reception: findDocs[i].reception.address,
                amount: findDocs[i].material.count,
                carrier: `${carrier[0].firstName} ${carrier[0].lastName}`,
            });
        }
        return { countTransits, transits };
    }
}
