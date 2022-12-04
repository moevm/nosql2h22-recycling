import { Get, Route, Post } from "tsoa";
import BaseController from "./BaseController";
import { IOrder, order } from "../models/Order";
import { user } from "../models/User";

export type IOrderResponse = Omit<IOrder, "users">;

export type OrdersResponse = {
    count: number;
    result: IOrderResponse[];
};

@Route("api/user")
export default class UserController extends BaseController {
    @Get("/orders")
    public async orders(): Promise<OrdersResponse> {
        const { login, page, perPage } = this.req.query;

        const skip = (Number(page) - 1) * Number(perPage);
        const limit = skip + Number(perPage);

        const currentUser = await user.findOne({ login }, { orders: 1, _id: 0 });

        if (!currentUser) throw new Error("No user found");

        const orders = await order.aggregate<IOrder>([{ $match: { _id: { $in: currentUser.orders } } }]).skip(skip).limit(limit);

        return {
            count: currentUser.orders.length,
            result: orders.map((userOrder: IOrder) => {
                return { ...userOrder } as IOrderResponse;
            }),
        };
    }

    @Post("/order")
    public async order(): Promise<string> {
        const {
            login, material, subtype, count, reception, price,
        } = this.req.body;

        const currentUser = await user.findOne({ login }, { _id: 1 });
        if (!currentUser) throw new Error("No user found");

        const receptionOrders = await order.aggregate(
            [{ $match: { "reception.address": { $regex: reception } } },
                { $group: { _id: { reception: "$reception.address" }, total: { $sum: "$material.count" } } }]
            ,
        );

        if (!receptionOrders) throw new Error("No receptions found");
        // @ts-ignore
        const newTotal = Number(receptionOrders.total || 10000) - Number(count);

        if (newTotal < 0) throw new Error("Cannot hold waste");

        const res = await order.create({
            date: new Date().toDateString(),
            history: {
                status: "Created",
                date: new Date().toDateString(),
            },
            material: {
                title: material,
                subtype,
                count,
                price,
            },
            reception: {
                address: reception,
                limit: 10000,
            },
            status: "Created",
            // eslint-disable-next-line no-underscore-dangle
            users: [currentUser._id],
        });

        if (!res) throw new Error("Creation failed");
        // eslint-disable-next-line no-underscore-dangle
        await user.updateOne({ _id: currentUser._id }, { $push: { orders: res._id } });

        return "ok";
    }
}
