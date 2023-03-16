import express, { Router } from "express"
import { apiRouters } from "./routers/apiRouters.js"
import { webRouters } from "./routers/webRouters.js"
import { IDNOTFOUND,CODEXIST,EMPTY } from './error/codError.js'
import { engine } from 'express-handlebars'
import  { Server as SocketIOServer } from 'socket.io'
import { ProductManager } from "./ProductManager.js"

const app = express();
const PORT = 8080

const pm = new ProductManager('./database/products.json')

const httpServer = app.listen(PORT, () => { console.log(`Escuchando en puerto ${PORT}`) });

const io = new SocketIOServer(httpServer) // me permite entblar una comunnicacion entre los socket del servidor y del cliente

// metodos para agregar evento y escucharlos
// 'on' me permite cargar un addEventListener 
// clientSocket representa al evento, tiene todos los eventos para comunicarmecon el cliente que se acaba de conectar
// EMIT es la operacion de enviar un evento de un lado al otro para eso necesito que este de los dos lados cliente y servidos
// el nombre del evento en el emit debe ser el mismo que recibe en el clente por medio del  on


io.on('connection',  async clientSocket => {
    console.log(`Nuevo cliente conectado! socket id # ${clientSocket.id}`, )
    //clientSocket.emit('mensajito', {hola:'mundo'})
    clientSocket.on('createNewProduct', async newProduct => {        
        console.log(`socket id # ${clientSocket.id}, dice: `, )
        //console.log(newProduct)       
        const product = await pm.createProduct({... newProduct})
    })
    io.sockets.emit('productsListUpdate', await pm.getProducts())
})
    io.sockets.emit('productsListUpdate', await pm.getProducts())


    app.engine('handlebars', engine());
// seteo mi carpeta views para acceder a las vistas 
app.set('views','./views');

// seteo para la extension de los achivos de ls vistas para evitar poner .handlebars
app.set('view engine', 'handlebars');

// ruta a mi carpeta "static" para poder acceder a archivos desde mi html por medio de link.
app.use('/static', express.static('./static'))

app.use('/', webRouters)
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
  





