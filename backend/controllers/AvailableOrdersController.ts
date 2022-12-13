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
            mainFilter, mainFilterValue, filters, page, perPage,
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
        let startDate: Date;
        let endDate: Date;
        let startAmount: number;
        let endAmount: number;
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
        if (mainFilter === "Point of Departure") {
            findDocs = await order.aggregate([{
                $match: {
                    "reception.address": { $regex: mainFilterValue, $options: "i" },
                    status: "For export",
                    date: { $gte: startDate, $lte: endDate },
                    "material.count": { $gte: startAmount, $lte: endAmount },
                },
            }]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([{
                $match: {
                    "reception.address": { $regex: mainFilterValue, $options: "i" },
                    status: "For export",
                    date: { $gte: startDate, $lte: endDate },
                    "material.count": { $gte: startAmount, $lte: endAmount },
                },
            }]);
            countOrders = allFindDocs.length;
        } if (mainFilter === "Type of waste") {
            findDocs = await order.aggregate([{
                $match: {
                    "material.title": { $regex: mainFilterValue, $options: "i" },
                    status: "For export",
                    date: { $gte: startDate, $lte: endDate },
                    "material.count": { $gte: startAmount, $lte: endAmount },
                },
            }]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([{
                $match: {
                    "material.title": { $regex: mainFilterValue, $options: "i" },
                    status: "For export",
                    date: { $gte: startDate, $lte: endDate },
                    "material.count": { $gte: startAmount, $lte: endAmount },
                },
            }]);
            countOrders = allFindDocs.length;
        } if (mainFilter === "Subtype") {
            findDocs = await order.aggregate([{
                $match: {
                    "material.subtype": { $regex: mainFilterValue, $options: "i" },
                    status: "For export",
                    date: { $gte: startDate, $lte: endDate },
                    "material.count": { $gte: startAmount, $lte: endAmount },
                },
            }]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([{
                $match: {
                    "material.subtype": { $regex: mainFilterValue, $options: "i" },
                    status: "For export",
                    date: { $gte: startDate, $lte: endDate },
                    "material.count": { $gte: startAmount, $lte: endAmount },
                },
            }]);
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
