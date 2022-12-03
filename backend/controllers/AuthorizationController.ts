import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { user } from "../models/User";

@Route("/api")
export default class AuthorizationController extends BaseController {
    @Post("/login")
    public async login(): Promise<string> {
        const { login, password } = this.req.body;
        const query = {
            login,
            password,
        };

        const findUser = await user.find(query, { role: 1 });
        if (findUser.length === 1) {
            return findUser[0].role;
        }

        return "Not found";
    }
}
