export class User {
    constructor({ name, lastName, email, password, salt }){
        this.name = name,
        this.lastName = lastName,
        this.email = email,
        this.password = password,
        this.salt = salt
    }
}

// salt codigo que uso paara encriptar y desencriptar contraseñas.