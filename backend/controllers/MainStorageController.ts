import {Get, Route} from "tsoa";
import BaseController from "./BaseController";
import {IMainStorage, mainStorage} from "../models/MainStorage";
import {order} from "../models/Order";
import {IUser, user} from "../models/User";
import {Schema, Types} from "mongoose";

@Route("/api/admin")
export default class MainStorageController extends BaseController {
    @Get("/main")
    public async main(): Promise<Array<IMainStorage>> {
        const find_docs = await order.find({"history.3": {$exists: true}},
            {"_id": 1, "date": 1, "material.title": 1, "material.subtype": 1, "material.count": 1, "status": 1});
        let docs: Array<IMainStorage> = []
        for(let i = 0; i < find_docs.length; i++){
            docs.push({
                ID: find_docs[i]._id.toString(),
                // @ts-ignore
                Date: `${find_docs[i].date.getDay()}.${find_docs[i].date.getMonth()}.${find_docs[i].date.getFullYear()} ${find_docs[i].date.getHours()}:${find_docs[i].date.getMinutes()}`,
                // @ts-ignore
                Amount: find_docs[i].material.count,
                // @ts-ignore
                Status: find_docs[i].status,
                // @ts-ignore
                SubType: find_docs[i].material.subtype,
                // @ts-ignore
                Type: find_docs[i].material.title
            })
        }
        return docs;
    }
}
/*
interface IMainStorage {
    ID: Schema.Types.ObjectId,
    Date: Schema.Types.Date,
    Type: Schema.Types.String,
    SubType: Schema.Types.String,
    Amount: Schema.Types.Number,
    Status: Schema.Types.String
}
 */
