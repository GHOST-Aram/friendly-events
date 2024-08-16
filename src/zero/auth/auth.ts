import { NextFunction, Response, Request, Application } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import mongoose from "mongoose"
import passport, { DoneCallback } from "passport"
import {ExtractJwt, Strategy, } from 'passport-jwt'
import { TokenPayload } from './types'


export class Authenticator{
   

    public configureStrategy = (secretOrKey: string, authDbConnection: mongoose.Connection) =>{
        passport.use( new Strategy(
            {
                secretOrKey: secretOrKey,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            }, async(jwt_payload: JwtPayload, done: DoneCallback) =>{
                try {

                    const user = await authDbConnection.db.collection('users')
                    .findOne({ email: jwt_payload.email})

                    if(!user){
                        return done(null, false)
                    } else {
                        return done(null, user)
                    }
                } catch (error) {
                    return done(error, false)   
                } finally{
                    mongoose.connection.close()
                }
            }
        ))
        
    }

    public initialize = (app:Application) =>{
        app.use(passport.initialize())
    }

    public authenticate = ( ) =>{
        return passport.authenticate('jwt',{ session: false})
    }

    public restrictAccess = (allowthisUserGroup: (user:any) => boolean ) =>{

        return (req: Request, res: Response, next: NextFunction) =>{
            const user:any = req.user

            if(allowthisUserGroup(user)){
                next()
            } else {
                this.respondWithForbidden(res)
            }
        }
    }

    private respondWithForbidden = (res: Response) =>{
        res.status(403).json( 'Forbidden. Access denied')
    }

    public createTokenPayload = (user: any): TokenPayload =>{
        return {
            email: user.email,
            fullName: user.fullName,
            userGroup: user.userGroup,
            id: user._id ? user._id.toString() : user.id,
        }
    }
}


const authenticator = new Authenticator()

export default authenticator