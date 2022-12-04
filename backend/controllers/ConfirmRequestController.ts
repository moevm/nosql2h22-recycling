import { Post, Route } from "tsoa";
import mongoose from "mongoose";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

@Route("/api/driver")
export default class ConfirmRequestController extends BaseController {
    @Post("/confirm")
    public async confirm(): Promise<any> {
        const { orderID, login } = this.req.body;
        await order.updateOne({ _id: new mongoose.Types.ObjectId(orderID) }, { $set: { status: "In transit" } });
        await order.updateOne({ _id: new mongoose.Types.ObjectId(orderID) }, { $push: { history: { date: new Date(), status: "In transit" } } });
        await user.updateOne(
            { login },
            { $push: { orders: new mongoose.Types.ObjectId(orderID) } },
        );
    }
}
