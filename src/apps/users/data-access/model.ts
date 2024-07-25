import { compare, hash } from "bcrypt"
import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface User{
    profilePicture?: {
        name: string,
        data: Buffer,
        contentType: string
    }
    pictureUrl?: string
    fullName: string
    userGroup: string
    email: string
    password: string
}

interface UserMethods{
    isValidPassword:(password: string) => Promise<boolean>
}

interface UserVirtuals{
    isAdmin: boolean
}


export type UserModel = Model<User,{}, UserMethods, UserVirtuals>

export const userSchema = new Schema<User, UserModel, UserMethods, {}, UserVirtuals>({
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
    pictureUrl: { type: String },
    userGroup:{
        type: String,
        enum: ['host', 'organizer', 'attendee', 'superuser'],
        default: 'attendee'
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
        maxlength: 100,
        required: true
    },
})


userSchema.method('isValidPassword', 
    async function(password: string): Promise<boolean>{
        return await compare(password, this.password)
})

userSchema.virtual('isAdmin').get(function(){
    return this.userGroup === 'superuser'
})

userSchema.pre('save', async function(){
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
})

export type HydratedUserDoc = HydratedDocument<User, UserMethods & UserVirtuals>

export const User: UserModel = model<User, UserModel>('User', userSchema)