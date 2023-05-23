import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schemaProduct = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    thumbnails: { type: Array, required: true },
    status: { type: Boolean, required: true },
  },
  { versionKey: false }
);

schemaProduct.plugin(mongoosePaginate);

const productModel = model(collection, schemaProduct);

class ProductManager {
  #product;
  constructor() {
    this.#product = productModel;
  }

  async createProduct(product) {
    const newProduct = await this.#product.create(product);
    return newProduct;
  }  
  async getProducts(params) {
    //PAGINACION
    let opcion;

    let paginacion = {
      limit: params.limit ? params.limit : 5,
      page: params.page ? params.page : 1,
      lean: true,
      sort: params.sort ? { stock: params.sort } : "",
    };
    params.query
      ? (opcion = {
          category: params.query,
        })
      : (opcion = {});

    const {
      docs,
      totalDocs,
      limit,
      totalPages,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    } = await this.#product.paginate(opcion, paginacion);

    const respuesta = {
      status: "Success",
      payload: docs,
      totalDocs,
      limit,
      page,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink:
        hasPrevPage == true
          ? `http://localhost:8080/products?page=${prevPage}`
          : null,
      nextLink:
        hasNextPage == true
          ? `http://localhost:8080/products?page=${nextPage}`
          : null,
    };
    return respuesta;
  }
  async getProductByID(id) {
    const product = await this.#product.findById(id).lean();
    if (!product) {
      throw new Error("El producto no se encuentra en la BD");
    }
    return product;
  }
  async updateProduct(id, body) {
    const prodUpdate = await this.#product.findByIdAndUpdate(id, body);
    if (!prodUpdate) {
      throw new Error("El producto no se encuentra en la BD");
    }
    return prodUpdate;
  }
  async deletedProduct(id) {
    const deleteProduct = await this.#product.findByIdAndDelete(id);
    if (!deleteProduct) {
      throw new Error("El producto no se encuentra en la BD");
    }
    return deleteProduct;
  }
  async insertarTesting(product) {
    const insertar = await this.#product.insertMany(product);
    return insertar;
  }
  async deletedProductsTesting() {
    await this.#product.deleteMany({});
  }
}

export const productsManager = new ProductManager();
