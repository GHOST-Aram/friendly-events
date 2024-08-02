import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import { tokenPayloadCreator, TokenPayload } from "../../../z-library/auth/types"

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

    public createTokenPayload = (user: any, callBack: tokenPayloadCreator): TokenPayload =>{
        return callBack(user)
    }
}



export const auth = new Authenticator