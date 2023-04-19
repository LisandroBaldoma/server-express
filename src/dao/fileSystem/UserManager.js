import { User } from "./User.js";
import { encriptar, createSalt } from "../../utils/criptografia.js";
import fs from "fs/promises";

export class UserManager {
  #users
  #ruta
  constructor(ruta) {
    this.#ruta = ruta;
    this.#users = [];
  }
  async #read() {
    const json = await fs.readFile(this.#ruta, "utf-8")
    this.#users = JSON.parse(json);
  }
  async #write(){
    const json = JSON.stringify(this.#users, null, 2)    
    await fs.writeFile(this.#ruta, json);
  }
  async createUser({ name, lastName, email, password}) {
    await this.#read()
    const salt = createSalt()    
    const user = new User({
      name,
      lastName,
      email,
      salt: salt,
      password: encriptar(password, salt),
      
    });
    this.#users.push(user);
    await this.#write()
    return user
  } 
  async loguear( { email, password } ) {
    //console.log(password)
    await this.#read()
    const user = this.#users.find((user) => user.email === email)
    
    if(user.password === encriptar(password, user.salt)){
      return user
    }else{
      throw new Error('credenciales Invalidas')
    }

  }
}

// TODO TERMINAR DE CREAR EL USEER NANAGGER CON TODOS SUS METODOS PARA PODER EDITAR ELIMINAR BUSCAR TDOS Y CADA USUARIO BY ID
