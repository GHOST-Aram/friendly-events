import { AuthController } from '../controller/controller'
import { validateLoginInput, validator } from './input-validators'
import { ZRouter } from '../../../zero/types'
import Router  from 'express'


export class AuthRouter{
    private router: ZRouter
    private controller: AuthController

    constructor(controller: AuthController){
        this.router = Router()
        this.controller = controller
    }

    public registerRoutes = () =>{
        this.router.post('/:id', this.controller.respondWithMethodNotAllowed)
        this.router.post('/', 
            validateLoginInput,
            validator.handleValidationErrors,
            this.controller.signIn
        )
        
        return this.router
    }
}