import { NextFunction, Request, Response } from "express";
import Auth from "../../auth/auth";

export class Authenticator extends Auth{

    public user:any
    constructor(user: any){
        super()
        this.user = user
    }

    public authenticate = () =>{
    
        return (req: Request, res: Response, next: NextFunction) =>{
            const id = req.params.id
            
            this.user._id = "64c9e4f2df7cc072af2ac8a4"
            req.user = this.user
            next()
        }
    } 
}

