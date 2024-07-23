import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";
import { NextFunction, Request, Response } from "express";

class UserValidator extends Validator{
    public validateUserGroup  = ( { required }: { required: boolean }): ValidationChain =>{
        return this.validateString('userGroup', { required })
            .custom((value: string) =>{
            return value === 'attendee' || value === 'organizer' || value === 'superuser'
        }).withMessage('User Group can only be  \'host\' or \'attendee\' or \'superuser\'')
    }

    public validateFile = (req: Request, res: Response, next: NextFunction) =>{
        const file = req.file
        if(file){
            const filetypes = /jpeg|jpg|png|jfif|avif/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(file.originalname.split('.').pop() as string);
        
            if (!mimetype || !extname || !file.buffer) {
              return res.status(400).json(
                { 
                    errors: ['Invalid file type. Only JPEG, PNG, JFIF and AVIF are allowed.'],
                    message: 'Inavalid input'
                });
            }
        } 

        next()
    }
}

const validator = new UserValidator()

export const userValidators = [
    validator.validateUserGroup({ required: true }),
    validator.validateName('fullName', { required: true}),
    validator.validateString('password', { required: true}),
    validator.validateString('email', { required: true}),
    validator.validateUrl('pictureUrl', {required: false })
]

export const patchValidators = [
    validator.validateUserGroup({ required:false }),
    validator.validateName('fullName', { required: false}),
    validator.validateString('email', { required: false}),
    validator.validateString('password', { required: false}),
    validator.validateUrl('pictureUrl', {required: false })

]

export {validator}