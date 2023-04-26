import { IDNOTFOUND } from "../../error/codError.js";
import { createSalt, encriptar } from "../../utils/criptografia.js";
import userModel from "../Models/User.Mongoose.js";



class UserManager {
  // async getUsers() {
  //   const users = await userModel.find().lean();
  //   if (users.length === 0) {
  //     return users;
  //   }
  //   return users;
  // }
  // async getUserByID(id) {
  //   const user = await userModel.findById(id).lean();
  //   if (!user) {
  //     throw new Error(IDNOTFOUND);
  //   }
  //   return user;
  // }
  async getUserByEmail(email){
    console.log(email)
    const user = await userModel.findOne(email).lean()
    return user
  }

  async createUser(user) {
    const salt = createSalt();    
    const newUser = await userModel.create({...user, salt:salt, password:encriptar(user.password, salt)});
    return newUser;
  
  }  
    
      
    
  async delete() {}
  async updtae() {}
  async loguear() {}
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
