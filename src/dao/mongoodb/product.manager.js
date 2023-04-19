import productModel from "../Models/Product.mongoose.js";

class ProductManager {  

  async createProduct(product) {
    const newProduct = await productModel.create(product);
    return newProduct;
  }

  async getProducts() {
    const products = await productModel.find().lean();
    if (products.length === 0) {
      return products;
    }
    console.log(products)
    return products;
  }

  async getProductByID(id) {
    const product = await productModel.findById(id).lean();
    if (!product) {
      throw new Error(IDNOTFOUND);
    }
    return product;
  }
  async updateProduct(id, body){    
      const prodUpdate = await productModel.findByIdAndUpdate(id, body);  
      if(!prodUpdate){
        throw new Error(IDNOTFOUND); 
      }
      return prodUpdate  
    }
  
  async deletedProduct(id) {
    const deleteProduct = await productModel.findByIdAndDelete(id);
    if(!deleteProduct){
      throw new Error(IDNOTFOUND); 
    }
    return deleteProduct;
    
  }
  
}

export const productsManager = new ProductManager();
