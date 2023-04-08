import { UserMongoo } from "../managers/mongoodb/Models/UserMongoo.js";
import { encriptar, createSalt } from "../utils/criptografia.js";
import { userManager } from "../managers/mongoodb/user.manager.js";


export async function userController(req, res, next){
    
    const salt = createSalt();    
    const newUser = new UserMongoo({...req.body, salt:salt, password:encriptar(req.body.password, salt)})
    //console.log(newUser);    
    const result = await userManager.createUser(newUser);    
    res.json(newUser);
  }