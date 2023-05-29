import mongoose, { Schema } from "mongoose";
import { GenericDao } from "./GenericDao.js";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schemaUser = new mongoose.Schema(
  {
    id: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    cart: { type: Schema.Types.ObjectId, ref: "carts", required: true },
    lastName: { type: String, required: true },
    rol: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { versionKey: false }
);
schemaUser.plugin(mongoosePaginate);

const userModel = mongoose.model(collection, schemaUser);

export const userManager = new GenericDao(userModel);

// class UserManager {
//   #user
//   constructor(){
//     this.#user =  userModel
//   }

//   async getUserByID(id) {
//     //console.log(id)
//     const user = await this.#user.findById(id).populate('cart').lean();
//     return user;
//   }

//   async getUserByEmail(email) {
//     //console.log(email);
//     const user = await this.#user.findOne(email).lean();
//     return user;
//   }

//   async createUser(user) {
//     const newUser = await this.#user.create(user)
//     return newUser;
//   }

//   async getAllUsers(){
//     const users = await this.#user.find().lean()
//     return users
//   }

//   async updtaePassword(body) {
//     const passwordUpdate = await this.#user.findOne(body.email).lean();
//     //TODO UPDATE PASSWORD
//   }

//   async delete() {}

// }
