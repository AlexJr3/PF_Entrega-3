import { Router, json } from "express";
import { ProductController } from "../controller/products.controller.js";
import { authorize } from "../middlewares/autenticate.js";

const router = Router();
const controller = new ProductController();

router.get("/", controller.getProductsController);

router.get("/:pid", controller.getProdIdController);

router.post("/", controller.createProductController);

router.put("/:pid", authorize("admin"), controller.updateProdController);

router.delete("/:pid", authorize("admin"), controller.deletedProdController);

export default router;
