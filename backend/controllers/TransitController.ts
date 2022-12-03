import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Transit {
    carrier: string,
    reception: string,
    amount: number
}

@Route("/api/admin")
export default class MainStorageController extends BaseController {
    @Post("/transit")
    public async transit(): Promise<Array<Transit>> {
        const {
            filter, filterValue,
        } = this.req.body;
        let query: {};
        let findDocs: Array<any> = [];
        const receptions: Array<Transit> = [];
        if (filter === "Reception") {
            findDocs = await order.find({ "reception.address": { $regex: filterValue }, status: "In delivery" }, {
                users: 1, "reception.address": 1, "material.count": 1, _id: 0,
            });
        } if (filter === "Carrier") {
            const userData: Array<string> = filterValue.split(" ");
            if (userData.length === 1) {
                query = {
                    role: "Driver",
                    $or: [{ firstName: { $regex: `${userData[0]}` } }, { lastName: { $regex: `${userData[0]}` } }],
                };
            } else if (userData.length === 2) {
                query = {
                    role: "Driver",
                    $or: [{ firstName: { $regex: `^${userData[0]}$` }, lastName: { $regex: `${userData[1]}` } }, { firstName: { $regex: `${userData[1]}` }, lastName: { $regex: `^${userData[0]}$` } }],
                };
            } else {
                return [];
            }
            const findOrders = await user.find(query, { orders: 1, _id: 0 });
            if (findOrders.length === 0) {
                return [];
            }
            for (let i = 0; i < findOrders.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                findDocs = findDocs.concat(await order.find({ _id: { $in: findOrders[i].orders }, status: "In delivery" }, {
                    users: 1, "reception.address": 1, "material.count": 1, _id: 0,
                }));
            }
        }
        for (let i = 0; i < findDocs.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const carrier = await user.find({ role: "Driver", _id: { $in: findDocs[i].users } }, { firstName: 1, lastName: 1, _id: 0 });
            receptions.push({
                reception: findDocs[i].reception.address,
                amount: findDocs[i].material.count,
                carrier: `${carrier[0].firstName} ${carrier[0].lastName}`,
            });
        }
        return receptions;
    }
}
