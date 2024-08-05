import { Controller } from "../controller/controller";
import { validator, validationChains } from "./input-validation";
import { Authenticator } from "../../../zero/auth/auth";
import { permission } from "../../../utils/permissions";
import { GhostRouter } from "../../../zero/routing";
import { searchablePaths } from "../data-access/model";
import { domainData } from "../domain/data";
import { userGroup } from "../../../utils/user-group/user-group";

export class VenuesTypesRouter extends GhostRouter{
    
    constructor(controller: Controller, authenticator: Authenticator){
        super(controller, authenticator)
    }

    public registerRoutes = () =>{
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
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.addNew(domainData)
        )
    }

    private get = () =>{
        this.router.get('/', this.controller.getMany(searchablePaths) )
        this.router.get('/:id', 
            validator.validateReferenceId('id', { required: true }),
            validator.handleValidationErrors,
            this.controller.getOne 
        )
    }

    private put = () =>{
        this.router.put('/', this.controller.respondWithMethodNotAllowed)
        this.router.put('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            validator.validateReferenceId('id', { required: true }),
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.updateOne(domainData, userGroup)
        )
    }

    private patch = () =>{
        this.router.patch('/', this.controller.respondWithMethodNotAllowed)
        this.router.patch('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            validator.validateReferenceId('id', { required: true }),
            validationChains.validatePatchData,
            validator.handleValidationErrors,
            this.controller.modifyOne(domainData, userGroup)
        )
    }

    private delete = () =>{
        this.router.delete('/', this.controller.respondWithMethodNotAllowed)
        this.router.delete('/:id',
            this.authenticator.authenticate(),
            validator.validateReferenceId('id', { required: true }),
            validator.handleValidationErrors,
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            this.controller.deleteOne(userGroup)
        )
    }
}