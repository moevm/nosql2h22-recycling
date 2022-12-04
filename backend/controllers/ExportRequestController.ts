import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { order } from "../models/Order";

@Route("/api/manager")
export default class ExportRequestController extends BaseController {
    @Post("/export")
    public async export(): Promise<any> {
        const {
            reception, type, subtype,
        } = this.req.body;
        await order.updateMany({
            "reception.address": reception, "material.title": type, "material.subtype": subtype, status: "Created",
        }, { $set: { status: "For export" } });
        await order.updateMany({
            "reception.address": reception, "material.title": type, "material.subtype": subtype, status: "For export",
        }, { $push: { history: { status: "For export", date: new Date() } } });
    }
}
