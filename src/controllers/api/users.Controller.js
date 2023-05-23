import { ErrorDeAutenticacion } from "../../dao/Models/errors/ErrorDeAutenticacion.js";
import { userRepository } from "../../repositories/user.repository.js";
import { usersService } from "../../services/users.service.js";

export async function handlePost(req, res, next) {
  try {
    const user = await usersService.registerUser(req.body);
    // funcion de passport para que el registro ya me deje logueado tambien!
    req.login(user, (error) => {
      if (error) {
        next(new ErrorDeAutenticacion());
      } else {
        res.status(201).json(req.user);
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function handleGet(req, res, next) {
  if (req.params.id) {
    const user = await userRepository.getUserByID(req.params.id);
    res.json(user);
  } else {
    const users = await userRepository.getAllUsers();
    res.json(users);
  }
}
