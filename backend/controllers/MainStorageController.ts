import {Get, Route} from "tsoa";
import BaseController from "./BaseController";
import {IMainStorage} from "../models/MainStorage";
import {order} from "../models/Order";

@Route("/api/admin")
export default class MainStorageController extends BaseController {
    @Get("/main")
    public async main(): Promise<Array<IMainStorage>> {
        let {type, subType} = this.req.body;
        let query: {}
        if (type == 'All' && type == undefined){
            query = {
                "history.3": {$exists: true}
            }
        }
        else {
            if (subType == undefined){
                query = {
                    "history.3": {$exists: true},
                    "material.title": type
                }
            }
            else {
                query = {
                    "history.3": {$exists: true},
                    "material.title": type,
                    "material.subtype": subType
                }
            }
        }

        const find_docs = await order.find(query,
            {"_id": 1, "date": 1, "material.title": 1, "material.subtype": 1, "material.count": 1, "status": 1});
        let docs: Array<IMainStorage> = []
        for(let i = 0; i < find_docs.length; i++){
            docs.push({
                ID: find_docs[i]._id.toString(),
                Date: `${find_docs[i].date.getDate().toString().padStart(2, '0')}.${find_docs[i].date.getMonth().toString().padStart(2, '0')}.${find_docs[i].date.getFullYear()} ${find_docs[i].date.getHours().toString().padStart(2, '0')}:${find_docs[i].date.getMinutes().toString().padStart(2, '0')}`,
                Amount: find_docs[i].material.count,
                Status: find_docs[i].status,
                SubType: find_docs[i].material.subtype,
                Type: find_docs[i].material.title
            })
        }
        return docs;
    }
}
