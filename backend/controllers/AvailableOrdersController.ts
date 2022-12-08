import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Order {
    orderID: string,
    date: string,
    user: string,
    departure: string,
    arrival: string,
    type: string,
    subtype: string,
    amount: number,
    action: string
}

interface Orders {
    countOrders: number,
    orders: Array<Order>
}

@Route("/api/driver")
export default class AvailableOrdersController extends BaseController {
    @Post("/orders")
    public async orders(): Promise<Orders> {
        const {
            filter, filterValue, page, perPage,
        } = this.req.body;
        let findDocs: Array<any> = [];
        const orders: Array<Order> = [];
        let skip: number;
        let limit: number;
        let countOrders: number = 0;
        if (perPage === "All") {
            skip = 0;
            limit = 0;
        } else {
            skip = (Number(page) - 1) * Number(perPage);
            limit = Number(perPage);
        }
        if (filter === "Point of Departure") {
            findDocs = await order.aggregate([{ $match: { "reception.address": { $regex: filterValue, $options: "i" }, status: "For export" } }]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([{ $match: { "reception.address": { $regex: filterValue, $options: "i" }, status: "For export" } }]);
            countOrders = allFindDocs.length;
        } if (filter === "Type of waste") {
            findDocs = await order.aggregate([{ $match: { "material.title": { $regex: filterValue, $options: "i" }, status: "For export" } }]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([{ $match: { "material.title": { $regex: filterValue, $options: "i" }, status: "For export" } }]);
            countOrders = allFindDocs.length;
        } if (filter === "Subtype") {
            findDocs = await order.aggregate([{ $match: { "material.subtype": { $regex: filterValue, $options: "i" }, status: "For export" } }]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([{ $match: { "material.subtype": { $regex: filterValue, $options: "i" }, status: "For export" } }]);
            countOrders = allFindDocs.length;
        }
        for (let i = 0; i < findDocs.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop,no-underscore-dangle
            const usersForOrder = await user.find({ orders: { $in: findDocs[i]._id }, role: "User" }, { firstName: 1, lastName: 1, _id: 0 });
            orders.push({
                // eslint-disable-next-line no-underscore-dangle
                orderID: findDocs[i]._id.toString(),
                action: "",
                amount: findDocs[i].material.count,
                arrival: "Storage",
                departure: findDocs[i].reception.address,
                subtype: findDocs[i].material.subtype,
                type: findDocs[i].material.title,
                date: findDocs[i].date.toISOString().split("T")[0],
                user: `${usersForOrder[0].firstName} ${usersForOrder[0].lastName}`,
            });
        }
        return { countOrders, orders };
    }
}
