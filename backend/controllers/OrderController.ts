import { Get, Route } from "tsoa";
import mongoose from "mongoose";
import BaseController from "./BaseController";
import { order } from "../models/Order";

interface Reception {
    "address": string,
    "limit": number
}

interface Material {
    "title": string,
    "subtype": string,
    "count": number,
    "price": number
}

interface History {
    "status": string,
    "date": Date
}

interface Order {
    "users": Array<mongoose.Types.ObjectId>,
    "status": string,
    "date": Date,
    "reception": Reception,
    "material": Material,
    "history": Array<History>
}

@Route("/api")
export default class OrderController extends BaseController {
    @Get("/order")
    public async order(): Promise<Order> {
        const orderID: string = this.req.query.orderID as string;
        const orderFind = await order.aggregate([
            {
                $addFields: {
                    date: { $dateToString: { format: "%d.%m.%Y %H:%M", date: "$date" } },
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderID),
                },
            },
        ]);
        return orderFind[0];
    }
}
