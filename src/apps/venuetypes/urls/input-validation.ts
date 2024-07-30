import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation";

class VTValidator extends Validator{}

const validator = new VTValidator()
const acceptedPaths: string[] = [ 'name', 'description' ]

const validatePostData: ValidationChain[] = [
    validator.rejectEmptyDataObject(),
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateName('name', { required: true }),
    validator.validateDescription('description', { required: true })
]
const validatePatchData: ValidationChain[] = [
    validator.rejectEmptyDataObject(),
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateName('name', { required: false }),
    validator.validateDescription('description', { required: false })
]

export const validationChains = { validatePostData, validatePatchData }
export { validator }
