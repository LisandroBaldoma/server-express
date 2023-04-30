import express, { Router } from "express";
//import { ProductManager } from "../dao/fileSystem/ProductManager.js";

//import { productsController } from "../controllers/productsController.js";
import {
  create,
  getProduct,
  getProductByID,
  updateProduct,
  deletedProduct,
} from "../../controllers/api/productsController.js";

export const productsRouter = Router();

//const pm = new ProductManager("./database/products.json");

productsRouter.get("/", getProduct);

productsRouter.get("/:id", getProductByID);

productsRouter.post("/", create);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deletedProduct);
