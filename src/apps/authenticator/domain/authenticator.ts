import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import { AuthData, userDataAggregator } from "../../../z-library/types"

export class Authenticator{

    public verifyPassword = (savedPassword: string, incomingPassword: string): boolean =>{
        return compareSync(incomingPassword, savedPassword)
    }

    public issueToken = (user: any, secretOrkey: string): string =>{
        return jwt.sign({
            ...user
        }, 
        secretOrkey, 
        
        {
            expiresIn: '30d',
            subject: user.id
        })
    }

    public aggregateUserData = (user: any, callBack: userDataAggregator): AuthData =>{
        return callBack(user)
    }
}



export const auth = new Authenticator