import { IDNOTFOUND } from "../../error/codError.js";
import { hashearPassword } from "../../utils/criptografia.js";
import userModel from "../Models/User.Mongoose.js";

class UserManager {
  
  async getUserByID(id) {
    const user = await userModel.findById(id).lean();    
    return user;
  }

  async getUserByEmail(email) {
    console.log(email);
    const user = await userModel.findOne(email).lean();
    return user;
  }

  async createUser(user) {
    const newUser = await userModel.create({
      ...user,
      password: hashearPassword(user.password),
    });
    return newUser;
  }

  async getAllUsers(){
    const users = await userModel.find().lean()
    return users
  }

  async updtaePassword(body) {
    const passwordUpdate = await userModel.findOne(body.email).lean();
    //TODO UPDATE PASSWORD 
  }

  async delete() {}
  
  
}

// async loguear( { email, password } ) {
//   //console.log(password)
//   await this.#read()
//   const user = this.#users.find((user) => user.email === email)

//   if(user.password === encriptar(password, user.salt)){
//     return user
//   }else{
//     throw new Error('credenciales Invalidas')
//   }

// }

export const userManager = new UserManager();
