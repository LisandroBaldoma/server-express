import mongoose from "mongoose";

import productModel from "../Models/Product.mongoose.js";

class ProductManager {
  async createProduct(product) {
    const newProduct = await productModel.create(product);
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
    } = await productModel.paginate(opcion, paginacion);

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
    const product = await productModel.findById(id).lean();
    if (!product) {
      throw new Error(IDNOTFOUND);
    }
    return product;
  }
  async updateProduct(id, body) {
    const prodUpdate = await productModel.findByIdAndUpdate(id, body);
    if (!prodUpdate) {
      throw new Error(IDNOTFOUND);
    }
    return prodUpdate;
  }

  async deletedProduct(id) {
    const deleteProduct = await productModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      throw new Error(IDNOTFOUND);
    }
    return deleteProduct;
  }
}

export const productsManager = new ProductManager();
