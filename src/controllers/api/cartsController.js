import { cartRpository } from "../../repositories/cart.repository.js";
import { cartService } from "../../services/carts.service.js";

export async function handlePost(req, res, next) {
  try {
    const result = await cartService.createCarts();
    res.send({ status: "succes", payload: result });
  } catch (error) {
    next(error);
  }
}

export async function handlePostAdd(req, res, next) {
  try {
    const result = await cartRpository.addProductCart(
      req.params.cid,
      req.params.pid
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleGet(req, res, next) {
  try {
    const result = await cartRpository.getCartById(req.params.cid);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteAll(req, res, next) {
  try {
    const result = await cartRpository.deleteAllProductCart(req.params.cid);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteOne(req, res, next) {
  try {
    const result = await cartRpository.deleteProductCart(
      req.params.cid,
      req.params.pid
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleUpdateOne(req, res, next) {
  try {
    const result = await cartRpository.updateProductsCart(
      req.body,
      req.params.cid
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function HandleUpdateQuantiy(req, res, next) {
  try {
    const result = await cartRpository.updateQuantiyProductsCart(
      req.params.pid,
      req.params.cid,
      req.body
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}
