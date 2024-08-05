import { body, ValidationChain } from "express-validator";
import { Validator } from "../../../zero/validation";

class VenuesValidator extends Validator{

    public validateDescription = (path: string, { required }: {required: boolean }) =>{
        return this.validateString(path, { required }).isLength({ min: 100, max: 1000 })
            .withMessage("Description can only be 100 to 1000 characters long.")
    }

    public validateBookingTimeSpan = (path: string, { required }:{required: boolean}) =>{
        return this.validateString(path, { required }).custom((value) =>{
            return /^(hour|day|week|month)$/.test(value)
        }).withMessage(
            "Booking timespan parameters can only be \'hour\', \'day\', \'week\' or \'month\'")
    }

    public validateAvailabilityStatus = (path: string, { required }:{required: boolean}) =>{
        return this.validateString(path, { required }).custom((value) =>{
            return /^(available|booked|inactive)$/.test(value)
        }).withMessage(
            "Availability status can only be \'available\', \'booked\', or \'inactive\'")
    }
}
const acceptedPaths = [
    'type', 'name', 'capacity','address', 'address.cityOrTown', 'address.street',
    'address.block.name', 'address.block.floor', 'description', 'accessibilityFeatures',
    'accessibilityFeatures.stairCase', 'accessibilityFeatures.elevator', 
    'accessibilityFeatures.ramp', 'accessibilityFeatures.escallator', 
    'coordinates', 'coordinates.longitude', 'coordinates.latitude', 'bookingTerms',
    `bookingTerms.fee`, `bookingTerms.timeSpan`, 'availabilityStatus'
]
const validator = new VenuesValidator()

const validatePostData: ValidationChain[] = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateName('type', { required: true }),
    validator.validateName('name', { required: true }),
    validator.validateNumber('capacity', { required: true }),
    validator.validateString('bookingTerms.fee', { required: true }),
    validator.validateBookingTimeSpan('bookingTerms.timeSpan', { required: true }),
    validator.validateAvailabilityStatus('availabilityStatus', { required: true }),
    validator.validateName('address.cityOrTown', { required: true }),
    validator.validateName('address.street', { required: false }),
    validator.validateName('address.block.name', { required: false }),
    validator.validateNumber('address.block.floor', { required: false }),
    validator.validateDescription('description', { required: true }),
    validator.validateBooleanField('accessibilityFeatures.stairCase', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.elevator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.escallator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.ramp', { required: false }),
    validator.validateNumber('coordinates.latitude', { required: true }),
    validator.validateNumber('coordinates.longitude', { required: true }),
]
const validatePatchData: ValidationChain[] = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateName('type', { required: false }),
    validator.validateName('name', { required: false }),
    validator.validateNumber('capacity', { required: false }),
    validator.validateBookingTimeSpan('bookingTerms.timeSpan', { required: false }),
    validator.validateAvailabilityStatus('availabilityStatus', { required: false }),
    validator.validateName('address.cityOrTown', { required: false }),
    validator.validateName('address.street', { required: false }),
    validator.validateName('address.block.name', { required: false }),
    validator.validateNumber('address.block.floor', { required: false }),
    validator.validateDescription('description', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.stairCase', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.elevator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.escallator', { required: false }),
    validator.validateBooleanField('accessibilityFeatures.ramp', { required: false }),
    validator.validateNumber('coordinates.latitude', { required: false }),
    validator.validateNumber('coordinates.longitude', { required: false }),
]

export const validationChains = { validatePostData, validatePatchData }
export { validator }
