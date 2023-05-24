import { CartManager, ProductManager } from "../dao/index.js";
import { ticketModel } from "../dao/models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

export class CartService {
  constructor() {
    this.manager = new CartManager();
  }

  async createCart() {
    const newCart = await this.this.manager.create();
    return newCart;
  }

  async getCarts() {
    const carts = await this.this.manager.get();
    return carts;
  }

  async getCartById(cid) {
    const cart = await this.manager.getCartById(cid);
    return cart;
  }

  async addProductToCart(cid, productId) {
    const cartUpdate = await this.this.manager.addProductToCart(cid, productId);
    return cartUpdate;
  }

  async updateCart(cid, data) {
    const cartUpdate = await this.this.manager.update(cid, data);
    return cartUpdate;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const updateQuanity = await this.this.manager.updateQuantity(
      cid,
      pid,
      quantity
    );
    return updateQuanity;
  }

  async deletedProductToCart(cid, pid) {
    const deteledProduct = await this.manager.deletedProduct(cid, pid);

    return deteledProduct;
  }

  async clearCart(cid) {
    const cart = await this.manager.clear(cid);
    return cart;
  }

  async purchaseCart(cid) {
    const cart = await this.manager.getById(cid);
    let ticketProduct = [];
    let rejectedProducts = [];
    let total = 0;
    if (!cart.products.length) {
      return new Error("Tiene que agregar productos");
    }
    const cartProducts = cart.products.map((el) => el);
    for (let i = 0; i < cart.products.length; i++) {
      const cartFor = cartProducts[i];

      if (cartFor.quantity < cartFor.product.stock) {
        ticketProduct.push(cartFor);
        total += cartFor.quantity * cartFor.product.price;
      } else {
        rejectedProducts.push(cartFor);
      }
    }

    const newTicket = {
      code: uuidv4(),
      purchase_datatime: new Date().toLocaleString(),
      amount: total,
      purchase: "user.email,",
    };

    console.log(newTicket);
  }
}

/* async purchaseController(req, res) {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  let ticketProduct = [];
  let rejectedProducts = [];
  let total;

  if (cart.products.lengt) {
    return res.send({ message: "Necesita agregar productos" });
  }

  for (let i = 0; i < cart.products.length; i++) {
    const cartProduct = cart.products[i];

    if (cartProduct.quantity < cartProduct.product.stock) {
      ticketProduct.push(cartProduct);
      total += cartProduct.product.price * cartProduct.quantity;
    } else {
      rejectedProducts.push(cartProduct);
    }
    const newTicket = {
      code: uuidv4(),
      purchase_datatime: new Date().toLocaleString(),
      amount: total,
      purchase: req.user.email,
    };

    const updateCart = await cartManager.updateCart(cid, rejectedProducts);

    const createdTicket = await ticketModel.create(newTicket);

    res.send({ status: "ok", payload: createdTicket });
  }
} */
