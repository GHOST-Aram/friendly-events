import { UsersController } from "../controller/controller";
import { validator, validationChains} from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { fileUploader } from "../../../z-library/uploads/upload";
import { permission } from "../../../utils/permissions";
import { domainData } from "../domain/data";
import { GhostRouter } from "../../../z-library/routing/router";
import { Router } from "express";


export class UsersRouter extends GhostRouter{
    constructor(controller: UsersController, authenticator: Authenticator){
        super(controller, authenticator)
    }

    public authenticateAndControlRoutes = () =>{
    
        this.router.post('/:id', this.controller.respondWithMethodNotAllowed)
        this.router.post('/', 
            fileUploader.uploadSingleFile('profilePicture'),
            validator.validateFile,
            validationChains.validatePostData ,
            validator.handleValidationErrors,
            this.controller.addNew
        )
        
        this.router.get('/', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowAdmin),
            this.controller.getMany
        )
        
        this.router.get('/:id',
            this.authenticator.authenticate(), 
            validator.handleValidationErrors,
            this.controller.getOne
        )
        
        this.router.put('/', this.controller.respondWithMethodNotAllowed)
        this.router.put('/:id', 
            this.authenticator.authenticate(),
            domainData.allowDocumentOwner,
            fileUploader.uploadSingleFile('profilePicture'),
            validator.validateFile,
            validationChains.validatePostData, 
            validator.handleValidationErrors,
            this.controller.updateOne
        )
        
        this.router.patch('/', this.controller.respondWithMethodNotAllowed)
        this.router.patch('/:id', 
            this.authenticator.authenticate(),
            domainData.allowDocumentOwner,
            fileUploader.uploadSingleFile('profilePicture'),
            validator.validateFile,
            validationChains.validatePatchData, 
            validator.handleValidationErrors,
            this.controller.modifyOne
        )
    
        this.router.delete('/', this.controller.respondWithMethodNotAllowed)
        this.router.delete('/:id', this.controller.respondWithMethodNotAllowed)
    
        return this.router
    }
}

const router = Router()

export const authenticateAndControlRoutes = (controller: UsersController, authenticator: Authenticator ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        fileUploader.uploadSingleFile('profilePicture'),
        validator.validateFile,
        validationChains.validatePostData ,
        validator.handleValidationErrors,
        controller.addNew
    )
    
    router.get('/', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowAdmin),
        controller.getMany
    )
    
    router.get('/:id',
        authenticator.authenticate(), 
        validator.handleValidationErrors,
        controller.getOne
    )
    
    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        authenticator.authenticate(),
        domainData.allowDocumentOwner,
        fileUploader.uploadSingleFile('profilePicture'),
        validator.validateFile,
        validationChains.validatePostData, 
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        authenticator.authenticate(),
        domainData.allowDocumentOwner,
        fileUploader.uploadSingleFile('profilePicture'),
        validator.validateFile,
        validationChains.validatePatchData, 
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', controller.respondWithMethodNotAllowed)

    return router
}