import { Response, Request } from "express";

export default class UserController {
    public ping(req: Request, res: Response): void {
        res.send("ok");
    }
}
