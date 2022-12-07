import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { user } from "../models/User";
import { order } from "../models/Order";

interface Order {
    _id: string
    PointOfDeparture: string,
    PointOfArrival: string,
    TypeOfWaste: string,
    Subtype: string,
    Amount: number,
    request: ""
}

interface Driver {
    driver: string,
    orders: Array<Order>,
    countOrders: number
}

@Route("/api/driver")
export default class MainDriverController extends BaseController {
    @Post("/main")
    public async main(): Promise<Driver> {
        const { login, page, perPage } = this.req.body;
        let skip: number;
        let limit: number;
        let countOrders: number = 0;
        const orders: Array<Order> = [];
        if (perPage === "All") {
            skip = 0;
            limit = 0;
        } else {
            skip = (Number(page) - 1) * Number(perPage);
            limit = Number(perPage);
        }
        const driverData = await user.find(
            { login },
            {
                firstName: 1, lastName: 1, orders: 1, _id: 0,
            },
        );
        const findOrders = await order.find(
            { _id: { $in: driverData[0].orders }, status: "In delivery" },
        ).skip(skip).limit(limit).sort({ date: 1 });
        countOrders = await order.find(
            { _id: { $in: driverData[0].orders }, status: "In delivery" },
        ).count();
        const driver = `${driverData[0].firstName} ${driverData[0].lastName}`;
        for (let i = 0; i < findOrders.length; i += 1) {
            orders.push({
                Amount: findOrders[i].material.count,
                PointOfArrival: "Storage",
                PointOfDeparture: findOrders[i].reception.address,
                Subtype: findOrders[i].material.subtype,
                TypeOfWaste: findOrders[i].material.title,
                request: "",
                // eslint-disable-next-line no-underscore-dangle
                _id: findOrders[i]._id.toString(),
            });
        }
        return { driver, countOrders, orders };
    }
}
