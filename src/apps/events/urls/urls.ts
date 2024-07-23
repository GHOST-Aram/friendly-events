import { EventsController } from "../controller/controller";
import { Router } from "express";
import { validator, postValidators } from "./input-validation";
import { Authenticatable, Authenticator } from "../../../z-library/auth/auth";

const router = Router()

export const routesWrapper = (
    controller: EventsController, authenticator: Authenticator | Authenticatable ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        postValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )
    
    router.get('/', controller.getMany )
    
    router.get('/:id', controller.getOne )
    
    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', controller.respondWithMethodNotAllowed)
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', controller.respondWithMethodNotAllowed)

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', controller.respondWithMethodNotAllowed)

    return router
}