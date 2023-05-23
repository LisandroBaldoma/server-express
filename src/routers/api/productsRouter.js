import express, { Router } from "express";

import {
  handlePost,
  handleGet,  
  handlePut,
  handleDelete,
} from "../../controllers/api/productsController.js";

export const productsRouter = Router();

productsRouter.get("/:id?", handleGet);

productsRouter.post("/", handlePost);

productsRouter.put("/:id", handlePut);

productsRouter.delete("/:id", handleDelete);
