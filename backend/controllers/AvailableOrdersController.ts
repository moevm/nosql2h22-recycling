import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";

interface Order {
    departure: string,
    arrival: string,
    type: string,
    subtype: string,
    amount: number,
    action: string
}

@Route("/api/driver")
export default class AvailableOrdersController extends BaseController {
    @Post("/orders")
    public async orders(): Promise<Array<Order>> {
        const { filter, filterValue } = this.req.body;
        let findDocs: Array<any> = [];
        const orders: Array<Order> = [];
        if (filter === "Point of Departure") {
            findDocs = await order.aggregate([{ $match: { "reception.address": { $regex: filterValue, $options: "i" }, status: "For export" } }]);
        } if (filter === "Type of waste") {
            findDocs = await order.aggregate([{ $match: { "material.title": { $regex: filterValue, $options: "i" }, status: "For export" } }]);
        } if (filter === "Subtype") {
            findDocs = await order.aggregate([{ $match: { "material.subtype": { $regex: filterValue, $options: "i" }, status: "For export" } }]);
        }
        for (let i = 0; i < findDocs.length; i += 1) {
            orders.push({
                action: "",
                amount: findDocs[i].material.amount,
                arrival: "Storage",
                departure: findDocs[i].reception.address,
                subtype: findDocs[i].material.subtype,
                type: findDocs[i].material.title,
            });
        }
        return orders;
    }
}
