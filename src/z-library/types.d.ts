export interface AuthData{
    fullName: string,
    email: string,
    username?: string,
    id: string,
    userGroup: string
}

export type userDataAggregator = (user: any) => AuthData