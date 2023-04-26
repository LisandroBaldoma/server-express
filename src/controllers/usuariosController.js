import { userManager } from "../dao/mongoodb/user.manager.js";

export async function registerUsuario(req, res, next){    
    
    const usuarioCreado = await userManager.createUser(req.body)
    
    req.session.user = {
      name: usuarioCreado.name,
      lastName: usuarioCreado.lastName,
      email: usuarioCreado.email
    }
    console.log(usuarioCreado)        
    
    
    
   
  
  }