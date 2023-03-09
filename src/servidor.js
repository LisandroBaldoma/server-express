import express, { Router } from "express"
import { apiRouters } from "./routers/apiRouters.js";
import { IDNOTFOUND,CODEXIST,EMPTY } from './error/codError.js'

const app = express();

app.use('/api', apiRouters)

app.use((error, req, res, next) => {
    switch(error.message){
        case IDNOTFOUND:
            res.status(404)
            break
        case CODEXIST:
            res.status(400)
            break
        case EMPTY:
            res.status(400)
            break
        default:
            res.status(500)            
    }
    res.json({ message: error.message })
})
  
const PORT = 8080
const server = app.listen(PORT, () => { console.log(`Escuchando en puerto ${PORT}`) });



