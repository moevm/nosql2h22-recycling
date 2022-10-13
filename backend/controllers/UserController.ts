import { Response, Request } from "express";
import { Get, Route } from "tsoa";
import BaseController from "./BaseController";

@Route("api/user/ping")
export default class UserController extends BaseController {
    @Get("/")
    public async ping(): Promise<string> {
        return "ok";
    }
}
