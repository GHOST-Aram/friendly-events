import { NextFunction, Response, Request } from "../../../zero/types"
import { DataAccess } from "../data-access/data-access"
import { auth } from "../domain/authenticator"
import { createTokenPayload } from "../../../utils/auth-user-data"
import { getDataFromRequest } from "../../../zero/request"
import { secretOrKey } from "../../../_environment"

export class AuthController{

    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }

    public signIn = async(req: Request, res: Response, next: NextFunction) =>{
        
        const { reqBody } = getDataFromRequest(req)

        try {
            if(secretOrKey){

                const user = await this.findUser(reqBody.email)
                this.verifyUserAndIssueToken(user, reqBody.password, res)

            } else {
                throw new Error('Token secret not Found.')
            }
                
        } catch (error) {
            next(error)
        } 
    }

    private findUser = async(email: string) =>{
        return await this.dataAccess.findUserByEmail(email)
    }

    private verifyUserAndIssueToken = (user:any, incomingPassword: string, res: Response) =>{
        if(user){
            const isValidPassword = auth.verifyPassword(user?.password, incomingPassword)
            
            if(isValidPassword){
                const userData = auth.createTokenPayload(user, createTokenPayload)
                const token = auth.issueToken(userData, secretOrKey as string )
                
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

