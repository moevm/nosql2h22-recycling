import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Request {
    req_id: string,
    user: string,
    date: string,
    type_of_waste: number,
    subtype: number,
    among: number,
    status: string
}

interface Requests {
    countRequests: number,
    requests: Array<Request>
}

@Route("/api/manager")
export default class RequestsController extends BaseController {
    @Post("/requests")
    public async requests(): Promise<Requests> {
        const {
            reception, filter, filterValue, page, perPage,
        } = this.req.body;
        let skip: number;
        let limit: number;
        let findDocs: Array<any> = [];
        const requests: Array<Request> = [];
        let countRequests: number = 0;
        if (perPage === "All") {
            skip = 0;
            limit = 0;
        } else {
            skip = (Number(page) - 1) * Number(perPage);
            limit = Number(perPage);
        }
        if (filter === "Request ID") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        orderID: { $toString: "$_id" },
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        orderID: { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([
                {
                    $addFields: {
                        orderID: { $toString: "$_id" },
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        orderID: { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]);
            countRequests = allFindDocs.length;
        } if (filter === "Date") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        dateUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        dateUTC: { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([
                {
                    $addFields: {
                        dateUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        dateUTC: { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]);
            countRequests = allFindDocs.length;
        } if (filter === "Type of waste") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        "material.title": { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([
                {
                    $addFields: {
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        "material.title": { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]);
            countRequests = allFindDocs.length;
        } if (filter === "Subtype") {
            findDocs = await order.aggregate([
                {
                    $addFields: {
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        "material.subtype": { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]).sort({ date: 1 }).skip(skip).limit(limit);
            const allFindDocs = await order.aggregate([
                {
                    $addFields: {
                        newDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    },
                },
                {
                    $match: {
                        "reception.address": reception,
                        "material.subtype": { $regex: filterValue, $options: "i" },
                        status: { $in: ["In delivery", "For export"] },
                    },
                },
            ]);
            countRequests = allFindDocs.length;
        }
        for (let i = 0; i < findDocs.length; i += 1) {
            // eslint-disable-next-line no-underscore-dangle,no-await-in-loop
            const usersForOrder = await user.find({ orders: { $in: findDocs[i]._id }, role: "User" }, { firstName: 1, lastName: 1, _id: 0 });
            requests.push({
                among: findDocs[i].material.count,
                date: findDocs[i].newDate,
                // eslint-disable-next-line no-underscore-dangle
                req_id: findDocs[i]._id.toString(),
                status: findDocs[i].status,
                subtype: findDocs[i].material.subtype,
                type_of_waste: findDocs[i].material.title,
                user: `${usersForOrder[0].firstName} ${usersForOrder[0].lastName}`,
            });
        }
        return { countRequests, requests };
    }
}
