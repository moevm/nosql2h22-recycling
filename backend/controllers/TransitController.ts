import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Transit {
    carrier: string,
    reception: string,
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
            filter, filterValue, page, perPage,
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
        if (filter === "Reception") {
            findDocs = await order.find({ "reception.address": { $regex: filterValue, $options: "i" }, status: "In delivery" }, {
                users: 1, "reception.address": 1, "material.count": 1, _id: 0,
            });
        } if (filter === "Carrier") {
            const userData: Array<string> = filterValue.split(" ");
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
                findDocs = findDocs.concat(await order.find({ _id: { $in: findOrders[i].orders }, status: "In delivery" }, {
                    users: 1, "reception.address": 1, "material.count": 1, _id: 0,
                }));
            }
        }
        const countTransits = findDocs.length;
        for (let i = skip; i < skip + limit; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const carrier = await user.find({ role: "Driver", _id: { $in: findDocs[i].users } }, { firstName: 1, lastName: 1, _id: 0 });
            transits.push({
                reception: findDocs[i].reception.address,
                amount: findDocs[i].material.count,
                carrier: `${carrier[0].firstName} ${carrier[0].lastName}`,
            });
        }
        return { countTransits, transits };
    }
}
