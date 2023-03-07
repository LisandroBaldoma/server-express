import { Product } from "./Product.js";
import fs from "fs/promises";
import { randomUUID } from "crypto";

export class ProductManager {
  #ruta;
  #products;
  constructor(ruta) {
    this.#ruta = ruta;
  }
  async #readProducts() {
    const json = await fs.readFile(this.#ruta, "utf-8");
    this.#products = JSON.parse(json);
  }
  async #writeProduct() {
    const json = JSON.stringify(this.#products, null, 2);
    await fs.writeFile(this.#ruta, json);
  }
  async getProducts() {
    await this.#readProducts();
    if (this.#products.length === 0) {
      throw new Error("No hay productos cargados");
    }
    return this.#products;
  }
  async createProduct({
    title,
    description,
    stock,
    code,
    price,
    img,
    category,
    id = randomUUID(),
  }) {
    await this.#readProducts();
    const newProduct = new Product({
      title,
      description,
      stock,
      code,
      price,
      img,
      category,
      id,
    });
    const product = this.#products.find((prod) => prod.code === newProduct.code);
    if (product) {
      throw new Error("El codigo del producto ya existe");
    }
    this.#products.push(newProduct);
    await this.#writeProduct();
    return newProduct;
  }
  async getProductByID(id) {
    await this.#readProducts();
    const product = this.#products.find((prod) => prod.id === id);
    if (!product) {
      throw new Error(`No existen productos con id ${id}`);
    }
    return product;
  }
  async updateProduct(id, update) {
    if (Object.hasOwn(update, "id")) {
      delete update["id"];
    }

    await this.#readProducts();
    const index = this.#products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      throw new Error("El producto que desea actualizar no Existe");
    } else {
      const newUpdate = { ...this.#products[index], ...update };
      this.#products.splice(index, 1, newUpdate);
      await this.#writeProduct();
      return this.#products;
    }
  }
  async deletedProduct(id) {
    await this.#readProducts();
    const index = this.#products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      throw new Error("El producto que desea eliminar no existe");
    } else {
      this.#products.splice(index, 1);
      this.#writeProduct();
    }
  }
}
