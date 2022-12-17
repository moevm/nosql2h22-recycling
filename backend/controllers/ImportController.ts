import { Post, Route } from "tsoa";
import mongoose from "mongoose";
import BaseController from "./BaseController";
import { insertUserSchema, userSchema, IUser } from "../models/User";
import { insertOrderSchema, orderSchema } from "../models/Order";

interface Status {
    status: string;
    file: string;
}

const databaseConfig = {
    DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
    DATABASE_NAME: process.env.DATABASE_NAME || "Recycling",
    DATABASE_PORT: process.env.DATABASE_PORT || "27017",
};

const { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } = databaseConfig;

@Route("/api/admin")
export default class ImportController extends BaseController {
    private response: Status = { status: "OK", file: "" };

    @Post("/import")
    public async import(): Promise<Status> {
        const { users, orders } = this.req.body;
        const tmpMongoURL: string = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/tmpRecycling`;
        const mongoURL: string = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
        const tmpDb = await mongoose.createConnection(tmpMongoURL);
        tmpDb.asPromise()
            .then((res) => {
                console.log("Connected to database tmpRecycling on port 27017");
            })
            .catch((err) => {
                if (err instanceof Error) console.error(err.message);
            });
        try {
            const model1: mongoose.Model<any> = tmpDb.model("User", insertUserSchema);
            try {
                await model1.deleteMany({});
                await model1.insertMany(users);
            } catch (e) {
                return { status: "neOK", file: "users" };
            }
            try {
                const mongoDB = await mongoose.createConnection(mongoURL);
                const insertUsers: Array<any> = [];
                let insertUser;
                for (let i = 0; i < users.length; i += 1) {
                    insertUser = {};
                    // eslint-disable-next-line no-underscore-dangle
                    insertUser._id = new mongoose.Types.ObjectId(users[i]._id);
                    insertUser.orders = [];
                    for (let j = 0; j < users[i].orders.length; j += 1) {
                        insertUser.orders[j] = new mongoose.Types.ObjectId(users[i].orders[j]);
                    }
                    insertUser.login = users[i].login;
                    insertUser.password = users[i].password;
                    insertUser.email = users[i].email;
                    insertUser.role = users[i].role;
                    insertUser.firstName = users[i].firstName;
                    insertUser.lastName = users[i].lastName;
                    insertUser.loyalty = users[i].loyalty;
                    insertUsers.push(insertUser);
                }
                const userModel1: mongoose.Model<any> = mongoDB.model("User", userSchema);
                await userModel1.deleteMany({});
                await userModel1.insertMany(insertUsers);
            } catch (e) {
                return { status: "neOK", file: "users" };
            }
        } catch (e) {
            return { status: "neOK", file: "users" };
        }

        try {
            const model2: mongoose.Model<any> = tmpDb.model("Order", insertOrderSchema);
            try {
                await model2.deleteMany({});
                await model2.insertMany(orders);
            } catch (e) {
                return { status: "neOK", file: "orders" };
            }
            try {
                const mongoDB = await mongoose.createConnection(mongoURL);
                const insertOrders: Array<any> = [];
                let insertOrder;
                for (let i = 0; i < orders.length; i += 1) {
                    insertOrder = {};
                    // eslint-disable-next-line no-underscore-dangle
                    insertOrder._id = new mongoose.Types.ObjectId(orders[i]._id);
                    insertOrder.date = new Date(orders[i].date);
                    if (insertOrder.date.toString() === "Invalid Date") {
                        return { status: "neOK", file: "orders" };
                    }
                    insertOrder.users = [];
                    for (let j = 0; j < orders[i].users.length; j += 1) {
                        insertOrder.users[j] = new mongoose.Types.ObjectId(orders[i].users[j]);
                    }
                    insertOrder.history = [];
                    for (let j = 0; j < orders[i].history.length; j += 1) {
                        const historyDate = {};
                        historyDate["date"] = new Date(orders[i].history[j].date);
                        if (historyDate["date"].toString() === "Invalid Date") {
                            return { status: "neOK", file: "orders" };
                        }
                        historyDate["status"] = orders[i].history[j].status;
                        insertOrder.history[j] = historyDate;
                    }
                    insertOrder.material = orders[i].material;
                    insertOrder.reception = orders[i].reception;
                    insertOrder.status = orders[i].status;
                    insertOrders.push(insertOrder);
                }
                const userModel2: mongoose.Model<any> = mongoDB.model("Order", orderSchema);
                await userModel2.deleteMany({});
                await userModel2.insertMany(insertOrders);
            } catch (e) {
                return { status: "neOK", file: "orders" };
            }
        } catch (e) {
            return { status: "neOK", file: "orders" };
        }
        return this.response;
    }
}
