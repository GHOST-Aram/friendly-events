import { Validator } from "../../../zero/validation";

class EventsValidator extends Validator{
    public validateDate = (path: string, { required }: {required: boolean }) =>{
        return this.validateString(path, { required })
            .matches(/^[0-9]{1,2}\s[a-z]+\s[0-9]{4}$/i)
            .withMessage(
                "Date String must be in the form \'day MonthName year\' eg \'4 January 2027\'")
    }

    public validateTime = (path: string, { required }: {required: boolean }) =>{
        return this.validateString(path, { required })
            .matches(/^[0-9]{4}$/)
            .withMessage('Time String must be in 24-hr clock format')
    }

    public validateTimeZone = (path: string, { required }: { required: boolean }) =>{
        return this.validateString(path, { required })
        .matches(/^GMT[\+|\-][0-9]{2}\:[0-9]{2}$/)
            .withMessage(
                'Time Zone must be in the form \'GMT+hrs:mins\' or \'GMT-hrs:mins\' '+
                'eg GMT+03:00')
    }

    public validateDuration = (path: string, { required }: { required: boolean }) =>{
        return this.validateString(path, { required })
            .matches(/^[0-9]{1,2}\sdays|hours|minutes$/i)
            .withMessage('Duration must be in the for \'X days or X hours or X minutes\'')
    }
}

const validator = new EventsValidator()
const acceptedPaths = [
    'category', 'venue', 'title', 'city', 'date', 'time', 'time.end', 'time.zone',
    'time.start', 'duration', 'availableTickets', 'ticketPrice', 'ageLimit', 
    'ageLimit.min', 'ageLimit.max'
]

const validatePostData = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateString('category', { required: true }),
    validator.validateString('venue', { required: true }),
    validator.validateString('title', { required: true }),
    validator.validateString('city', { required: true }),
    validator.validateDate('date', { required: true }),
    validator.validateTime('time.start', {required: true }),
    validator.validateTime('time.end', {required: true }),
    validator.validateTimeZone('time.zone', {required: true }),
    validator.validateDuration('duration', { required: true }),
    validator.validateNumber('availableTickets', { required: true }),
    validator.validateNumber('ticketPrice', { required: true }),
    validator.validateNumber('ageLimit.min', { required: true }),
    validator.validateNumber('ageLimit.max', { required: true }),
]
const validatePatchData = [
    validator.rejectUnwantedPaths(acceptedPaths),
    validator.validateString('category', { required: false }),
    validator.validateString('venue', { required: false }),
    validator.validateString('title', { required: false }),
    validator.validateString('city', { required: false }),
    validator.validateDate('date', { required: false }),
    validator.validateTime('time.start', {required: false }),
    validator.validateTime('time.end', {required: false }),
    validator.validateTimeZone('time.zone', { required: false }),
    validator.validateDuration('duration',{ required: false }),
    validator.validateNumber('availableTickets', { required: false }),
    validator.validateNumber('ticketPrice', { required: false }),
    validator.validateNumber('ageLimit.min', { required: false }),
    validator.validateNumber('ageLimit.max', { required: false }),
]

export const validationChains = { validatePostData, validatePatchData }
export { validator }
