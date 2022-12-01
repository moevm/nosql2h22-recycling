import express, { Router } from "express";
import UserController from "../controllers/UserController";
import MainStorageController from "../controllers/MainStorageController";

const ApiRouter: Router = express.Router();

ApiRouter.get("/user/ping", UserController.handleAction("ping"));
ApiRouter.get("/admin/main", MainStorageController.handleAction("main"));

export default ApiRouter;
