import crypto from 'crypto'
import bcrypt from "bcrypt";

// Un salt sera un codigo secreto unico para cada encriptado de contraseña 

export function createSalt () {
  const salt = crypto.randomBytes(128).toString('base64');
  return salt
}

export function encriptar(sinEncriptar, salt) {
  const encriptado = crypto.createHmac('sha256', salt).update(sinEncriptar).digest('hex');  
  return encriptado;
}

//Libreria para encriptr contraseña Bcrypt

export function hashearPassword(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function ValidarPassword(recibida, almacenada){
  return bcrypt.compareSync(recibida,almacenada)
}