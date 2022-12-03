import { Post, Route } from "tsoa";
import BaseController from "./BaseController";
import { user } from "../models/User";

interface Answer {
    role: string
}

@Route("/api")
export default class AuthorizationController extends BaseController {
    @Post("/login")
    public async login(): Promise<Answer> {
        const { login, password } = this.req.body;
        const query = {
            login,
            password,
        };

        const findUser = await user.find(query, { role: 1 });
        if (findUser.length === 1) {
            return { role: findUser[0].role };
        }

        return { role: "Not found" };
    }
}
