import { Cart } from "../../dao/Models/Cart.js";
import { ErrorNotFoundCarts } from "../../dao/Models/errors/ErrorNotFound.js";
import { cartManager } from "../../dao/mongoodb/cart.manager.js";
//import { productsManager } from "../../dao/mongoodb/product.manager.js";

export async function create(req, res, next) {
  try {
    const newCart = new Cart();
    const result = await cartManager.createCart(newCart);
    res.send({ status: "succes", payload: result });
  } catch (error) {
    next(new ErrorNotFoundCarts())
    
  }
}

export async function getCartById(req, res, next) {
  try {
    const result = await cartManager.getCartById(req.params.cid);    
    res.json(result);
  } catch (error) {
    next(new ErrorNotFoundCarts())
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
    next(new ErrorNotFoundCarts())
  }
}

export async function deleteAllProductCart(req, res, next) {
  try {
    const result = await cartManager.deleteAllProductCart(req.params.cid);
    res.json(result);
  } catch (error) {
    next(new ErrorNotFoundCarts())
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
    next(new ErrorNotFoundCarts())
  }
}

export async function updateProductsCart(req, res, next) {
  try {
    const result = await cartManager.updateProductsCart(
      req.body,
      req.params.cid
    );
    res.json(result);
  } catch (error) {
    next(new ErrorNotFoundCarts())
  }
}

export async function updateQuantiyCartProduct(req, res, next) {  
  try {
    const result = await cartManager.updateQuantiyProductsCart(
      req.params.pid,
      req.params.cid,
      req.body
    );
    res.json(result);
  } catch (error) {
    next(new ErrorNotFoundCarts())
  }
}
