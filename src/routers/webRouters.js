import express, { Router } from "express";
import { productsManager } from "../dao/mongoodb/product.manager.js";
import { cartManager } from "../dao/mongoodb/cart.manager.js";
import { auth } from "../middlewares/auth.js";
import { loginView, profileView, registerView } from "../controllers/web/usersController.js";


export const webRouters = Router();


webRouters.get("/", auth, (req, res, next) => {
  try {
    res.render("home", {
      body: "Bienvenido a Backend NODE JS - EXPRESS - HANDLEBARS - SOCKET.IO",
      title: "E-commerce Backend",
    });
  } catch (error) {
    next(error);
  }
});


webRouters.get("/register", registerView)

webRouters.get("/profile", auth, profileView)

webRouters.get("/login", loginView)


webRouters.get("/products", auth, async (req, res, next) => {
  try {
    const respuesta = await productsManager.getProducts(req.query);
    const cartTesting = await cartManager.getCartTesting();
    if (cartTesting.length === 0) {
      res.render("error");
    } else {
      res.render("products", {
        products: respuesta.payload.length > 0,
        productsList: respuesta.payload,
        data: respuesta,
        cartTesting: cartTesting[0].id,
        user:req.session['user'],
      });
    }
  } catch (error) {
    next(error);
  }
});

webRouters.get("/carts/:cid", auth, async (req, res, next) => {
  try {
    const respuesta = await cartManager.getCartById(req.params.cid);
    res.render("cartView", {
      cart: respuesta._id,
      products: respuesta.products.length > 0,
      productsList: respuesta.products,
    });
  } catch (error) {
    next(error);
  }
});
