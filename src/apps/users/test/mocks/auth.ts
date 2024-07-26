import { Authenticator as Auth } from "../../../../z-library/auth/mock/auth"
import { NextFunction, Response, Request } from "express"

export class Authenticator extends Auth{

    constructor(user: any){
        super(user)
    }

    public authenticate = () =>{
    
        return (req: Request, res: Response, next: NextFunction) =>{
            const id = req.params.id
            
            this.user._id = id ? id: "64c9e4f2df7cc072af2ac8a4"
            req.user = this.user
            next()
        }
    } 
}