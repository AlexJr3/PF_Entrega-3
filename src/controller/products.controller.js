import { ProductService } from "../service/product.service.js";
import { hasNextAndPrevPage } from "../utils.js";
import { generateProducts } from "../moks/moks.js";

const service = new ProductService();

class ProductController {
  async getProductsController(req, res) {
    try {
      const { limit, page, sort, query } = req.query;
      const products = await service.getProducts(limit, page, sort, query);

      hasNextAndPrevPage(products);

      res.status(200).send({ status: "ok", payload: products });
    } catch (err) {
      req.logger.error({ err });

      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async getProdIdController(req, res) {
    try {
      const { pid } = req.params;
      const product = await service.getProductById(pid);
      res.status(200).send({ status: "ok", payload: product });
    } catch (err) {
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async createProductController(req, res) {
    try {
      const {
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status = true,
        category,
      } = req.body;

      const newProduct = await service.createProduct(
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category
      );

      res.status(201).send({ status: "ok", payload: newProduct });
    } catch (err) {
      req.logger.error({ err });
      res.status(400).send({ status: "ok", payload: err.message });
    }
  }

  async updateProdController(req, res) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const product = await service.getProductById(pid);
      await service.updateProduct(pid, data);

      res.status(200).send({
        status: "ok",
        payload: product,
      });
    } catch (err) {
      req.logger.error({ err });
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async deletedProdController(req, res) {
    try {
      const { pid } = req.params;
      await service.deleteProduct(pid);

      res.status(202).send({ status: "ok", payload: "Product Deleted" });
    } catch (err) {
      req.logger.error({ err });
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  mockingProducts(req, res) {
    const cant = parseInt(req.query.cant) || 100;
    let products = [];
    for (let i = 0; i < cant; i++) {
      const product = generateProducts();
      products.push(product);
    }
    res.send({ status: "ok", payload: products });
  }
}

export { ProductController };
