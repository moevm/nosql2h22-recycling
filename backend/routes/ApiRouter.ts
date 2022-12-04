import express, { Router } from "express";
import MainStorageController from "../controllers/MainStorageController";
import AuthorizationController from "../controllers/AuthorizationController";
import ReceptionsController from "../controllers/ReceptionsController";
import TransitController from "../controllers/TransitController";
import ManagerReceptionController from "../controllers/ManagerReceptionController";
import ExportRequestController from "../controllers/ExportRequestController";
import RequestsController from "../controllers/RequestsController";

const ApiRouter: Router = express.Router();

ApiRouter.post("/admin/main", MainStorageController.handleAction("main"));
ApiRouter.post("/login", AuthorizationController.handleAction("login"));
ApiRouter.post("/admin/receptions", ReceptionsController.handleAction("receptions"));
ApiRouter.post("/admin/transit", TransitController.handleAction("transit"));
ApiRouter.post("/manager/reception", ManagerReceptionController.handleAction("reception"));
ApiRouter.post("/manager/export", ExportRequestController.handleAction("export"));
ApiRouter.get("/manager/requests", RequestsController.handleAction("requests"));

export default ApiRouter;
