import express, { Router } from "express";
//import { PORT } from "./config/servidor.config.js";
import { apiRouters } from "./routers/apiRouters.js";
import { webRouters } from "./routers/web/webRouters.js";
import { engine } from "express-handlebars";
import { Server as SocketIOServer } from "socket.io";
import session from "./middlewares/session.js";
import { passportInitialize, passportSession } from "./middlewares/passport.js";
import { manejoDeErrores } from "./middlewares/manejoDeErroresRest.js";

import dotenv from 'dotenv'

// Variables de entorno
dotenv.config({
  path:  
  process.argv.slice(2)[0] === 'memoria' ? 'memoria.env' : process.argv.slice(2)[0] === 'atlas' ? 'atlas.env' : 'mongodb.env' 
})

// Configuracion Server
const app = express();

const httpServer = app.listen(process.env.PORT, () => {
  console.log(`Escuchando en puerto ${process.env.PORT}`);
});
// me permite entAblar una comunnicacion entre los socket del servidor y del cliente
const io = new SocketIOServer(httpServer);

// Conexion a la BD
// await conectarMongooseDb();

// Configuracion socketIO
io.on("connection", async (socket) => {
  console.log("Cliente nuevo Conectado");
});

app.use((req, res, next) => {
  req["io"] = io;
  next();
});

// Configuracion Hanglebars
app.engine("handlebars", engine());
// seteo mi carpeta views para acceder a las vistas
app.set("views", "./views");
// seteo para la extension de los achivos de ls vistas para evitar poner .handlebars
app.set("view engine", "handlebars");
// ruta a mi carpeta "static" para poder acceder a archivos desde mi html por medio de link.

//Configuracion rutas del servidor
app.use("/static", express.static("./static"));

// Configuracion Passport
app.use(session);
app.use(passportInitialize, passportSession);

app.use("/", webRouters);
app.use("/api", apiRouters);
app.use(manejoDeErrores)

