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
import ConfirmRequestController from "../controllers/ConfirmRequestController";
import OrderController from "../controllers/OrderController";
import FinishOrderController from "../controllers/FinishOrderController";
import ImportController from "../controllers/ImportController";

const ApiRouter: Router = express.Router();

ApiRouter.post("/admin/main", MainStorageController.handleAction("main"));
ApiRouter.post("/login", AuthorizationController.handleAction("login"));
ApiRouter.post("/register", AuthorizationController.handleAction("register"));
ApiRouter.post("/admin/receptions", ReceptionsController.handleAction("receptions"));
ApiRouter.post("/admin/transit", TransitController.handleAction("transit"));
ApiRouter.get("/user", UserController.handleAction("user"));
ApiRouter.post("/user/orders", UserController.handleAction("orders"));
ApiRouter.post("/user/order", UserController.handleAction("order"));
ApiRouter.get("/order", OrderController.handleAction("order"));
ApiRouter.post("/manager/reception", ManagerReceptionController.handleAction("reception"));
ApiRouter.post("/manager/export", ExportRequestController.handleAction("export"));
ApiRouter.post("/manager/requests", RequestsController.handleAction("requests"));
ApiRouter.post("/driver/main", MainDriverController.handleAction("main"));
ApiRouter.post("/driver/orders", AvailableOrdersController.handleAction("orders"));
ApiRouter.post("/driver/confirm", ConfirmRequestController.handleAction("confirm"));
ApiRouter.post("/driver/finish", FinishOrderController.handleAction("finish"));
ApiRouter.post("/admin/import", ImportController.handleAction("import"));

export default ApiRouter;
