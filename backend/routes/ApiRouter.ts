import express, { Router } from "express";
import MainStorageController from "../controllers/MainStorageController";
import AuthorizationController from "../controllers/AuthorizationController";

const ApiRouter: Router = express.Router();

ApiRouter.post("/admin/main", MainStorageController.handleAction("main"));
ApiRouter.post("/login", AuthorizationController.handleAction("login"));

export default ApiRouter;
