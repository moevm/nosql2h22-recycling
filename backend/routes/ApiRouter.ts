import express, { Router } from "express";
import MainStorageController from "../controllers/MainStorageController";
import AuthorizationController from "../controllers/AuthorizationController";
import ReceptionsController from "../controllers/ReceptionsController";
import TransitController from "../controllers/TransitController";

const ApiRouter: Router = express.Router();

ApiRouter.post("/admin/main", MainStorageController.handleAction("main"));
ApiRouter.post("/login", AuthorizationController.handleAction("login"));
ApiRouter.post("/admin/receptions", ReceptionsController.handleAction("receptions"));
ApiRouter.post("/admin/transit", TransitController.handleAction("transit"));

export default ApiRouter;
