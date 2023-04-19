import cartModel from "../dao/Models/cart.Mongoose.js";
import { cartManager } from "../dao/mongoodb/cart.manager.js";

export async function create(req, res, next) {
  try {
    const newCart = new cartModel();
    const result = await cartManager.createCart(newCart);
    res.send({ status: "succes", payload: result });
  } catch (error) {
    next(error);
  }
}

export async function getCartById(req, res, next) {
  try {
    const result = await cartManager.getCartById(req.params.cid);
    res.json(result);
    // res.render("cartView",{
    // carts : result
    // })
  } catch (error) {
    next(error);
  }
}

export async function addProductCart(req, res, next) {
  try {
    const result = await cartManager.addProductCart(
      req.params.cid,
      req.params.pid
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteAllProductCart(req, res, next) {
  try {
    const result = await cartManager.deleteAllProductCart(req.params.cid);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteProductCart(req, res, next) {
  try {
    const result = await cartManager.deleteProductCart(
      req.params.cid,
      req.params.pid
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateProductsCart(req, res, next) {
  console.log(req.body);
  console.log(req.params.cid);
  try {
    await cartManager.updateProductsCart(req.body, req.params.cid);
  } catch (error) {
    next(error);
  }
}

export async function updateQuantiyCartProduct(req, res, next) {
  console.log(req.params.pid);
  console.log(req.params.cid);
  console.log(req.body);
  try {
    await cartManager.updateProductsCart(
      req.params.pid,
      req.params.cid,
      req.body
    );
  } catch (error) {
    next(error);
  }
}
