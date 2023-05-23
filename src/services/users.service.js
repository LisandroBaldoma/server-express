import { Cart } from "../dao/Models/Cart.js";
import { User } from "../dao/Models/User.js";
import { cartRpository } from "../repositories/cart.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { hashearPassword } from "../utils/criptografia.js";

class UsersService {
  async registerUser(user) {
    const datosNewUser = user;
    datosNewUser.password = hashearPassword(datosNewUser.password);

    const newCart = new Cart();
    const cartUser = await cartRpository.createCart(newCart.datosCarts());

    datosNewUser.cart = cartUser.id;

    const newUser = new User(datosNewUser);
    const userRegister = await userRepository.createUser(newUser.datosUser());
    return userRegister;
  }
}

export const usersService = new UsersService();
