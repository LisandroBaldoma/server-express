import express, { Router } from "express";
import {
  handleGet,
  handlePost,
  handletEmailPassword,  
  handletPostPasswordUpdate,
  handlePostUploadDocuments,
  handletgetCambiarRol
  
} from "../../controllers/api/users.Controller.js";
import {  
  soloLogueadosView,
} from "../../middlewares/soloLogueados.js";
import { extraerFoto } from "../../middlewares/extractDocuments.js";

export const userRouter = Router();

userRouter.post("/", handlePost); // METODO POST http://localhost:8080/api/user registro del usuario atravez de user.Controller

userRouter.get("/:id?", soloLogueadosView, handleGet); // METODO GET http://localhost:8080/api/user me traer todos los usuarios a travez de user.Controller

userRouter.post("/premium/:uid/documents", extraerFoto, handlePostUploadDocuments)

userRouter.get("/premium/:uid", handletgetCambiarRol)

userRouter.post("/passwordupdate", handletPostPasswordUpdate)

userRouter.post("/emailpassword", handletEmailPassword)

