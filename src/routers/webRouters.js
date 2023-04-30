import express, { Router } from "express";
import { productsManager } from "../dao/mongoodb/product.manager.js";
import { cartManager } from "../dao/mongoodb/cart.manager.js";

import { cartDetail, homeView, loginView, productsView, profileView, registerView } from "../controllers/web/web.Controller.js";
import { soloLogueadosView } from "../middlewares/soloLogueados.js";



export const webRouters = Router();

webRouters.get("/register", registerView)

webRouters.get("/login", loginView)

webRouters.get("/", soloLogueadosView, homeView )

webRouters.get("/profile", soloLogueadosView, profileView)

webRouters.get("/products", soloLogueadosView, productsView)

webRouters.get("/carts/:cid", soloLogueadosView, cartDetail)
