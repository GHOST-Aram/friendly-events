import { UsersController } from "../controller/controller";
import { Router } from "express";
import { validator, userValidators, patchValidators} from "./input-validation";
import { Authenticatable, Authenticator } from "../../../z-library/auth/auth";
import { uploadSingleFile } from "../../../z-library/uploads/upload";

const router = Router()

export const routesWrapper = (
    controller: UsersController, authenticator: Authenticator | Authenticatable ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        uploadSingleFile('profilePicture'),
        validator.validateFile,
        userValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        controller.getMany
    )
    router.get('/:id',
        authenticator.authenticate(), 
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        authenticator.authenticate(),
        validator.validateReferenceId('id', { required: true }),
        userValidators, 
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        authenticator.authenticate(),
        validator.validateReferenceId('id', { required: true }),
        patchValidators, 
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        validator.validateReferenceId('id', { required: true }),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}