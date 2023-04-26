import { userManager } from "../dao/mongoodb/user.manager.js";


export async function postSesiones(req, res, next) {
  console.log(req.body);
  const usuarioEncontrado = await userManager.getUserByEmail({ email: req.body.email })
    
  if (!usuarioEncontrado) {
    return res.sendStatus(401);
  }

  // validar contraseña hasheada

  if(usuarioEncontrado.email === "adminCoder@coder.com"){
    req.session.user = {
      name: usuarioEncontrado.name,
      lastName: usuarioEncontrado.lastName,
      email: usuarioEncontrado.email,
      role: "ADMIN"
    }

  }else{
    req.session.user = {
      name: usuarioEncontrado.name,
      lastName: usuarioEncontrado.lastName,
      email: usuarioEncontrado.email,
      role: "USER"
    }
  }
  res.status(201).json(req.session.user);
}

export async function deleteSessiones(req, res, next) {
  req.session.destroy((err) => {
    res.sendStatus(200);
  });
}
