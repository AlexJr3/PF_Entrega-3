import { ProductManager } from "../dao/index.js";

export class ProductService {
  constructor() {
    this.manager = new ProductManager();
  }

  async createProduct(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
    const product = await this.manager.created(
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    );

    return product;
  }

  async getProducts(queryLimit, queryPage, querySort, query) {
    const products = await this.manager.get(
      queryLimit,
      queryPage,
      querySort,
      query
    );
    return products;
  }

  async getProductById(pid) {
    const product = await this.manager.getById(pid);
    return product;
  }

  async updateProduct(productId, data) {
    const productUpdate = await this.manager.update(productId, data);
    return productUpdate;
  }

  async deleteProduct(productId) {
    const productDeleted = await this.manager.delete(productId);
    return productDeleted;
  }
}
