import express, { Router } from "express"
import { PORT } from "./config/servidor.config.js"
import { apiRouters } from "./routers/apiRouters.js"
import { webRouters } from "./routers/web/webRouters.js"
import { IDNOTFOUND,CODEXIST,EMPTY } from './error/codError.js'
import { engine } from 'express-handlebars'
import  { Server as SocketIOServer } from 'socket.io'
import IOSocket from './IOSocket.js'
import { conectarMongooseDb } from "./database/mongoose.js"
import session from "./middlewares/session.js"
import { passportInitialize, passportSession } from "./middlewares/passport.js"


// Configuracion Server 
const app = express();
//const PORT = 8080
const httpServer = app.listen(PORT, () => { console.log(`Escuchando en puerto ${PORT}`) });
// me permite entAblar una comunnicacion entre los socket del servidor y del cliente
const io = new SocketIOServer(httpServer) 

await conectarMongooseDb();
IOSocket(io);

// Configuracion Hanglebars
app.engine('handlebars', engine());
// seteo mi carpeta views para acceder a las vistas 
app.set('views','./views');
// seteo para la extension de los achivos de ls vistas para evitar poner .handlebars
app.set('view engine', 'handlebars');
// ruta a mi carpeta "static" para poder acceder a archivos desde mi html por medio de link.

//Configuracion rutas del servidor
app.use('/static', express.static('./static'))



app.use(session)
app.use(passportInitialize, passportSession)


// Cargo Passport en el servior express como middlware
//app.use(passportInitialize, passportSession)


app.use('/', webRouters)
app.use('/api', apiRouters)

// Manejo de errores 
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
  





