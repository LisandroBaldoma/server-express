import { userManager } from "../../dao/mongoodb/user.manager.js";

export async function postUsersController(req, res, next) {
  console.log("Registro el usuario")
  const user = await userManager.createUser(req.body);
  
  // funcion de passport para que el registro ya me deje logueado tambien!
  req.login(user, (error) => {
    if (error) {
      next(new Error("falló el login!"));
    } else {
      res.status(201).json(req.user);
    }
  });
}

export async function getUserController(req, res, next) {
  const users = await userManager.getAllUsers();
  res.json(users);
}

// TODO CREAR CARPETA PARA ADJUNTAR TODOS LOS API CONTROLLERS JUNTO A CART CONTROLLER- PRODUCTSCONTROLLERS - USUARIOSCLNTROLLER
