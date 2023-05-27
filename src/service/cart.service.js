import { CartManager, ProductManager } from "../dao/index.js";
import { ticketModel } from "../dao/models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

export class CartService {
  constructor() {
    this.manager = new CartManager();
  }

  async createCart() {
    const newCart = await this.manager.create();
    return newCart;
  }

  async getCarts() {
    const carts = await this.manager.get();
    return carts;
  }

  async getCartById(cid) {
    const cart = await this.manager.getCartById(cid);
    return cart;
  }

  async addProductToCart(cid, productId) {
    const cartUpdate = await this.manager.addProductToCart(cid, productId);
    return cartUpdate;
  }

  async updateCart(cid, data) {
    const cartUpdate = await this.manager.update(cid, data);
    return cartUpdate;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const updateQuanity = await this.manager.updateQuantity(cid, pid, quantity);
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
    //Checkeamos que el carrito tenga productos
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

    //agregamos los produtcos restantes al carrito
    await this.manager.update(cid, rejectedProducts);

    //Creacion del nuevo ticket
    const newTicket = {
      code: uuidv4(),
      purchase_datatime: new Date().toLocaleString(),
      amount: total,
      purchase: "user.email,",
    };

    const createdTicket = await ticketModel.create(newTicket);
    return newTicket;
  }
}
