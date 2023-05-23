import { productsDao } from "../dao/daos.factory.js";

class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createProduct(product) {
    return this.dao.createProduct(product);
  }
  getProducts(params) {
    return this.dao.getProducts(params);
  }
  getProductByID(id) {
    return this.dao.getProductByID(id);
  }
  updateProduct(id, body) {
    return this.dao.updateProduct(id, body);
  }
  deletedProduct(id) {
    return this.dao.deletedProduct(id);
  }
}

export const productsRepository = new ProductRepository(productsDao);
