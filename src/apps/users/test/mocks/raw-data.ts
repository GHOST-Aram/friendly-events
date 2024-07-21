import { User } from '../../data-access/model'

export const validUserData: User = {
    fullName: 'John Doe',
    userGroup: 'host',
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
    email: 'johndoe@gmail.com',
    password: 'password',
    userGroup: 'host',
}

export const validPartialData = {
    fullName: 'Doe',
    email: 'johndoe@gmail.com',
    userGroup: 'superuser',
    password: 'password'
}

export const invalidPartialData = {
    email: 'johndoe@gm',
    password: "ee",
    fullName: 90,
    userGroup: 'host',
}