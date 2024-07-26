import { Controller } from "../controller/controller";
import { Router } from "express";
import { validator, validationChains } from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { permission } from "../../../utils/permissions";
import { fileUploader } from "../../../z-library/uploads/upload";

const router = Router()

export const routesWrapper = (
    controller: Controller, authenticator: Authenticator ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowOrganizerOrAdmin),
        fileUploader.uploadSingleFile('picture'),
        validator.validateFile,
        validationChains.validatePostData,
        validator.handleValidationErrors,
        controller.addNew
    )
    
    router.get('/', controller.getMany )
    
    router.get('/:id', controller.getOne )
    
    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowAdmin),
        fileUploader.uploadSingleFile('picture'),
        validator.validateFile,
        validationChains.validatePostData,
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        fileUploader.uploadSingleFile('picture'),
        validator.validateFile,
        validationChains.validatePatchData,
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