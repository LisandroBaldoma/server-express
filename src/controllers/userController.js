import { encriptar, createSalt } from "../utils/criptografia.js";
import { userManager } from "../dao/mongoodb/user.manager.js";

export async function userController(req, res, next){
    
    const salt = createSalt();   
    const newUser = {...req.body, salt:salt, password:encriptar(req.body.password, salt)}
    const result = await userManager.createUser(newUser);    
    res.json(result);
  }