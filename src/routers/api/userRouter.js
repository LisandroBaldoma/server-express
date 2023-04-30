import express, { Router } from "express"
import { getUserController, postUsersController } from "../../controllers/api/users.Controller.js"
import { soloLogueadosApi, soloLogueadosView } from "../../middlewares/soloLogueados.js"

export const userRouter = Router()

userRouter.post('/', postUsersController) // METODO POST http://localhost:8080/api/user registro del usuario atravez de user.Controller

userRouter.get('/', soloLogueadosView, getUserController) // METODO GET http://localhost:8080/api/user me traer todos los usuarios a travez de user.Controller





