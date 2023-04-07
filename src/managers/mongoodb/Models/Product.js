export class Product {
  #title;
  #description;
  #stock;
  #price;
  #code;
  #category;
  #thumbnails;
  constructor({
    title,
    description,
    stock,
    price,
    code,
    category,
    thumbnails,
  }) {
    this.#title = title;
    this.#description = description;
    this.#stock = stock;
    this.#price = price;
    this.#code = code;
    this.#category = category;
    this.#thumbnails = thumbnails;
  }
  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get stock() {
    return this.#stock;
  }
  get price() {
    return this.#price;
  }
  get code() {
    return this.#code;
  }
  get category() {
    return this.#category;
  }
  get thumbnails() {
    return this.#thumbnails;
  }

  datos() {
    return {
      title: this.#title,
      description: this.#description,
      stock: this.#stock,
      price: this.#price,
      code: this.#code,
      category: this.#category,
      thumbnails: this.#thumbnails,
    };
  }
}
