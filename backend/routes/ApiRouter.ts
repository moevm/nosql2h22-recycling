import express, { Router } from "express";
import UserController from "../controllers/UserController";

const ApiRouter: Router = express.Router();

ApiRouter.get("/user/ping", UserController.handleAction("ping"));

export default ApiRouter;
