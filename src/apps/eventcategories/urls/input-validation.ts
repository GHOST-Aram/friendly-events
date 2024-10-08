import { ValidationChain } from "express-validator";
import { Validator } from "../../../zero/validation";

class VenuesValidator extends Validator{}

const validator = new VenuesValidator()
const acceptedPaths = ['name', 'description']

const validatePostData: ValidationChain[] = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateName('name', { required: true }),
    validator.validateDescription('description', { required:true })
]
const validatePatchData: ValidationChain[] = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateName('name', { required: false }),
    validator.validateDescription('description', { required:false })
]

export const validationChains = { validatePostData, validatePatchData }
export { validator }
