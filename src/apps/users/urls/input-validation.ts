import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";

class UserValidator extends Validator{
    public validateUserGroup  = ( path: string, { required }: { required: boolean }): ValidationChain =>{
        return this.validateString(path, { required })
            .custom((value: string) =>{
            return value === 'attendee' || value === 'organizer' || value === 'superuser'
        }).withMessage('User Group can only be  \'host\' or \'attendee\' or \'superuser\'')
    }
}

const validator = new UserValidator()

export const userValidators = [
    validator.validateUserGroup('userGroup',{ required: true }),
    validator.validateName('fullName', { required: true}),
    validator.validateString('password', { required: true}),
    validator.validateString('email', { required: true}),
    validator.validateUrl('pictureUrl', {required: false })
]

export const patchValidators = [
    validator.validateUserGroup('userGroup',{ required:false }),
    validator.validateName('fullName', { required: false}),
    validator.validateString('email', { required: false}),
    validator.validateString('password', { required: false}),
    validator.validateUrl('pictureUrl', {required: false })

]

export { validator }