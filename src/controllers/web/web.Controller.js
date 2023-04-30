import { cartManager } from "../../dao/mongoodb/cart.manager.js";
import { productsManager } from "../../dao/mongoodb/product.manager.js";

export function homeView(req, res, next) {
  res.render("home", {
    body: "Bienvenido a Backend NODE JS - EXPRESS - HANDLEBARS - SOCKET.IO",
    title: "E-commerce Backend",
  });
}

export function loginView(req, res, next) {
  res.render("login", { pageTitle: "Login" });
}

export function registerView(req, res, next) {
  res.render("registerForm", { pageTitle: "Register" });
}

export function profileView(req, res, next) {
  res.render("profile", { pageTitle: "Profile", user: req.session["user"] });
}

export async function productsView(req, res, next) {
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
        user: req.session["user"],
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function cartDetail(req, res, next) {
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
}

//TODO CAMBIAR NOMBRE PArA REFERIRME A USER WEB CONTROLLER
