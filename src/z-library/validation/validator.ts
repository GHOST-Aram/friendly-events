import { 
    ValidationChain, body, param, query, validationResult 
} from "express-validator"
import { isValidObjectId } from "mongoose"
import { formatter } from "../formatting/formatter"
import { Request, Response, NextFunction } from "express"

interface ValidationOption{
    required?: boolean
}

export class Validator {

    private nameLengthValidationMsg = 'must be string btw 2 to 100 characters long'
    private numberValiditionMessage = 'must be numeric'
    private objectIdMessage = 'must be an hexadecimal of length 24'
    
    public validateObjectId = (fieldName: string, { required }: ValidationOption) =>{

        const validationChain = () =>  body(fieldName)
            .trim()
            .matches(/[a-fA-F0-9]{24}/)
            .withMessage(
                `${fieldName} ${this.objectIdMessage}`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${fieldName} is required`)
        } else {
            return validationChain().optional()
        }
    }

    public validateObjectIDArray = (fieldName: string, { required }: ValidationOption) =>{
        const validationChain = () => body(fieldName)
            .custom(this.validateIds)
            .withMessage(
                `${fieldName} ${this.objectIdMessage} array`
            )

        if(required){
            return validationChain().notEmpty()
                .withMessage(`${fieldName} is required`)

        } else{
            return validationChain().optional()
        }
    }

    private validateIds = (objectIds:string[]) =>{
        if(!Array.isArray(objectIds))
            return false

        return objectIds.every(id =>{
            return isValidObjectId(id)
        })
    }

    public validateReferenceId = (paramName: string, { required }: ValidationOption) =>{
        const validationChain = () => param(paramName)
            .trim()
            .matches(/^[a-fA-F0-9]{24}$/)
            .withMessage('Invalid reference Id')
            .withMessage(`${paramName} is required`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${paramName} is required.`)
        } else{
            return validationChain().optional()
        }
    }

    public validateName = (fieldName: string, { required }: ValidationOption) =>{
        const validationChain = () => body(fieldName)
            .trim()
            .isLength({ min: 2, max: 100})
            .withMessage(
                `${fieldName} ${this.nameLengthValidationMsg}`
            )
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(
                `${fieldName} is reuired`)
        } else{
            return validationChain().optional()
        }
    }

    public validateNumber = (fieldName: string, { required }: ValidationOption) =>{

        const validationChain = () => body(fieldName)
            .trim()
            .isNumeric()
            .withMessage(
            `${fieldName} ${this.numberValiditionMessage}`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(
                `${fieldName} is required`)

        } else{
            return validationChain().optional()
        }
    }

    public validateReferenceName = (paramName: string, { required }: ValidationOption) =>{
        const validationChain = () => param(paramName)
            .trim()
            .matches(/^[a-z0-9]{2,100}$/i)
            .withMessage(`${paramName} must be a 2-50 characters long`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${paramName} is required`)
        } else {
            return validationChain().optional()
        }
    }

    public validateNameField(fieldName: string, { required}: ValidationOption): ValidationChain{

        const formattedName = formatter.formatFieldName(fieldName)
        const validationChain = () => body(fieldName)
            .trim()
            .matches(/^.{2,100}$/)
            .withMessage(`${formattedName} must be a 2-50 characters long`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${formattedName} is required.`)
        } else {
            return validationChain().optional()
        }

    }

    public validateBooleanField = (field: string, { required }: ValidationOption) =>{

        const validationChain = () => body(field)
            .trim()
            .isBoolean()
            .withMessage(`${field} field must be boolean`)

        if(required){
            return validationChain().notEmpty().withMessage(`${field} is required.`)  
        } else{
            return validationChain().optional()
        }
    }

    public validateBooleanQuery = (field: string) =>{
        return query(field).isBoolean().trim().escape().optional()
    }

    public validateNumberQuery = (field: string) =>{
        return query(field).isNumeric().trim().escape().optional()
    }

    public validateStringQuery = (field: string) =>{
        return query(field).isString().trim().escape().optional()
    }

    public validateString(fieldName: string, { required }: ValidationOption){
        const validationChain = () => body(fieldName).trim()
            .isString().escape()
        
        if(required){
            return validationChain().notEmpty()
                .withMessage(`${fieldName} is required`)
        } else{
            return validationChain().optional()
        }
    }

    public validateUrl = (fieldName: string, { required}: ValidationOption) =>{
        const validationChain = () => body(fieldName).trim()
        .isString()
    
        if(required){
            return validationChain().notEmpty()
                .withMessage(`${fieldName} is required`)
        } else{
            return validationChain().optional()
        }
    }

    public validateFile = (req: Request, res: Response, next: NextFunction) =>{
        const file = req.file
        if(file){
            const result = this.testFileExtensions(file)
        
            if(result.length){
                return res.status(400).json(result);
            }
        } 

        next()
    }


    private testFileExtensions = (file: Express.Multer.File) =>{

        const result :FileError[] = []

        const filetypes = /jpeg|jpg|png|jfif|avif|svg/;

        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(file.originalname.split('.').pop() as string);
    
        if (!mimetype || !extname || !file.buffer) {
            result.push({
                message: 'Invalid file type. Only JPEG, PNG, JFIF and AVIF are allowed',
                filename: file.fieldname,
            })
        }

        return result
    }

    public validateFiles = (req: Request, res: Response, next: NextFunction) =>{
        const files = req.files as Express.Multer.File[]
        let results: FileError[] = []

        if(files && files?.length){
            files.forEach(file =>{
                const result = this.testFileExtensions(file)

                if(result.length){
                    results = [...results, ...result ]
                }
            })
        }

        if(results.length){
            return res.status(400).json(results);
        }

        next()
    }

    public rejectUnwantedPaths = (acceptedPaths: string[]) =>{
        
        return body().custom((value, { req }) =>{
            const keys = Object.keys(req.body)
            let hasStrayPaths = false

            keys.forEach(key => {
                if(!acceptedPaths.includes(key)){
                    hasStrayPaths = true
                }
            })

            return !hasStrayPaths

        }).withMessage(
            `Input has stray paths.
            Only the following paths can be included in user input: ${acceptedPaths.join(', ') }`
        )
    }
    
    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction 
        ) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({
                    message: 'Invalid input or referenceId',
                    errors: errors.array()
                })
            }  else {
                next()
            }
    }
}

interface FileError { message: string, filename: string }
export const validator = new Validator()

