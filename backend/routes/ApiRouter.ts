import express, { Router } from "express";
import MainStorageController from "../controllers/MainStorageController";
import AuthorizationController from "../controllers/AuthorizationController";
import ReceptionsController from "../controllers/ReceptionsController";
import TransitController from "../controllers/TransitController";
import ManagerReceptionController from "../controllers/ManagerReceptionController";

const ApiRouter: Router = express.Router();

ApiRouter.post("/admin/main", MainStorageController.handleAction("main"));
ApiRouter.post("/login", AuthorizationController.handleAction("login"));
ApiRouter.post("/admin/receptions", ReceptionsController.handleAction("receptions"));
ApiRouter.post("/admin/transit", TransitController.handleAction("transit"));
ApiRouter.post("/manager/reception", ManagerReceptionController.handleAction("reception"));

export default ApiRouter;
