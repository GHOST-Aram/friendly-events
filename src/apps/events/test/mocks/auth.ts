import { NextFunction, Request, Response } from "express";
import { Authenticatable } from "../../../../z-library/auth/auth";

class Authenticator implements Authenticatable{

    public authenticate = () =>{
    
        return (req: Request, res: Response, next: NextFunction) =>{
            const id = req.params.id

            const user = {
                "fullName": "Does",
                "userGroup": "superuser",
                "email": "johndoe@gmail.com",
                 "_id": id ? id: "64c9e4f2df7cc072af2ac8a4",
                "__v": 0    
            }
            req.user = user
            next()
        }
    } 
    
    public allowAdminUser =(adminChecker:(user:any) =>boolean) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const user: any = req.user
            if(adminChecker(user)){
                next()
            }
            else{
                res.status(403).json({ message: "Forbidden" })
            }
        }
    }
}


export const authenticator = new Authenticator()