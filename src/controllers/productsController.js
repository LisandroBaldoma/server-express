import { Product } from '../managers/mongoodb/Models/Product.js';
import { productsManager } from '../managers/mongoodb/product.manager.js';


export async function productsController(req, res, next){
    const newProducts = new Product(req.body)
    //console.log(newProducts)    
    const result = await productsManager.writeProduct(newProducts)
    res.json(result);
  }
