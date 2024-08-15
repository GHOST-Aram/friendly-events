import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import { tokenPayloadCreator, TokenPayload } from "../../../zero/auth/types"
import { ZeroUser } from "../../../zero/bases/user"

export class Authenticator{

    public verifyPassword = (savedPassword: string, incomingPassword: string): boolean =>{
        return compareSync(incomingPassword, savedPassword)
    }

    public issueToken = (tokenPayload: TokenPayload, secretOrkey: string): string =>{
        return jwt.sign({
            ...tokenPayload
        }, 
        secretOrkey, 
        
        {
            expiresIn: '30d',
            subject: tokenPayload.id
        })
    }

    public createTokenPayload = (user: ZeroUser, callBack: tokenPayloadCreator): TokenPayload =>{
        return callBack(user)
    }
}



export const auth = new Authenticator