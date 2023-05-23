import mongoose from "mongoose";

import fs from "fs/promises";
import { conectarMongooseDb, desconectarMongoseDB } from "../database/mongoose.js";
// import cartModel from "./dao/Models/cart.Mongoose.js";
// import userModel from "./dao/Models/User.Mongoose.js";
// import { createSalt, encriptar } from "./utils/criptografia.js";
// import { Product } from "./dao/Models/Product.js";
import { productsManager } from "../dao/mongoodb/product.manager.js";
import { cartManager } from "../dao/mongoodb/cart.manager.js";
import { Cart } from "../dao/Models/Cart.js";



//Leer productos para agregar a la BD
const product = JSON.parse(
  await fs.readFile("../database/products.json", "utf-8")
);

// Conectarme a la BD
await conectarMongooseDb();

//Creo productos en BD para TESTING

await productsManager.insertarTesting(product)
console.log("Se crearon los productos de testing con exito")

//Creo Cart para TESTING
 const cart = new Cart()
 await cartManager.createCart(cart) 
 console.log("Se creo el carrito de testing con exito")


// Me desconecto de la BD
await desconectarMongoseDB();
