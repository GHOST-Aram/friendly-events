export type tokenPayloadCreator = (user: any) => TokenPayload
export interface TokenPayload{
    fullName: string,
    email: string,
    username?: string,
    id: string,
    userGroup: string
}
