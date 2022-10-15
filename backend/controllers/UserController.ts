import { Response, Request } from "express";
import { Get, Route } from "tsoa";
import BaseController from "./BaseController";

@Route("api/user")
export default class UserController extends BaseController {
    @Get("/ping")
    public async ping(): Promise<string> {
        return "ok";
    }
}
