import crypto from 'crypto'
// Un salt sera un codigo secreto unico para cada encriptado de contraseña 

export function createSalt () {
  const salt = crypto.randomBytes(128).toString('base64');
  return salt
}

export function encriptar(sinEncriptar, salt) {
  const encriptado = crypto.createHmac('sha256', salt).update(sinEncriptar).digest('hex');  
  return encriptado;
}  