import { NextFunction, Request, Response } from "express";
import { Authenticator as Auth } from "../auth";

class Authenticator extends Auth{

    public authenticate = () =>{
    
        return (req: Request, res: Response, next: NextFunction) =>{
            const id = req.params.id

            const user = {
                "fullName": "Does",
                "email": "johndoe@gmail.com",
                "password": "$2b$10$zeG83Ol2WQPHwHSsn3dj2u0iyrS7pP//GjKJHGbs2nsJ7UoBPpH8G",
                "userGroup": "superuser",
                 "_id": id ? id: "64c9e4f2df7cc072af2ac8a4",
                "__v": 0    
            }
            req.user = user
            next()
        }
    } 
}


export const authenticator = new Authenticator()