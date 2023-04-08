import mongoose from 'mongoose';
import { IDNOTFOUND } from '../../error/codError.js'

const { Schema } = mongoose;

const schemaUser = new Schema(
    {
        name: { type: String, required: true }, 
        lastName: { type: String, required: true }, 
        email: { type: String, required: true },             
        password: { type: String, required: true }, 
        salt: { type: String, required: true }, 
    }, 
    { versionKey: false }
);

class UserManager{    
    constructor(){
        this.userDb = mongoose.model("users", schemaUser)
    }
    async getUsers(){
        const users = await this.userDb.find().lean()
        if( users.length === 0 ){
            return users
        }
        return users
    }
    async getUserByID(id){
        const user = await this.userDb.findById(id).lean()
        if(!user){
            throw new Error(IDNOTFOUND);
        }
        return user;
    }
    
    async createUser(user){

        const newUser = await this.userDb.create(user)
        return newUser
    }    
    async delete(){

    }
    async updtae(){

    }
    async loguear(){

    }
}

export const userManager = new UserManager();