import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";

class UserValidator extends Validator{
    public validateUserGroup  = ( { required }: { required: boolean }): ValidationChain =>{
        return this.validateString('userGroup', { required })
            .custom((value: string) =>{
            return value === 'attendee' || value === 'host' || value === 'superuser'
        }).withMessage('User Group can only be  \'host\' or \'attendee\' or \'superuser\'')
    }
}

const validator = new UserValidator()

export const userValidators = [
    validator.validateUserGroup({ required: true }),
    validator.validateName('fullName', { required: true}),
    validator.validateString('password', { required: true}),
    validator.validateString('email', { required: true}),
]

export const patchValidators = [
    validator.validateUserGroup({ required:false }),
    validator.validateName('fullName', { required: false}),
    validator.validateString('email', { required: false}),
    validator.validateString('password', { required: false})
]

export {validator}