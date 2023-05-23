import { Product } from "../dao/Models/Product.js";
import { productsRepository } from "../repositories/product.respository.js";

class ProductsService {
  async crearProduct(product) {
    const productNew = new Product(product);
    const result = await productsRepository.createProduct(
      productNew.datosProduct()
    );
    return result;
  }
}

export const productService = new ProductsService();
