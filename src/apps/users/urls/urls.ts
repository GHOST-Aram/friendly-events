import { UsersController } from "../controller/controller";
import { Router } from "express";
import { validator, userValidators, patchValidators} from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { uploadSingleFile } from "../../../z-library/uploads/upload";
import { permission } from "../../../utils/permissions";

const router = Router()

export const routesWrapper = (
    controller: UsersController, authenticator: Authenticator ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        userValidators ,
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
        userValidators, 
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        uploadSingleFile('profilePicture'),
        validator.validateFile,
        authenticator.authenticate(),
        patchValidators, 
        validator.handleValidationErrors,
        controller.respondWithMethodNotAllowed
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        authenticator.authenticate(),
        authenticator.restrictAccess(permission.allowAdmin),
        validator.handleValidationErrors,
        controller.respondWithMethodNotAllowed
    )

    return router
}