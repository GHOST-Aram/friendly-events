export interface ZeroUser{
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