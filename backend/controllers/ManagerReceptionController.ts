import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Material {
    type: string,
    subtype: string,
    amount: number,
    occupancy: number,
    request: string
}

interface Manager {
    reception: string,
    materials: Array<Material>
}

@Route("/api/manager")
export default class ManagerReceptionController extends BaseController {
    @Post("/reception")
    public async reception(): Promise<Manager> {
        const {
            login, filter, filterValue,
        } = this.req.body;
        let findDocs: Array<any> = [];
        const materials: Array<Material> = [];
        const userOrders = await user.find({ login }, { orders: 1, _id: 0 }).limit(1);
        const receptionFind = await order.find({ _id: userOrders[0].orders[0] }, { "reception.address": 1, _id: 0 });
        const reception = receptionFind[0].reception.address;
        if (filter === "type") {
            findDocs = await order.aggregate(
                [{ $match: { "reception.address": reception, status: "Created", "material.title": { $regex: filterValue, $options: "i" } } },
                    { $group: { _id: { reception: "$reception.address", type: "$material.title", subtype: "$material.subtype" }, totalELem: { $sum: "$material.count" } } }]
                ,
            );
        } if (filter === "subtype") {
            findDocs = await order.aggregate(
                [{ $match: { "reception.address": reception, status: "Created", "material.subtype": { $regex: filterValue, $options: "i" } } },
                    { $group: { _id: { reception: "$reception.address", subtype: "$material.subtype", type: "$material.title" }, totalELem: { $sum: "$material.count" } } }]
                ,
            );
        }
        for (let i = 0; i < findDocs.length; i += 1) {
            materials.push({
                // eslint-disable-next-line no-underscore-dangle
                type: findDocs[i]._id.type,
                // eslint-disable-next-line no-underscore-dangle
                subtype: findDocs[i]._id.subtype,
                amount: findDocs[i].totalELem,
                occupancy: findDocs[i].totalELem / 100,
                request: "",
            });
        }
        return { reception, materials };
    }
}
