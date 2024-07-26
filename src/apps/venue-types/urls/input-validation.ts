import { ValidationChain } from "express-validator";
import { Validator } from "../../../z-library/validation/validator";

class VenuesValidator extends Validator{}

const validator = new VenuesValidator()

const validatePostData: ValidationChain[] = []
const validatePatchData: ValidationChain[] = []

export const validationChains = { validatePostData, validatePatchData }
export { validator }
