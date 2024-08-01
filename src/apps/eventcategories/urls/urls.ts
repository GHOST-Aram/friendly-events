import { Controller } from "../controller/controller";
import { validator, validationChains } from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { permission } from "../../../utils/permissions";
import { fileUploader } from "../../../z-library/uploads";
import { GhostRouter } from "../../../z-library/routing";

export class CategoryRouter extends GhostRouter{
    
    constructor(controller: Controller, authenticator: Authenticator){
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
            this.authenticator.restrictAccess(permission.allowOrganizerOrAdmin),
            fileUploader.uploadSingleFile('graphic'),
            validator.validateFile,
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.addNew
        )
    }

    private get = () =>{
        this.router.get('/', this.controller.getMany )
        this.router.get('/:id', 
            validator.validateReferenceId('id', { required: true }),
            validator.handleValidationErrors,
            this.controller.getOne )

        this.router.get('/creators/:creatorId', 
            validator.validateReferenceId('creatorId', { required: true }),
            validator.handleValidationErrors,
            this.controller.getByCreator
        )
    }

    private put = () =>{
        this.router.put('/', this.controller.respondWithMethodNotAllowed)
        this.router.put('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowOrganizerOrAdmin),
            fileUploader.uploadSingleFile('graphic'),
            validator.validateFile,
            validator.validateReferenceId('id', { required: true }),
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.updateOne
        )
    }

    private patch = () =>{
        this.router.patch('/', this.controller.respondWithMethodNotAllowed)
        this.router.patch('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowOrganizerOrAdmin),
            fileUploader.uploadSingleFile('graphic'),
            validator.validateFile,
            validator.validateReferenceId('id', { required: true }),
            validationChains.validatePatchData,
            validator.handleValidationErrors,
            this.controller.modifyOne
        )
    }

    private delete = () =>{
        this.router.delete('/', this.controller.respondWithMethodNotAllowed)
        this.router.delete('/:id',
            this.authenticator.authenticate(),
            validator.validateReferenceId('id', { required: true }),
            validator.handleValidationErrors,
            this.authenticator.restrictAccess(permission.allowOrganizerOrAdmin),
            this.controller.deleteOne
        )
    }
}