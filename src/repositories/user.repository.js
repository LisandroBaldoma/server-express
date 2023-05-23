import { usersDao } from "../dao/daos.factory.js";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  createUser(user) {
    return this.dao.createUser(user);
  }
  getUserByID(id) {
    return this.dao.getUserByID(id);
  }
  getUserByEmail(email) {
    return this.dao.getUserByEmail(email);
  }
  getAllUsers() {
    return this.dao.getAllUsers();
  }
}

export const userRepository = new UserRepository(usersDao);
