import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { user } from "../models/User";
import { order } from "../models/Order";

interface Driver {
    Driver: string,
    "Point of Departure": string,
    "Point of Arrival": string,
    "Type of waste": string,
    Subtype: string,
    Amount: number,
}

@Route("/api/driver")
export default class MainDriverController extends BaseController {
    @Post("/main")
    public async main(): Promise<Driver> {
        const login = this.req.query.login as string;
        // const { login } = this.req.body;
        const driverData = await user.find(
            { login },
            {
                firstName: 1, lastName: 1, orders: 1, _id: 0,
            },
        );
        const orders = await order.find(
            { _id: { $in: driverData[0].orders }, status: "In delivery" },
        ).sort({ date: 1 }).limit(1);
        return {
            "Point of Arrival": "Storage",
            "Point of Departure": orders[0].reception.address,
            "Type of waste": orders[0].material.title,
            Amount: orders[0].material.count,
            Driver: `${driverData[0].firstName} ${driverData[0].lastName}`,
            Subtype: orders[0].material.subtype,
        };
    }
}
