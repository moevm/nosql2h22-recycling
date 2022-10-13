import { Response, Request } from "express";
import BaseController from "./BaseController";

export default class UserController extends BaseController {
    public async ping(): Promise<string> {
        return "ok";
    }
}
