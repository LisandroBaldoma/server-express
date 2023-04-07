//import { productDb } from '../database/mongoose.js'
import { Product } from '../managers/fileSystem/models/Product.js';
import { productsManager } from '../managers/mongoodb/product.manager.js';


export async function productsController(req, res, next){
    //console.log(req.body)
    //const newProducts = req.body;
    const newProducts = new Product(req.body)
    const result = await productsManager.writeProduct(newProducts)
    //console.log(result);
    res.json(result);
  }