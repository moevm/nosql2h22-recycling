import express, { Router } from "express";
import UserController from "../controllers/UserController";

const ApiRouter: Router = express.Router();
const userController: UserController = new UserController();

ApiRouter.get("/user/ping", userController.ping);

export default ApiRouter;
