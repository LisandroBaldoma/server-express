// import { encriptar, createSalt } from "../utils/criptografia.js";
// import { userManager } from "../dao/mongoodb/user.manager.js";


// export async function registerUsuario(req, res, next){    
//   try {
//     const usuarioCreado = await userManager.createUser(req.body)
//     // Como las sessions no se guardan a menos que esten inicializadas para que se cree una session necesito  guardarle algo
//     // Elimino el password porque no quiero mostrarlo
//     req.session.user = {
//       name: usuarioCreado.name,
//       lastName: usuarioCreado.lastName,
//       email: usuarioCreado.email
//     }
//     console.log(usuarioCreado)        
    
//     //res.json(req.session.user);
    
//   } catch (error) {
//     next(error)
//   }  
  
//   }

// export async function loginUser(req, res, next){
//   res.json('OK')
// }  

