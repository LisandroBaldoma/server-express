import cartModel from "../../dao/Models/cart.Mongoose.js";
import { cartManager } from "../../dao/mongoodb/cart.manager.js";

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
  try {
    const result = await cartManager.updateProductsCart(
      req.body,
      req.params.cid
    );
  } catch (error) {
    next(error);
  }
}

export async function updateQuantiyCartProduct(req, res, next) {  
  try {
    await cartManager.updateQuantiyProductsCart(
      req.params.pid,
      req.params.cid,
      req.body
    );
  } catch (error) {
    next(error);
  }
}
