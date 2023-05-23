import express, { Router } from "express";

import {
  handlePostAdd,
  handlePost,
  handleDeleteAll,
  handleDeleteOne,
  handleGet,
  handleUpdateOne,
  HandleUpdateQuantiy,
} from "../../controllers/api/cartsController.js";

export const cartRouter = Router();

cartRouter.post("/", handlePost);

cartRouter.post("/:cid/product/:pid", handlePostAdd);

cartRouter.get("/:cid", handleGet);

cartRouter.delete("/:cid", handleDeleteAll);

cartRouter.delete("/:cid/product/:pid", handleDeleteOne);

cartRouter.put("/:cid", handleUpdateOne);

cartRouter.put("/:cid/product/:pid", HandleUpdateQuantiy);

