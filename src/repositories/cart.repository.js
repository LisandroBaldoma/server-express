import { cartDao } from "../dao/daos.factory.js";

class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  createCart() {
    return this.dao.createCart();
  }
  getCartById(cid) {
    return this.dao.getCartById(cid);
  }
  addProductCart(cid, pid) {
    return this.dao.addProductCart(cid, pid);
  }
  deleteAllProductCart(cid) {
    return this.dao.deleteAllProductCart(cid);
  }
  deleteProductCart(cid, pid) {
    return this.dao.deleteProductCart(cid, pid);
  }
  updateProductsCart(body, cid) {
    return this.dao.updateProductsCart(body, cid);
  }
  updateQuantiyProductsCart(pid, cid, body) {
    return this.dao.updateQuantiyProductsCart(pid, cid, body);
  }
}

export const cartRpository = new CartRepository(cartDao);
