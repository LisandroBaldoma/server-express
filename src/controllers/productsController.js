import { query } from "express";
import productModel from "../dao/Models/Product.mongoose.js";
import { productsManager } from "../dao/mongoodb/product.manager.js";

export async function create(req, res, next) {
  try {
    const newProducts = new productModel(req.body);
    const result = await productsManager.createProduct(newProducts);
    res.json(result);    
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  //PAGINACION
  console.log(req.limit)
  console.log(req.page)
  console.log(req.query)
  console.log(req.sort)

  try {
    const options = {
      page: req.limit,
      limit: req.page,
      page: req.query,
      sort: req.sort,
    };
    const result = await productModel.paginate({},{options, lean:true})
    
    
    const response = {
      payload: "Resultado de los productos solicitados",
      docs: result.docs,
      totalDocs: result.totalPages,      
      limit: result.limit,
      totalPages: result.totalPages,
      page: result.page,
      pagingCounter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage
    }
    res.json(response)        
    console.log(result)
    
   
  } catch (error) {
    next(error);
  }
}




// if (req.query.limit) {
//   try {
//     const { limit } = req.query;
//     const personas = await productsManager.getProducts();
//     res.json(personas.slice(0, limit));
//   } catch (error) {
//     next(error);

//   }
// } else {
//   try {
//     const products = await productsManager.getProducts();
//     res.json(products);
//   } catch (error) {
//     next(error);
//     //
//   }
// }

export async function getProductByID(req, res, next) {
  try {
    const result = await productsManager.getProductByID(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
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
    next(error);
  }
}

export async function deletedProduct(req, res, next) {
  try {
    const deleteProduct = await productsManager.deletedProduct(req.params.id);
    res.json({ status: "deleted", payload: deleteProduct });
  } catch (error) {
    next(error);
  }
}
