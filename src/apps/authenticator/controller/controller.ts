import { NextFunction, Response, Request } from "express"
import { DataAccess } from "../data-access/data-access"
import 'dotenv/config'
import { auth } from "../domain/authenticator"
import { createUserDataForAuth } from "../../../utils/auth-user-data"

const secretOrkey = process.env.TOKEN_SECRET

export class AuthController{

    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }

    public signIn = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { email, password } = req.body

        try {
            if(secretOrkey){

                const user = await this.dataAccess.findUserByEmail(email)
                this.verifyUserAndIssueToken(user, password, res)

            } else {
                throw new Error('Token secret not Found.')
            }
                
        } catch (error) {
            next(error)
        } 
    }

    private verifyUserAndIssueToken = (user:any, incomingPassword: string, res: Response) =>{
        if(user){
            const isValidPassword = auth.verifyPassword(user?.password, incomingPassword)
            
            if(isValidPassword){
                const userData = createUserDataForAuth(user)
                const token = auth.issueToken(userData, secretOrkey as string )
                
                this.respondWithToken(token, res)  
            } else {
                this.respondWithUnauthorised(res, 'Incorrect password.')
            }
        } else {
            this.respondWithUnauthorised(res, 'Email not registered with the system.')
        } 
    }

    private respondWithUnauthorised = (res: Response, reason?: string) =>{
        res.status(401).json(`Unauthorised. ${reason ? reason : ''}` )
    }

    private respondWithToken = (token: string, res: Response) =>{
        res.status(201).json({ token })
    }

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json('Method not allowed' )
    }
}

