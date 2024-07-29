import { Controller } from "../controller/controller";
import { validator, validationChains } from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { permission } from "../../../utils/permissions";
import { GhostRouter } from "../../../z-library/routing/router";

export class VenuesTypesRouter extends GhostRouter{
    
    constructor(controller: Controller, authenticator: Authenticator){
        super(controller, authenticator)
    }

    public authenticateAndControlRoutes = () =>{

        this.router.post('/:id', this.controller.respondWithMethodNotAllowed)
        this.router.post('/', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.addNew
        )
        
        this.router.get('/', this.controller.getMany )
        
        this.router.get('/:id', this.controller.getOne )
    
        this.router.get('/creators/:creatorId', this.controller.getByCreator )
        
        this.router.put('/', this.controller.respondWithMethodNotAllowed)
        this.router.put('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            validationChains.validatePostData,
            validator.handleValidationErrors,
            this.controller.updateOne
        )
        
        this.router.patch('/', this.controller.respondWithMethodNotAllowed)
        this.router.patch('/:id', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            validationChains.validatePatchData,
            validator.handleValidationErrors,
            this.controller.modifyOne
        )
    
        this.router.delete('/', this.controller.respondWithMethodNotAllowed)
        this.router.delete('/:id',
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowHostOrAdmin),
            this.controller.deleteOne
        )

        return this.router
    }
}