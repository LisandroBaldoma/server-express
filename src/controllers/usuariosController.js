import { userManager } from "../dao/mongoodb/user.manager.js";

export async function registerUsuario(req, res, next) {
  try {
    const usuarioCreado = await userManager.createUser(req.body);
    return usuarioCreado;
    // req.session.user = {
    //   name: usuarioCreado.name,
    //   lastName: usuarioCreado.lastName,
    //   email: usuarioCreado.email
    // }
  } catch (error) {
    next(error);
  }
}

export async function updateUsuarioPassword(req, res, next){
  try {
    // TODO UPDATE PASSWORD
    const user = await userManager.updtaePassword(req.body)
  } catch (error) {
    next(error)
  }
}
