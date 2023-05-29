import { Router } from "express";
import cookieParser from "cookie-parser";
import {
  AuthController,
  singUpController,
  loginController,
} from "../controller/auth.controller.js";
import { authenticate, authorize } from "../middlewares/autenticate.js";

const router = Router();
router.use(cookieParser());
const controller = new AuthController();

router.post("/singup", singUpController, controller.singUpRedirectController);

router.post("/login", loginController, controller.loginRedirectController);

router.get(
  "/current",
  authenticate("current"),
  authorize("admin"),
  controller.curretController
);

router.get("/failure-page", controller.failurePageController);

export default router;
