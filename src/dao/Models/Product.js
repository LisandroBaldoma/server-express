export class Product {
  #title;
  #description;
  #stock;
  #price;
  #code;
  #category;
  #thumbnails;
  #status;

  constructor({
    title,
    description,
    stock,
    price,
    code,
    category,
    thumbnails,
    status,
  }) {
    this.#title = title;
    this.#description = description;
    this.#stock = stock;
    this.#price = price;
    this.#code = code;
    this.#category = category;
    this.#thumbnails = thumbnails;
    this.#status = status;
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
  get status() {
    return this.#status;
  }

  datosProduct() {
    return {
        title: this.#title,
        description: this.#description,
        stock: this.#stock,
        price: this.#price,
        code: this.#code,
        category: this.#category,
        thumbnails: this.#thumbnails,
        status: this.#status,
    };
  }
}
