import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation";

class UserValidator extends Validator{
    public validateUserGroup  = ( path: string, { required }: { required: boolean }): ValidationChain =>{
        return this.validateString(path, { required })
            .custom((value: string) =>{
            return /^(host|attendee|organizer|superuser)$/.test(value)
        }).withMessage(
            'User Group can only be  \'host\', \'attendee\', \'organizer\' \'superuser\'')
    }
}

const validator = new UserValidator()
const acceptedPaths = ['userGroup', 'fullName', 'password', 'email', 'pictureUrl']

const validatePostData = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateUserGroup('userGroup',{ required: true }),
    validator.validateName('fullName', { required: true}),
    validator.validateString('password', { required: true}),
    validator.validateString('email', { required: true}),
    validator.validateUrl('pictureUrl', {required: false })
]

const validatePatchData = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateUserGroup('userGroup',{ required:false }),
    validator.validateName('fullName', { required: false}),
    validator.validateString('email', { required: false}),
    validator.validateString('password', { required: false}),
    validator.validateUrl('pictureUrl', {required: false })

]

export const validationChains = { validatePostData, validatePatchData }
 
export { validator }