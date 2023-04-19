import { IDNOTFOUND } from "../../error/codError.js";
import userModel from "../Models/User.Mongoose.js";

class UserManager {
  async getUsers() {
    const users = await userModel.find().lean();
    if (users.length === 0) {
      return users;
    }
    return users;
  }
  async getUserByID(id) {
    const user = await userModel.findById(id).lean();
    if (!user) {
      throw new Error(IDNOTFOUND);
    }
    return user;
  }
  async createUser(user) {
    const newUser = await userModel.create(user);
    return newUser;
  }
  async delete() {}
  async updtae() {}
  async loguear() {}
}

export const userManager = new UserManager();
