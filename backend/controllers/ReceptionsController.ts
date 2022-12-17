import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";
import { user } from "../models/User";

interface Reception {
    Address: string,
    Manager: string,
    Paper?: number,
    Metal?: number,
    Plastic?: number,
    Organic?: number,
    Glass?: number,
    Battery?: number,
    Amount?: number,
    Percentage: string
}

interface Receptions {
    countReceptions: number,
    receptions: Array<Reception>
}

interface Filters {
    Paper?: {
        greater: number,
        less: number
    },
    Metal?: {
        greater: number,
        less: number
    },
    Plastic?: {
        greater: number,
        less: number
    },
    Organic?: {
        greater: number,
        less: number
    },
    Glass?: {
        greater: number,
        less: number
    },
    Battery?: {
        greater: number,
        less: number
    },
    Amount?: {
        greater: number,
        less: number
    },
}

@Route("/api/admin")
export default class MainStorageController extends BaseController {
    @Post("/receptions")
    public async receptions(): Promise<Receptions> {
        const {
            mainFilter, mainFilterValue, filters, page, perPage,
        } = this.req.body;
        let query: {};
        const findFilters: Filters = {};
        let findDocs: Array<any> = [];
        let totals: Array<any> = [];
        let skip: number;
        let limit: number;
        const allReceptions: Array<Reception> = [];
        const receptions: Array<Reception> = [];
        if (perPage === "All") {
            skip = 0;
            limit = 0;
        } else {
            skip = (Number(page) - 1) * Number(perPage);
            limit = Number(perPage);
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const key in filters) {
            if (filters[key].from === "") {
                if (filters[key].to === "") {
                    findFilters[key] = { greater: 0, less: Number.MAX_SAFE_INTEGER };
                } else {
                    findFilters[key] = { greater: 0, less: parseInt(filters[key].to, 10) };
                }
            } else if (filters[key].to === "") {
                findFilters[key] = { greater: parseInt(filters[key].from, 10), less: Number.MAX_SAFE_INTEGER };
            } else {
                findFilters[key] = { greater: parseInt(filters[key].from, 10), less: parseInt(filters[key].to, 10) };
            }
        }
        if (mainFilter === "Reception") {
            findDocs = await order.aggregate(
                [{ $match: { "reception.address": { $regex: mainFilterValue, $options: "i" }, status: "Created" } },
                    { $group: { _id: { reception: "$reception.address", type: "$material.title" }, totalELem: { $sum: "$material.count" } } }]
                ,
            );
            totals = await order.aggregate(
                [{ $match: { "reception.address": { $regex: mainFilterValue, $options: "i" }, status: "Created" } },
                    { $group: { _id: { reception: "$reception.address" }, total: { $sum: "$material.count" } } }]
                ,
            );
        } if (mainFilter === "Manager") {
            const userData: Array<string> = mainFilterValue.split(" ");
            if (userData.length === 1) {
                query = {
                    role: "Manager",
                    $or: [{ firstName: { $regex: `${userData[0]}`, $options: "i" } }, { lastName: { $regex: `${userData[0]}`, $options: "i" } }],
                };
            } else if (userData.length === 2) {
                query = {
                    role: "Manager",
                    $or: [{ firstName: { $regex: `^${userData[0]}$`, $options: "i" }, lastName: { $regex: `${userData[1]}`, $options: "i" } }, { firstName: { $regex: `${userData[1]}`, $options: "i" }, lastName: { $regex: `^${userData[0]}$`, $options: "i" } }],
                };
            } else {
                return { countReceptions: 0, receptions: [] };
            }
            const findUsers = await user.find(query, { orders: 1, _id: 0 });
            if (findUsers.length === 0) {
                return { countReceptions: 0, receptions: [] };
            }
            for (let i = 0; i < findUsers.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                findDocs = findDocs.concat(await order.aggregate(
                    [{ $match: { _id: { $in: findUsers[i].orders }, status: "Created" } },
                        { $group: { _id: { reception: "$reception.address", type: "$material.title" }, totalELem: { $sum: "$material.count" } } }]
                    ,
                ));
                // eslint-disable-next-line no-await-in-loop
                totals = totals.concat(await order.aggregate(
                    [{ $match: { _id: { $in: findUsers[i].orders }, status: "Created" } },
                        { $group: { _id: { reception: "$reception.address" }, total: { $sum: "$material.count" } } }]
                    ,
                ));
            }
        }
        for (let i = 0; i < totals.length; i += 1) {
            // eslint-disable-next-line no-underscore-dangle,no-await-in-loop
            const users = await order.find({ "reception.address": totals[i]._id.reception }, {
                users: 1,
                _id: 0,
            }).limit(1);
            // eslint-disable-next-line no-await-in-loop
            const manager = await user.find({ role: "Manager", _id: { $in: users[0].users } }, {
                firstName: 1,
                lastName: 1,
                _id: 0,
            });
            allReceptions.push({
                // eslint-disable-next-line no-underscore-dangle
                Address: totals[i]._id.reception,
                Amount: totals[i].total,
                Manager: `${manager[0].firstName} ${manager[0].lastName}`,
                Percentage: (totals[i].total / 100).toString().replace(".", ","),
            });
        }
        for (let i = 0; i < findDocs.length; i += 1) {
            for (let j = 0; j < allReceptions.length; j += 1) {
                // eslint-disable-next-line no-underscore-dangle
                if (allReceptions[j].Address === findDocs[i]._id.reception) {
                    // eslint-disable-next-line no-underscore-dangle
                    allReceptions[j][findDocs[i]._id.type] = findDocs[i].totalELem;
                }
            }
        }
        for (let i = 0; i < allReceptions.length; i += 1) {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in findFilters) {
                // eslint-disable-next-line no-underscore-dangle
                if (Object.keys(allReceptions[i]).includes(key)) {
                    if (!(findFilters[key].greater <= allReceptions[i][key] && allReceptions[i][key] <= findFilters[key].less)) {
                        allReceptions.splice(i, 1);
                        i = -1;
                        break;
                    }
                } else if (!(findFilters[key].greater === 0 && findFilters[key].less === Number.MAX_SAFE_INTEGER)) {
                    allReceptions.splice(i, 1);
                    i = -1;
                    break;
                }
            }
        }
        const countReceptions = allReceptions.length;
        if (limit === 0) {
            limit = countReceptions;
        }
        for (let i = skip; i < skip + limit; i += 1) {
            if (i >= countReceptions || countReceptions === 0) {
                break;
            }
            receptions.push(allReceptions[i]);
        }
        return { countReceptions, receptions };
    }
}
