import express, { Router } from "express"

import * as sesionesController from "../controllers/sesionesController.js"
import { registerUsuario } from "../controllers/usuariosController.js"

export const userRouter = Router()

userRouter.post('/', registerUsuario)

userRouter.post('/login', sesionesController.postSesiones)

userRouter.delete('/logout', sesionesController.deleteSessiones)




