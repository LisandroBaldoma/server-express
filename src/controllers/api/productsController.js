import { Product } from "../../dao/Models/Product.js";

import { ErrorNotFoundProducts } from "../../dao/Models/errors/ErrorNotFound.js";

import { productsManager } from "../../dao/mongoodb/product.manager.js";

export async function create(req, res, next) {
  try {
    const product = new Product(req.body);
    const result = await productsManager.createProduct(product.datosProduct());
    res.json(result);
  } catch (error) {
    next(new ErrorNotFoundProducts())
  }
}

export async function getProduct(req, res, next) {  
  try {
    //console.log(req.query)
    const result = await productsManager.getProducts(req.query);
    res.json(result);
  } catch (error) {
    next(new ErrorNotFoundProducts())
    // next(error);
  }
}

export async function getProductByID(req, res, next) {
  //console.log(req.query.id)
  try {
    const result = await productsManager.getProductByID(req.params.id);
    res.json(result);
  } catch (error) {
    next(new ErrorNotFoundProducts())
    // next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const productUpdate = await productsManager.updateProduct(
      req.params.id,
      req.body
    );
    res.json(productUpdate);
  } catch (error) {
    next(new ErrorNotFoundProducts())
  }
}

export async function deletedProduct(req, res, next) {
  try {
    const deleteProduct = await productsManager.deletedProduct(req.params.id);
    res.json({ status: "deleted", payload: deleteProduct });
  } catch (error) {
    next(new ErrorNotFoundProducts())
  }
}

