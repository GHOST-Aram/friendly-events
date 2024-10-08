import { Validator } from "../../../zero/validation";
import { body } from "express-validator";

class AuthValidator extends Validator{
    public validateEmail = (field: string) =>{
        return body(field).trim().notEmpty().withMessage('Email is required')
            .escape()
    }

    public validatePassword = (field: string) =>{
        return body(field).notEmpty().withMessage('Password is required')
            .isLength({ min: 8, max: 100 }).withMessage(
                'Password must be a string of 8 - 100 chars long')
    }
}

export const validator = new AuthValidator()
const acceptedPaths = ['email', 'password']

export const validateLoginInput = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateEmail('email'),
    validator.validatePassword('password')
]