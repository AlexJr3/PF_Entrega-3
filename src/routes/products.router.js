import { Router, json } from "express";
import { ProductController } from "../controller/products.controller.js";
import { authorize, authenticate } from "../middlewares/autenticate.js";

const router = Router();
const controller = new ProductController();

router.get("/", controller.getProductsController);

router.get("/:pid", controller.getProdIdController);

router.post("/", controller.createProductController);

router.put(
  "/:pid",
  authenticate("current"),
  authorize("admin"),
  controller.updateProdController
);

router.delete(
  "/:pid",
  authenticate("current"),
  authorize("admin"),
  controller.deletedProdController
);

export default router;
