import mongoose from "mongoose";
import { MOONGODB_CONECTION_STRING } from "../config/database.config.js";

export async function conectarMongooseDb(){
  await mongoose.connect(MOONGODB_CONECTION_STRING)
  console.log(`Base de Datos conectada a ${MOONGODB_CONECTION_STRING}`)

}

// const schemaProduct = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     stock: { type: Number, required: true },
//     price: { type: Number, required: true },
//     code: { type: String, required: true },
//     category: { type: String, required: true },
//     thumbnails: { type: Array, required: true },
//   },{ versionKey: false });

// export const productDb = mongoose.model("product", schemaProduct);
