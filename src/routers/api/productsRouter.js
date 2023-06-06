import express, { Router } from "express";

import {
  handlePost,
  handleGet,  
  handlePut,
  handleDelete,
} from "../../controllers/api/productsController.js";

import { productsAction } from "../../middlewares/permisoAcciones.js";

export const productsRouter = Router();

productsRouter.get("/:id?", handleGet);

productsRouter.post("/", productsAction, handlePost);

productsRouter.put("/:id", productsAction, handlePut);

productsRouter.delete("/:id", productsAction, handleDelete);
