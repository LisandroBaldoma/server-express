import express, { Router } from "express";
//import { CartManager } from "../dao/fileSystem/CartManager.js";
import {
  addProductCart,
  create,
  deleteAllProductCart,
  deleteProductCart,
  getCartById,
  updateProductsCart,
  updateQuantiyCartProduct,
} from "../../controllers/api/cartsController.js";

export const cartRouter = Router();

// DAO FILE SYSTEM
//const cm = new CartManager("./database/cart.json", "./database/products.json");

cartRouter.post("/", create);

cartRouter.post("/:cid/product/:pid", addProductCart);

cartRouter.get("/:cid", getCartById); //TODO GENERAR VISTA: VISUALIZAR LOS PRODUCTOS QUE PERTENEZCAN A CADA CARRITO

cartRouter.delete("/:cid", deleteAllProductCart);

cartRouter.delete("/:cid/product/:pid", deleteProductCart);

cartRouter.put("/:cid", updateProductsCart);

cartRouter.put("/:cid/product/:pid", updateQuantiyCartProduct);

