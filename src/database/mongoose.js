import mongoose from "mongoose";
import { MOONGODB_CONECTION_STRING } from "../config/database.config.js";

export async function conectarMongooseDb() {
  await mongoose.connect(MOONGODB_CONECTION_STRING);
  console.log(`Base de Datos conectada a ${MOONGODB_CONECTION_STRING}`);
}

export async function desconectarMongoseDB() {
  await mongoose.connection.close();
  console.log("Base de Datos desconectada, el proceso se reaizo con exito");
}
