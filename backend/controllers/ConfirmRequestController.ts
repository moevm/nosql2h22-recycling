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
        const userID = await user.find({ login }, { _id: 1 });
        await order.updateOne({ _id: new mongoose.Types.ObjectId(orderID) }, { $set: { status: "In delivery" } });
        await order.updateOne({ _id: new mongoose.Types.ObjectId(orderID) }, { $push: { history: { date: new Date(), status: "In delivery" } } });
        // eslint-disable-next-line no-underscore-dangle
        await order.updateOne({ _id: new mongoose.Types.ObjectId(orderID) }, { $push: { users: userID[0]._id } });
        await user.updateOne(
            { login },
            { $push: { orders: new mongoose.Types.ObjectId(orderID) } },
        );
    }
}
