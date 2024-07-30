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

        this.post()
        this.get()
        this.put()
        this.patch()
        this.delete()
        
        return this.router
    }
    
    private post = () =>{
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
    }
    
    private get = () =>{
        this.router.get('/', this.controller.getMany )  
        this.router.get('/creators/:creatorId', this.controller.getByCreator)
        this.router.get('/:id', this.controller.getOne )
    }

    private put = () =>{
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
        
    }
    
    private patch = () =>{
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
        
    }
    
    private delete = () =>{
        this.router.delete('/', this.controller.respondWithMethodNotAllowed)
        this.router.delete('/:id',
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowEventOrganizer),
            this.controller.deleteOne
        )   
    }
}