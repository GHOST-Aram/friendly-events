import Router from 'express'
import { AuthController } from '../controller/controller'
import { validateLoginInput } from './input-validators'
import { validator } from '../../../z-library/validation/validator'
import { ZRouter } from '../../../z-library/types'

const router = Router()

export class AuthRouter{
    private router: ZRouter
    private controller: AuthController

    constructor(controller: AuthController){
        this.router = Router()
        this.controller = controller
    }

    public controlRoutes = () =>{
        this.router.post('/:id', this.controller.respondWithMethodNotAllowed)
        this.router.post('/', 
            validateLoginInput,
            validator.handleValidationErrors,
            this.controller.signIn
        )
        
        return this.router
    }
}