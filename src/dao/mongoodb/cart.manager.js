// import cartModel from "../Models/cart.Mongoose.js";
import { Schema, model } from "mongoose";
import { productsManager } from "./product.manager.js";

const collection = "carts";

export const schemaProduct = new Schema(
  {
    products: {
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { versionKey: false }
);

const cartModel = model(collection, schemaProduct);

class CartManager {
  #cart;
  constructor(cartModel) {
    this.#cart = cartModel;
  }

  async createCart(cart) {
    const newCart = await this.#cart.create(cart);
    return newCart;
  }
  async getCartById(cid) {
    // POPULATION
    const cart = await this.#cart.findById(cid).populate("products.id").lean();
    return cart;
  }  
  async addProductCart(cid, pid) {
    const cart = await this.#cart.findById(cid);
    const prod = await productsManager.getProductByID(pid);

    const index = cart.products.findIndex((product) => product.id == pid);

    if (index !== -1) {
      cart.products[index].quantity = cart.products[index].quantity + 1;
      cart.save();
      return cart.products[index];
    } else {
      cart.products.push({ id: pid, quantity: 1 });
      cart.save();
      return cart.products;
    }
  }
  async deleteAllProductCart(cid) {
    const cart = await this.#cart.findById(cid);

    cart.products = [];
    cart.save();
    return cart;
  }
  async deleteProductCart(cid, pid) {
    //console.log(cid, pid);
    const cart = await this.#cart.findById(cid);
    const prod = await productsManager.getProductByID(pid);

    const index = cart.products.findIndex((product) => product.id == pid);
    if (index !== -1) {
      cart.products.splice(index, 1);
      cart.save();
      return cart;
    } else {
      throw new Error("El producto no existe en el carrito");
    }
  }
  async updateProductsCart(body, cid) {
    const cart = await this.#cart.findById(cid);

    cart.products = [];
    body.forEach((element) => {
      cart.products.push(element);
    });
    cart.save();
  }
  async updateQuantiyProductsCart(pid, cid, body) {
    const cart = await this.#cart.findById(cid);
    const prod = await productsManager.getProductByID(pid);

    const index = cart.products.findIndex((product) => product.id == pid);
    if (index !== -1) {
      cart.products[index].quantity = body.quantity;
      cart.save();
      return cart;
    } else {
      throw new Error("El producto no existe en el carrito");
    }
  }
  async getCartTesting() {
    const cartTesting = await this.#cart.find({});
    return cartTesting;
  }
  async deletedCartTesting() {
    await this.#cart.deleteMany({});
  }
}
export const cartManager = new CartManager(cartModel);
