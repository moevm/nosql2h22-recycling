import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";

interface Request {
    req_id: string,
    date: string,
    type_of_waste: number,
    subtype: number,
    among: number,
    status: string
}

@Route("/api/manager")
export default class RequestsController extends BaseController {
    @Post("/requests")
    public async requests(): Promise<Array<Request>> {
        const { reception, filter, filterValue } = this.req.body;
        let findDocs: Array<any> = [];
        const requests: Array<Request> = [];
        if (filter === "Request ID") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        orderID: { $toString: "$_id" },
                        newDate: { $dateToString: { format: "%d.%m.%Y %H:%M", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        orderID: { $regex: filterValue, $options: "i" },
                    },
                },
            ]);
        } if (filter === "Date") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        dateUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        newDate: { $dateToString: { format: "%d.%m.%Y %H:%M", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        dateUTC: { $regex: filterValue, $options: "i" },
                    },
                },
            ]);
        } if (filter === "Type of waste") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        newDate: { $dateToString: { format: "%d.%m.%Y %H:%M", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        "material.title": { $regex: filterValue, $options: "i" },
                    },
                },
            ]);
        } if (filter === "Subtype") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        newDate: { $dateToString: { format: "%d.%m.%Y %H:%M", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        "material.subtype": { $regex: filterValue, $options: "i" },
                    },
                },
            ]);
        }
        for (let i = 0; i < findDocs.length; i += 1) {
            requests.push({
                among: findDocs[i].material.count,
                date: findDocs[i].newDate,
                // eslint-disable-next-line no-underscore-dangle
                req_id: findDocs[i]._id.toString(),
                status: findDocs[i].status,
                subtype: findDocs[i].material.subtype,
                type_of_waste: findDocs[i].material.title,
            });
        }
        return requests;
    }
}
