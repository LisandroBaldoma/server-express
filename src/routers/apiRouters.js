import express, { Router } from 'express'
import { productsRouter } from "./productsRouter.js"
import { cartRouter } from "./cartRouter.js";
//import { webRouters } from './webRouters.js';
import { userRouter } from './userRouter.js';
import { sessionsRouter } from './sessionsRouter.js'
import { soloLogueadosApi } from '../middlewares/soloLogueados.js';

export const apiRouters = Router()

apiRouters.use(express.json());
apiRouters.use(express.urlencoded({ extended: true }));

apiRouters.use('/products', productsRouter) 
apiRouters.use('/carts', cartRouter)
apiRouters.use('/user', userRouter )
apiRouters.use('/sessions', sessionsRouter) // http://localhost:8080/api/sessions




