import { compare, hash } from "bcrypt"
import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface User{
    profilePicture?: Buffer
    fullName: string
    userGroup: string
    email: string
    password: string
}

interface UserMethods{
    isValidPassword:(password: string) => Promise<boolean>
}


export type UserModel = Model<User,{}, UserMethods>

export const userSchema = new Schema<User, UserModel, UserMethods,{}>({
    fullName: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true
    },
    profilePicture:{
        data: Buffer,
        name: String,
        contentType: String
    },
    userGroup:{
        type: String,
        enum: ['host', 'attendee', 'superuser'],
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 24,
        required: true
    },
})


userSchema.method('isValidPassword', 
    async function(password: string): Promise<boolean>{
        return await compare(password, this.password)
})

userSchema.pre('save', async function(){
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
})

export type HydratedUserDoc = HydratedDocument<User, UserMethods >

export const User: UserModel = model<User, UserModel>(
    'User', userSchema)