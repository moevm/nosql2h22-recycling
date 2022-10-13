import { Request, Response, NextFunction } from "express";

export default class BaseController {
    protected req: Request;

    protected res: Response;

    protected next: NextFunction;

    protected status: number = 200;

    public constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    public static handleAction(action: string) {
        return async (
            req: Request,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const classInstance = new this(req, res, next);
            try {
                const data = await classInstance[action]();
                if (typeof data === "undefined") {
                    classInstance.sendStatus();
                    return;
                }
                classInstance.sendJSON(data);
            } catch (err) {
                next(err);
            }
        };
    }

    public sendStatus(): void {
        this.res.status(this.status);
    }

    public sendJSON(data): void {
        this.res.status(this.status).send(data);
    }
}
