import express, { Router } from "express";
import { UserManager } from "../UserManager.js";
import { ProductManager } from "../ProductManager.js";

export const webRouters = Router();

const um = new UserManager("./database/users.json");
const pm = new ProductManager("./database/products.json")

webRouters.get("/", (req, res, next) => {
  res.render("home", {
    body: "Bienvenido a Backend NODE JS - EXPRESS - HANDLEBARS - SOCKET.IO",
    title: "E-commerce Backend",
  });
});

webRouters.get("/register", (req, res, next) => {
  res.render("registerForm");
});


webRouters.get("/realtimeproducts", async (req, res, next) => {
    
  try {
    //const products = await pm.getProducts();
    //res.sendStatus(200)
    res.render("productsList"/*, {
    products: products.length > 0,
    productsList: products,
  }*/);
  } catch (error) {
    next(error)
  }

});
