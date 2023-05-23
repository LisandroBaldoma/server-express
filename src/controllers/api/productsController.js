//import { productsManager } from "../../dao/mongoodb/product.manager.js";
import { productsRepository } from "../../repositories/product.respository.js";
import { productService } from "../../services/products.service.js";

export async function handlePost(req, res, next) {
  try {
    const result = await productService.crearProduct(req.body);
    res.json({ status: "Producto Creado", payload: result });
  } catch (error) {
    next(error);
  }
}

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const result = await productsRepository.getProductByID(req.params.id);
      res.json(result);
    } else {
      const result = await productsRepository.getProducts(req.query);
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
}

export async function handlePut(req, res, next) {
  try {
    const productUpdate = await productsRepository.updateProduct(
      req.params.id,
      req.body
    );
    res.json({ status: "Update", payload: productUpdate });
  } catch (error) {
    next(error);
  }
}

export async function handleDelete(req, res, next) {
  try {
    const deleteProduct = await productsRepository.deletedProduct(req.params.id);
    res.json({ status: "deleted", payload: deleteProduct });
  } catch (error) {
    next(error);
  }
}
