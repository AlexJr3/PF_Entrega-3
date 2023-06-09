import productModel from "../models/product.model.js";

class productManager {
  constructor() {}

  async get(queryLimit, queryPage, querySort, query) {
    const getLimit = queryLimit ? queryLimit : 10;
    const getPage = queryPage ? queryPage : 1;
    const getSort = querySort ? { price: querySort } : false;

    const options = {
      page: getPage,
      limit: getLimit,
      sort: getSort,
    };

    try {
      const products = await productModel.paginate(query, options);
      return products;
    } catch (err) {
      throw new Error({ err });
    }
  }

  async created(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
    const newProduct = {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    };
    const result = await productModel.create(newProduct);

    return result;
  }

  async getById(productId) {
    const product = await productModel.findById(productId);

    return product;
  }

  async update(productId, data) {
    const product = await productModel.findByIdAndUpdate(productId, data, {
      new: true,
    });

    return product;
  }

  async delete(productId) {
    const product = await productModel.findByIdAndDelete(productId);

    return product;
  }
}

export default productManager;
