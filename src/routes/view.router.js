import { Router } from "express";
import { ProductManager, CartManager } from "../dao/index.js";
import productModel from "../dao/models/product.model.js";
import { ProductController } from "../controller/products.controller.js";

const controller = new ProductController();
const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/products", async (req, res) => {
  const { page } = req.query;
  const products = await productModel.paginate(
    {},
    { limit: 5, lean: true, page: page ?? 1 }
  );

  res.render("products", { products });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  const cart = await cartManager.getById(cid);

  res.render("carts", { cart });
});

//AuthViews

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});
export default router;

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/mockingproducts", controller.mockingProducts);
