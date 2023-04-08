import mongoose from "mongoose";

const schemaProduct = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true }, // TODO AGREGAR PROPIEDAD UNIQUE Y PROBAR EL ERROR
    category: { type: String, required: true },
    thumbnails: { type: Array, required: true },
    status: { type: Boolean, require: true },
  },
  { versionKey: false }
);

class ProductManager {
  constructor() {
    this.productDb = mongoose.model("product", schemaProduct);
  }

  async writeProduct(product) {
    const newProduct = await this.productDb.create(product);
    return newProduct;
  }

  async getProducts() {
    const products = await this.productDb.find().lean();
    if (products.length === 0) {
      return products;
    }
    return products;
  }

  async getProductByID(id) {
    const product = await this.productDb.findById(id).lean();
    if (!product) {
      throw new Error(IDNOTFOUND);
    }
    return product;
  }
}

export const productsManager = new ProductManager();
