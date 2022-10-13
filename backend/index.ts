import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Express } from "express/ts4.0";
import DatabaseManager from "./database/DatabaseManager";
import ApiRouter from "./routes/ApiRouter";
import AdminRouter from "./routes/AdminRouter";
import errorHandler from "./middlewares/ErrorHandler/ErrorHandler";
import swaggerUi from "swagger-ui-express";

const port: number | string = process.env.PORT || 8000;
const app: Express = express();
const mongoManager = new DatabaseManager();

app.use([
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cookieParser(),
]);

app.use(express.static("public"));

app.use("/api", ApiRouter);
app.use("/admin", AdminRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Ready on: ${port}`);
});
