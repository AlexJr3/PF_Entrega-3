import { Router } from "express";
import { CartController } from "../controller/cart.controller.js";
import { authorize, authenticate } from "../middlewares/autenticate.js";

const cartRouter = Router();
const controller = new CartController();

cartRouter.post("/", controller.createCartController);

cartRouter.get("/", controller.getCartsController);

cartRouter.get("/:cid", controller.getCartByIdController);

cartRouter.post(
  "/:cid/products/:pid",
  controller.insertProductToCartController
);

cartRouter.put("/:cid", controller.updateCartController);

cartRouter.put("/:cid/products/:pid", controller.updateQuantiyController);

cartRouter.get("/:cid/purchase", controller.purchaseController);

cartRouter.delete("/:cid/products/:pid", controller.deletedProductController);

cartRouter.delete("/:cid", controller.deletedCartController);

export default cartRouter;
