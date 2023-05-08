export class User {
  #name;
  #lastName;
  #email;
  #age;
  #cart;
  #password;
  #rol;

  constructor({ name, lastName, email, age, cart, password, rol }) {
    this.#name = name;
    this.#lastName = lastName;
    this.#email = email;
    this.#age = age;
    this.#cart = cart;
    this.#password = password;
    this.#rol = rol
  }

  get name() {
    return this.#name;
  }
  get lastName() {
    return this.#lastName;
  }
  get email() {
    return this.#email;
  }
  get age() {
    return this.#age;
  }
  get cart() {
    return this.#cart;
  }
  get password() {
    return this.#password;
  }
  get rol() {
    return this.#rol
  }

  datosUser() {
    return {
      name: this.#name,
      lastName: this.#lastName,
      email: this.#email,
      age: this.#age,
      cart: this.#cart,
      password: this.#password,
      rol: this.#rol
    };
  }
}
