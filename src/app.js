import express from "express";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import passport from "passport";
import { localPassport } from "./config/passport.config.js";
import path from "path";
import { config } from "./config/config.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/view.router.js";
import authRouter from "./routes/auth.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { addLogger } from "./utils/logger.js";
import { swaggerSpecs } from "./config/docConfig.js";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = config.server.port;
const mongoUlr = config.server.dbUrl;

//Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(addLogger);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/auth", authRouter);
app.use("/", viewsRouter);
app.use(errorHandler);

//passport-config
localPassport();
app.use(passport.initialize());

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname + "/views"));

//mongooseConnect

mongoose.connect(mongoUlr).then((conn) => {
  console.log("Connected to DB");
});

const httpServer = app.listen(port, (req, res) => {
  console.log(`Server listening on port: ${port}`);
});

const io = new Server(httpServer);
