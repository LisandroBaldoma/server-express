import { cartManager } from "../../dao/mongoodb/cart.manager.js";
import { productsManager } from "../../dao/mongoodb/product.manager.js";

export function homeView(req, res, next) {
  res.render("home", {
    body: "Backend NODE JS - EXPRESS - LOGIN - PASSPORT",
    title: "E-commerce Backend",
    user: req.user,
  });
}

export function loginView(req, res, next) {
  res.render("login", { title: "Login" });
}

export function registerView(req, res, next) {
  res.render("registerForm", {
    title: "Register",
  });
}

export function profileView(req, res, next) {
  res.render("profile", {
    title: "Profile",
    user: req.user,
  });
}

export async function productsView(req, res, next) {
  try {
    const respuesta = await productsManager.getProducts(req.query);
    const cartTesting = await cartManager.getCartTesting();
    if (cartTesting.length === 0) {
      res.render("error");
    } else {
      res.render("products", {
        title: "Prodcust",
        products: respuesta.payload.length > 0,
        productsList: respuesta.payload,
        data: respuesta,
        cartTesting: cartTesting[0].id,
        user: req.user,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function cartDetailView(req, res, next) {
  try {
    const respuesta = await cartManager.getCartById(req.params.cid);
    res.render("cartView", {
      title: "CartDetail",
      cart: respuesta._id,
      products: respuesta.products.length > 0,
      productsList: respuesta.products,
    });
  } catch (error) {
    next(error);
  }
}

//TODO CAMBIAR NOMBRE PArA REFERIRME A USER WEB CONTROLLER
