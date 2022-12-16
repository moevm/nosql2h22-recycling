import { Post, Route } from "tsoa";
import mongoose from "mongoose";
import BaseController from "./BaseController";
import { userSchema } from "../models/User";
import { orderSchema } from "../models/Order";

interface Status {
    status: string;
    file: string;
}

@Route("/api/admin")
export default class ImportController extends BaseController {
    private response: Status = { status: "OK", file: "" };

    @Post("/import")
    public async import(): Promise<Status> {
        const { users, orders } = this.req.body;
        const tmpMongoURL: string = "mongodb://localhost:27017/tmpRecycling";
        const mongoURL: string = "mongodb://localhost:27017/Recycling";
        const tmpDb = await mongoose.createConnection(tmpMongoURL);
        tmpDb.asPromise()
            .then((res) => {
                console.log("Connected to database tmpRecycling on port 27017");
            })
            .catch((err) => {
                if (err instanceof Error) console.error(err.message);
            });
        try {
            const model1: mongoose.Model<any> = tmpDb.model("User", userSchema);
            try {
                await model1.insertMany(users);
            } catch (e) {
                return { status: "neOK", file: "users" };
            }
            try {
                const mongoDB = await mongoose.createConnection(mongoURL);
                const userModel1: mongoose.Model<any> = mongoDB.model("User", userSchema);
                await userModel1.insertMany(users);
            } catch (e) {
                return { status: "neOK", file: "users" };
            }
        } catch (e) {
            return { status: "neOK", file: "users" };
        }

        try {
            const model2: mongoose.Model<any> = tmpDb.model("Order", orderSchema);
            try {
                await model2.insertMany(orders);
            } catch (e) {
                return { status: "neOK", file: "orders" };
            }
            try {
                const mongoDB = await mongoose.createConnection(mongoURL);
                const userModel2: mongoose.Model<any> = mongoDB.model("Order", orderSchema);
                await userModel2.deleteMany({});
                await userModel2.insertMany(orders);
            } catch (e) {
                return { status: "neOK", file: "orders" };
            }
        } catch (e) {
            return { status: "neOK", file: "orders" };
        }
        return this.response;
    }
}
