import { User } from '../../data-access/model'

export const validUserData: User = {
    fullName: 'John Doe',
    userGroup: 'organizer',
    email: 'johndoe@gmail.com',
    password: 'password',
}

export const userWithExistingEmail: User = {
    fullName: 'Existing User',
    userGroup: 'attendee',
    email: 'existingEmail@gmail.com',
    password: 'password',
}

export const invalidUserData = {
    name: 'John doe',
    email: 'johndoe@gmail',
    password: 44,
    userGroup: 'hello world',
}

export const validPartialData = {
    fullName: 'Doe',
    email: 'johndoe@gmail.com',
    userGroup: 'superuser',
    password: 'password'
}
