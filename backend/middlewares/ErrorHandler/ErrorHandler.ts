import { Request, Response, NextFunction } from "express";
import IHttpException from "./HttpException";

const errorHandler = (
    err: IHttpException,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const status: number = err.status || 500;
    const message: string = err.message || "Internal server error";

    console.error(`${status}: ${message}`);
    res.send(message).status(status);
};

export default errorHandler;
