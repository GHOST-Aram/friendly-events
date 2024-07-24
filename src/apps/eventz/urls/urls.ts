import { EventsController } from "../controller/controller";
import { Router } from "express";
import { validator, postValidators, patchValidators } from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { permission } from "../../../utils/permissions";
import { uploadSingleFile } from "../../../z-library/uploads/upload";

const router = Router()

export const routesWrapper = (
    controller: EventsController, authenticator: Authenticator ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        uploadSingleFile('graphic'),
        validator.validateFile,
        postValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )
    
    router.get('/', controller.getMany )

    router.get('/organizers/:organizerId', controller.getByOrganizer)
    
    router.get('/:id', controller.getOne )
    
    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        uploadSingleFile('graphic'),
        validator.validateFile,
        patchValidators,
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        uploadSingleFile('graphic'),
        validator.validateFile,
        patchValidators,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id',
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        controller.deleteOne
    )

    return router
}