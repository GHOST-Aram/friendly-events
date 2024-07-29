import { EventsController } from "../controller/controller";
import { Router } from "express";
import { validator, validationChains } from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { permission } from "../../../utils/permissions";
import { fileUploader } from "../../../z-library/uploads/upload";
import { GhostRouter } from "../../../z-library/routing/router";

export class EventsRouter extends GhostRouter{
    
    constructor(controller: EventsController, authenticator: Authenticator){
        super(controller, authenticator)
    }

    public authenticateAndControlRoutes = () =>{

        this.router.post('/:id', this.controller.respondWithMethodNotAllowed)
        this.router.post('/', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowEventOrganizer),
            fileUploader.uploadSingleFile('graphic'),
            validator.validateFile,
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.addNew
        )
        
        this.router.get('/', this.controller.getMany )

        this.router.get('/creators/:creatorId', this.controller.getByCreator)
        
        this.router.get('/:id', this.controller.getOne )
        
        this.router.put('/', this.controller.respondWithMethodNotAllowed)
        this.router.put('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowEventOrganizer),
            fileUploader.uploadSingleFile('graphic'),
            validator.validateFile,
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.updateOne
        )
        
        this.router.patch('/', this.controller.respondWithMethodNotAllowed)
        this.router.patch('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowEventOrganizer),
            fileUploader.uploadSingleFile('graphic'),
            validator.validateFile,
            validationChains.validatePatchData,
            validator.handleValidationErrors,
            this.controller.modifyOne
        )

        this.router.delete('/', this.controller.respondWithMethodNotAllowed)
        this.router.delete('/:id',
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowEventOrganizer),
            this.controller.deleteOne
        )

        return this.router
    }
}

const router = Router()

export const authenticateAndControlRoutes = (
    controller: EventsController, authenticator: Authenticator ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        fileUploader.uploadSingleFile('graphic'),
        validator.validateFile,
        validationChains.validatePostData,
        validator.handleValidationErrors,
        controller.addNew
    )
    
    router.get('/', controller.getMany )

    router.get('/creators/:creatorId', controller.getByCreator)
    
    router.get('/:id', controller.getOne )
    
    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        fileUploader.uploadSingleFile('graphic'),
        validator.validateFile,
        validationChains.validatePostData,
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowEventOrganizer),
        fileUploader.uploadSingleFile('graphic'),
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