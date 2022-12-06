import { Post, Route } from "tsoa";
import mongoose from "mongoose";
import BaseController from "./BaseController";
import { order } from "../models/Order";

@Route("/api/driver")
export default class FinishOrderController extends BaseController {
    @Post("/finish")
    public async finish(): Promise<any> {
        const {
            orderID,
        } = this.req.body;
        await order.updateOne({ _id: new mongoose.Types.ObjectId(orderID) }, { $set: { status: "Delivered" } });
        await order.updateOne({ _id: new mongoose.Types.ObjectId(orderID) }, { $push: { history: { status: "Delivered", date: new Date() } } });
    }
}
