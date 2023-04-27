import { userManager } from "../dao/mongoodb/user.manager.js";
import { ValidarPassword } from "../utils/criptografia.js";

export async function postSesiones(req, res, next) {
  //console.log(req.body);

  const user = await userManager.getUserByEmail({
    email: req.body.email,
  });

  if (!user) {
    // return res.send({status:"error", error:"El usuario o contraseña son incorrectos"});
    return res.send(401).send({status:"error", error:"El usuario o contraseña son incorrectos"})
  }

  if (!ValidarPassword(req.body.password, user.password)) {
    // return res.send({status:"error", error:"El usuario o contraseña son incorrectos"});
    return res.status(401).send({status:"error", error:"El usuario o contraseña son incorrectos"})
  }

  delete user.password
  req.session.user = user;

  return res.status(200).send({status:"Success", payload:user})
  //res.status(201).json(req.session.user);
}

export async function deleteSessiones(req, res, next) {
  req.session.destroy((err) => {
    res.sendStatus(200);
  });
}
