import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";

class VenuesValidator extends Validator{
    public validateDescription = (field: string, { required }: { required: boolean }) =>{
        return validator.validateString(field, { required }).isLength({ min: 100, max: 1000})
            .withMessage(
                `Category description should be a string of length 100 - 1000 characters long.`)
    }
}

const validator = new VenuesValidator()

const validatePostData: ValidationChain[] = [
    validator.validateName('name', { required: true }),
    validator.validateDescription('description', { required:true })
]
const validatePatchData: ValidationChain[] = [
    validator.validateName('name', { required: false }),
    validator.validateDescription('description', { required:false })
]

export const validationChains = { validatePostData, validatePatchData }
export { validator }
