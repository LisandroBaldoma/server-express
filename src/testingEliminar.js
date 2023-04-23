import mongoose from "mongoose";
import productModel from "./dao/Models/Product.mongoose.js";
import fs from "fs/promises";
import { conectarMongooseDb, desconectarMongoseDB } from "./database/mongoose.js";
import cartModel from "./dao/Models/cart.Mongoose.js";


// Conectarme a la BD
await conectarMongooseDb();

// Limpiar Productos BD luego del TEST
await productModel.deleteMany({});
console.log("Se Eliminaron los productos de testing con exito")

// Elimino Cart BD luego del TEST
await cartModel.deleteMany({})
console.log("Se Eliminaron los cart de testing con exito")

// Me desconecto de la BD
await desconectarMongoseDB();