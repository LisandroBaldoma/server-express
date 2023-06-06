import { Product } from "../dao/Models/Product.js";
import { productsManager } from "../dao/mongoodb/product.manager.js";
import { cartRpository } from "../repositories/cart.repository.js";
import { productsRepository } from "../repositories/product.respository.js";

class ProductsService {
  async crearProduct(product) {
    const productNew = new Product(product);
    const result = await productsRepository.create(productNew.datosProduct());
    return result;
  }
  async descotarStock(pid, quantity){ 
    //console.log(pid,quantity)
    const product = await productsRepository.findById(pid);
    if(product.stock < quantity){
      throw new Error('Stock insuficiente')
    }
    //console.log(product)
    product.stock = product.stock - quantity;
    //console.log(product)    
    product.save()
    return product
  }
  
  
}

export const productService = new ProductsService();
