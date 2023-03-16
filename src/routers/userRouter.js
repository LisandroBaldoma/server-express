import express, { Router } from "express"
import {UserManager} from '../UserManager.js'

export const userRouter = Router()

const um = new UserManager('./database/users.json');

userRouter.post('/', async (req, res, next)=>{
    const body = req.body
    await um.createUser({...req.body})    
    res.send({respuesta:"registro exitoso"})
})