import { Validator } from "../../../z-library/validation/validator";

export const validator = new Validator()

export const postValidators = [
    validator.validateString('category', { required: true }),
    validator.validateString('venue', { required: true }),
    validator.validateString('title', { required: true }),
    validator.validateString('city', { required: true }),
    validator.validateString('dateAndTime', { required: true }),
    validator.validateString('duration', { required: true }),
    validator.validateNumber('availableTickets', { required: true }),
    validator.validateNumber('ticketPrice', { required: true }),
    validator.validateNumber('ageLimit.min', { required: true }),
    validator.validateNumber('ageLimit.max', { required: true }),
]
export const patchValidators = [
    validator.validateString('category', { required: false }),
    validator.validateString('venue', { required: false }),
    validator.validateString('title', { required: false }),
    validator.validateString('city', { required: false }),
    validator.validateString('dateAndTime', { required: false }),
    validator.validateString('duration', { required: false }),
    validator.validateNumber('availableTickets', { required: false }),
    validator.validateNumber('ticketPrice', { required: false }),
    validator.validateNumber('ageLimit.min', { required: false }),
    validator.validateNumber('ageLimit.max', { required: false }),
]

