import cartModel from "../Models/cart.Mongoose.js";
import productModel from "../Models/Product.mongoose.js";

class CartManager {
  async createCart(cart) {
    const newCart = await cartModel.create(cart);
    return newCart;
  }
  async getCartById(cid) {
    // POPULATION
    const cart = await cartModel.findById(cid).populate("products.id").lean();
    return cart;
  }
  async getCartTesting() {
    const cartTesting = await cartModel.find({});
    return cartTesting;
  }

  async addProductCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    const prod = await productModel.findById(pid);

    const index = cart.products.findIndex((product) => product.id == prod.id);

    if (index !== -1) {
      cart.products[index].quantity = cart.products[index].quantity + 1;
      cart.save();
      return cart.products[index];
    } else {
      cart.products.push({ id: prod.id, quantity: 1 });
      cart.save();
      return cart.products;
    }
  }

  async deleteAllProductCart(cid) {
    const cart = await cartModel.findById(cid);
    cart.products = [];
    cart.save();
    return cart;
  }
  async deleteProductCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    const prod = await productModel.findById(pid);

    const index = cart.products.findIndex((product) => product.id == prod.id);
    if (index !== -1) {
      cart.products.splice(index, 1);
      cart.save();
      return cart;
    } else {
      throw new Error("El producto no existe en el carrito");
    }
  }

  async updateProductsCart(body, cid) {
    const cart = await cartModel.findById(cid);
    cart.products = [];
    body.forEach((element) => {
      cart.products.push(element);
    });
    cart.save();
  }

  async updateQuantiyProductsCart(pid, cid, body) {
    const cart = await cartModel.findById(cid);
    const prod = await productModel.findById(pid);

    const index = cart.products.findIndex((product) => product.id == prod.id);
    if (index !== -1) {
      cart.products[index].quantity = body.quantity;
      cart.save();
      return cart;
    } else {
      throw new Error("El producto no existe en el carrito");
    }
  }
}
export const cartManager = new CartManager();

