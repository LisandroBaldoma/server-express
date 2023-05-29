import { Product } from "../dao/Models/Product.js";
import { productsManager } from "../dao/mongoodb/product.manager.js";
import { productsRepository } from "../repositories/product.respository.js";

class ProductsService {
  async crearProduct(product) {
    const productNew = new Product(product);
    const result = await productsRepository.create(productNew.datosProduct());
    return result;
  }
}

export const productService = new ProductsService();
