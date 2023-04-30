import express, { Router } from 'express'
import { productsRouter } from "./api/productsRouter.js"
import { cartRouter } from "./api/cartRouter.js";
import { userRouter } from './api/userRouter.js';
import { sessionsRouter } from './api/sessionsRouter.js'


export const apiRouters = Router()

apiRouters.use(express.json());
apiRouters.use(express.urlencoded({ extended: true }));

apiRouters.use('/products', productsRouter) 
apiRouters.use('/carts', cartRouter)
apiRouters.use('/user', userRouter )
apiRouters.use('/sessions', sessionsRouter) // http://localhost:8080/api/sessions




