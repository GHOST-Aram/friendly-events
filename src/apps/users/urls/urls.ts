import { UsersController } from "../controller/controller";
import { validator, validationChains} from "./input-validation";
import { Authenticator } from "../../../z-library/auth/auth";
import { fileUploader } from "../../../z-library/uploads";
import { permission } from "../../../utils/permissions";
import { domainData } from "../domain/data";
import { GhostRouter } from "../../../z-library/routing";
import { searchablePaths } from "../data-access/model";
import { userGroup } from "../../../utils/user-group/user-group";


export class UsersRouter extends GhostRouter{

    constructor(controller: UsersController, authenticator: Authenticator){
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
            fileUploader.uploadSingleFile('profilePicture'),
            validator.validateFile,
            validationChains.validatePostData ,
            validator.handleValidationErrors,
            this.controller.addNew(domainData)
        )
    }

    private get = () =>{
        this.router.get('/', 
            this.authenticator.authenticate(),
            this.authenticator.restrictAccess(permission.allowAdmin),
            this.controller.getMany(searchablePaths)
        )
        
        this.router.get('/:id',
            this.authenticator.authenticate(), 
            validator.validateReferenceId('id', { required: true }),
            validator.handleValidationErrors,
            this.controller.getOne
        )
    }

    private put = () =>{
        this.router.put('/', this.controller.respondWithMethodNotAllowed)
        this.router.put('/:id', 
            this.authenticator.authenticate(),
            fileUploader.uploadSingleFile('profilePicture'),
            validator.validateFile,
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
            fileUploader.uploadSingleFile('profilePicture'),
            validator.validateFile,
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
            this.controller.deleteOne(userGroup)
        )
    }
}