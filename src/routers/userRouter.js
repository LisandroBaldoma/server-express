import express, { Router } from "express"
import { userController } from "../controllers/userController.js"


//import { userManager } from "../managers/mongoodb/user.manager.js"
//import { User } from "../managers/mongoodb/Models/User.js"
//import {UserManager} from '../managers/fileSystem/UserManager.js'

export const userRouter = Router()

//const um = new UserManager('./database/users.json');

userRouter.post('/', userController)


// userRouter.post('/', async (req, res, next)=>{
//     //const newUser = new User(req.body)
//     //await um.createUser({...req.body})
//     //const newUser = await userManager.createUser(req.body)
//     console.log({...req.body})    
//     res.send({respuesta:"registro exitoso"})
// })