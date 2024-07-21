import { NextFunction, Response, Request } from "express"
import { DataAccess } from "../data-access/data-access"
import 'dotenv/config'
import { auth } from "../domain/authenticator"

export class AuthController{

    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }

    public signIn = async(req: Request, res: Response, next: NextFunction) =>{
        //Verify user details and issue authentication token
        const { email, password } = req.body

        const secretOrkey = process.env.TOKEN_SECRET

        try {
            if(secretOrkey){

                const user = await this.dataAccess.findUserByEmail(email)
                
                if(!user){
                    this.respondWithUnauthorised(res, 'Email not registered with the system.')

                } else {
                    const isValidPassword = auth.verifyPassword(user?.password, password)
    
                    if(!isValidPassword){
                        this.respondWithUnauthorised(res, 'Incorrect password.')
                    } else {
                        const token = auth.issueToken({
                            email: user.email,
                            name: user.fullName,
                            role: user.role,
                            id: user._id ? user._id.toString() : user.id,
                        }, secretOrkey )
        
                        this.respondWithToken(token, res)  
                    }
                } 
                
            } else {
                throw new Error('Token secret not Found.')
            }
                
        } catch (error) {
            next(error)
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