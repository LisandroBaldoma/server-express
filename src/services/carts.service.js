import { Cart } from "../dao/Models/Cart.js";
import { cartRpository } from "../repositories/cart.repository.js";

class CartsService {
  async createCarts() {
    const newCart = new Cart();
    const result = await cartRpository.createCart(newCart.datosCarts());
    return result;
  }
}

export const cartService = new CartsService();
