import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";

class UserValidator extends Validator{
    public validateRole  = ( { required }: { required: boolean }): ValidationChain =>{
        return this.validateString('role', { required })
            .custom((value: string) =>{
            return value === 'tenant' || value === 'landlord'
        }).withMessage('role must be either \'tenant\' or \'landlord\'')
    }
}

const validator = new UserValidator()

export const userValidators = [
    validator.validateRole({ required: true }),
    validator.validateName('fullName', { required: true}),
    validator.validateString('password', { required: true}),
    validator.validateString('email', { required: true}),
    validator.validateBooleanField('isAdmin', { required: false})
]

export const patchValidators = [
    validator.validateRole({ required:false }),
    validator.validateName('fullName', { required: false}),
    validator.validateString('email', { required: false}),
    validator.validateString('password', { required: false})
]

export {validator}