import express, { Router } from "express";
import { productsManager } from "../dao/mongoodb/product.manager.js";
import { cartManager } from "../dao/mongoodb/cart.manager.js";

export const webRouters = Router();

webRouters.get("/", (req, res, next) => {
  try {
    res.render("home", {
      body: "Bienvenido a Backend NODE JS - EXPRESS - HANDLEBARS - SOCKET.IO",
      title: "E-commerce Backend",
    });
  } catch (error) {
    next(error);
  }
});

webRouters.get("/register", (req, res, next) => {
  try {
    res.render("registerForm");
  } catch (error) {
    next(error);
  }
});

webRouters.get("/products", async (req, res, next) => {
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
      });
    }
  } catch (error) {
    next(error);
  }
});

webRouters.get("/carts/:cid", async (req, res, next) => {
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
