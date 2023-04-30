import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// import { JWT_PRIVATE_KEY } from "../config/auth.config.js";

// Libreria crypto
// Un salt sera un codigo secreto unico para cada encriptado de contraseña

export function createSalt() {
  const salt = crypto.randomBytes(128).toString("base64");
  return salt;
}

export function encriptar(sinEncriptar, salt) {
  const encriptado = crypto
    .createHmac("sha256", salt)
    .update(sinEncriptar)
    .digest("hex");
  return encriptado;
}

//Libreria para encriptr contraseña Bcrypt

export function hashearPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function ValidarPassword(recibida, almacenada) {
  return bcrypt.compareSync(recibida, almacenada);
}

// Libreria JWT

// export function encriptarJWT(payload) {
//   const token = jwt.sign(JSON.parse(JSON.stringify(payload)), JWT_PRIVATE_KEY, {
//     expiresIn: "24h",
//   });
//   return token;
// }

// export function desencriptarJWT(token) {
//   return newPromise((resolve, reject) => {
//     jwt.verify(token, JWT_PRIVATE_KEY, (err, decodedPayload) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(decodedPayload);
//       }
//     });
//   });
// }
