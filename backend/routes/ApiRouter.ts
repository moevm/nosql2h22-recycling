import express, { Router } from "express";
import MainStorageController from "../controllers/MainStorageController";
import AuthorizationController from "../controllers/AuthorizationController";
import ReceptionsController from "../controllers/ReceptionsController";
import TransitController from "../controllers/TransitController";
import UserController from "../controllers/UserController";
import ManagerReceptionController from "../controllers/ManagerReceptionController";
import ExportRequestController from "../controllers/ExportRequestController";
import RequestsController from "../controllers/RequestsController";
import MainDriverController from "../controllers/MainDriverController";
import AvailableOrdersController from "../controllers/AvailableOrdersController";

const ApiRouter: Router = express.Router();

ApiRouter.post("/admin/main", MainStorageController.handleAction("main"));
ApiRouter.post("/login", AuthorizationController.handleAction("login"));
ApiRouter.post("/register", AuthorizationController.handleAction("register"));
ApiRouter.post("/admin/receptions", ReceptionsController.handleAction("receptions"));
ApiRouter.post("/admin/transit", TransitController.handleAction("transit"));
ApiRouter.get("/user/orders", UserController.handleAction("orders"));
ApiRouter.post("/user/order", UserController.handleAction("order"));
ApiRouter.post("/manager/reception", ManagerReceptionController.handleAction("reception"));
ApiRouter.post("/manager/export", ExportRequestController.handleAction("export"));
ApiRouter.get("/manager/requests", RequestsController.handleAction("requests"));
ApiRouter.post("/driver/main", MainDriverController.handleAction("main"));
ApiRouter.post("/driver/orders", AvailableOrdersController.handleAction("orders"));

export default ApiRouter;
