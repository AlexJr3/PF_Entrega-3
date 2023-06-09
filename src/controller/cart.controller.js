import { CartService } from "../service/cart.service.js";
import { CustomError } from "../service/error/customError.js";
import { EErrors } from "../service/error/enums.js";
import { ErrorIdParam } from "../service/error/paramsError.js";

const service = new CartService();

class CartController {
  async createCartController() {
    try {
      const cart = await service.createCart();

      res.status(200).send({ status: "ok", payload: cart });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async getCartsController(req, res) {
    try {
      const carts = await service.getCarts();

      res.status(200).send({ status: "ok", payload: carts });
    } catch (error) {
      res.status(400).send({ statuis: "error", payload: error.message });
    }
  }

  async getCartByIdController(req, res) {
    try {
      const { cid } = req.params;
      const cart = await service.getCartById(cid);

      res.status(201).send({ status: "ok", payload: cart });
    } catch (error) {
      req.logger.error({ error });
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async insertProductToCartController(req, res) {
    try {
      const { cid, pid } = req.params;
      const cartUpdate = await service.addProductToCart(cid, pid);

      res.status(200).send({ status: "ok", payload: cartUpdate });
    } catch (err) {
      req.logger.error({ error });
      res.status(400).send({ status: "error", payload: err.message });
    }
  }

  async updateCartController(req, res) {
    try {
      const { cid } = req.params;
      const data = req.body;

      const cart = await service.updateCart(cid, data);
      res.status(200).send({ status: "ok", payload: cart });
    } catch (error) {
      req.logger.error({ error });
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async updateQuantiyController(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const newQuantity = await service.updateProductQuantity(
        cid,
        pid,
        quantity
      );

      res.status(200).send({ status: "ok", payload: newQuantity });
    } catch (error) {
      req.logger.error({ error });
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async purchaseController(req, res) {
    try {
      const { cid } = req.params;
      if (!cid) {
        CustomError.createError({
          name: "cart get id errorr",
          casue: ErrorIdParam(cid),
          message: "errror obteniendo el id del cart",
          errorCode: EErrors.INVALID_PARAM,
        });
      }
      const ticket = await service.purchaseCart(cid);

      res.send({ status: "ok", payload: ticket });
    } catch (error) {
      req.logger.error({ error });
      res.send({ status: "error", payload: error.message });
    }
  }

  async deletedProductController(req, res) {
    try {
      const { cid, pid } = req.params;
      const prod = await service.deletedProductToCart(cid, pid);

      res.status(200).send({ status: "ok", payload: prod });
    } catch (error) {
      req.logger.error({ error });
      res.status(400).send({ status: "error", payload: error.message });
    }
  }

  async deletedCartController(req, res) {
    const { cid } = req.params;
    const deleteProduct = await service.clearCart(cid);

    res.status(200).send({ status: "ok", payload: deleteProduct });
  }
}

export { CartController };
