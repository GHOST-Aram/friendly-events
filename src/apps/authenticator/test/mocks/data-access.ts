import { jest } from "@jest/globals"
import { hash } from "bcrypt"
import mongoose, { HydratedDocument, Schema } from "mongoose"


export class DataAccess{

    public findUserByEmail = jest.fn( async(email: string): Promise<HydratedDocument<any> | null> =>{
        
        if(email === registeredEmail){
            const hashedPassword = await hash(password, 10)
            const mockUser =  new User({...userData, password: hashedPassword})
            
            return mockUser

        } else return null
    })
}

const User = mongoose.model('User', new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}))

const password = 'CorrectPassword2030'
const registeredEmail = 'correctEmail@gmail.com'

const userData = { first_name: 'John', last_name: 'Doe', 
        email: registeredEmail,
        password: '',
}

export const dataAccess = new DataAccess()