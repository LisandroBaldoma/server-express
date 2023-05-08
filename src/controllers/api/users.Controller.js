import { User } from "../../dao/Models/User.js";
import { ErrorDeAutenticacion } from "../../dao/Models/errors/ErrorDeAutenticacion.js";
import { cartManager } from "../../dao/mongoodb/cart.manager.js";
import { userManager } from "../../dao/mongoodb/user.manager.js";
import { hashearPassword } from "../../utils/criptografia.js";
import { Cart } from "../../dao/Models/Cart.js"

export async function postUsersController(req, res, next) {
  try {
    const datosNewUser = req.body
    datosNewUser.password = hashearPassword(datosNewUser.password)
    const newCart = new Cart();
    const cartUser = await cartManager.createCart(newCart);
    
    datosNewUser.cart = cartUser.id    
    
    const newUser = new User(datosNewUser)
    const user = await userManager.createUser(newUser.datosUser());

    // funcion de passport para que el registro ya me deje logueado tambien!
    req.login(user, (error) => {
      if (error) {
        next(new ErrorDeAutenticacion());
      } else {
        res.status(201).json(req.user);
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserController(req, res, next) {
  const users = await userManager.getAllUsers();
  res.json(users);
}

export async function getUserById(req, res, next) {
  //console.log(req.params.id)
  const user = await userManager.getUserByID(req.params.id)
  res.json(user)
}


