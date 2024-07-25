import { body, ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";

class VenuesValidator extends Validator{

    public validateDescription = (path: string) =>{
        return body(path).trim().escape().isString().isLength({ min: 100, max: 1000 })
            .withMessage("Description can only be 100 to 1000 characters long.")
            .notEmpty().withMessage("Venue description is required.")
    }
}

const validator = new VenuesValidator()

const validatePostData: ValidationChain[] = [
    validator.validateName('type', { required: true }),
    validator.validateName('name', { required: true }),
    validator.validateNumber('capacity', { required: true }),
    validator.validateName('address.cityOrTown', { required: true }),
    validator.validateName('address.street', { required: false }),
    validator.validateName('address.block.name', { required: false }),
    validator.validateNumber('address.block.floor', { required: false }),
    validator.validateDescription('description'),
    validator.validateBooleanField('accessibilityFeatures.stairCase', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.elevator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.escallator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.ramp', { required: false }),
    validator.validateNumber('coordinates.latitude', { required: true }),
    validator.validateNumber('coordinates.longitude', { required: true }),
]
const validatePatchData: ValidationChain[] = [
    validator.validateName('type', { required: false }),
    validator.validateName('name', { required: false }),
    validator.validateNumber('capacity', { required: false }),
    validator.validateName('address.cityOrTown', { required: false }),
    validator.validateName('address.street', { required: false }),
    validator.validateName('address.block.name', { required: false }),
    validator.validateNumber('address.block.floor', { required: false }),
    validator.validateDescription('description'),
    validator.validateBooleanField('accessibilityFeatures.stairCase', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.elevator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.escallator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.ramp', { required: false }),
    validator.validateNumber('coordinates.latitude', { required: false }),
    validator.validateNumber('coordinates.longitude', { required: false }),
]

export const validationChains = { validatePostData, validatePatchData }
export { validator }
