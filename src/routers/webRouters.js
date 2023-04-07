import express, { Router } from "express";
import { UserManager } from "../managers/fileSystem/UserManager.js";
import { ProductManager } from "../managers/fileSystem/ProductManager.js";
//import { productDb } from "../database/mongoose.js";
import { productsManager } from "../managers/mongoodb/product.manager.js";



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

webRouters.get("/addproduct", async (req, res, next) => {

  //const products = await productDb.find().lean();
  const products = await productsManager.getProducts();
  
  try {
    res.render("productsListF", {
         products: products.length > 0,
         productsList: products,
     });
    
  } catch (error) {
    next(error)
  }


  // try {
  //   const products = await pm.getProducts();
  //   res.sendStatus(200)
  //   res.render("productsListF", {
  //   products: products.length > 0,
  //   productsList: products,
  // });
  // } catch (error) {
  //   next(error)
  // }
  
});
