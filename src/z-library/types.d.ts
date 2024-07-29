export interface AppConfig{
    connectionPool: ConnectionPool 
    dBName: string, 
    dataSchema: Schema<any>,
    DataAccessConstructor: any,
    ControllerConstructor: any, 
    routesWrapper: (controller: any, authenticator: Authenticator)=> Router,
    authenticator: Authenticator,
    modelName: string,
    applicationName: string
}

export interface AuthData{
    fullName: string,
    email: string,
    username?: string,
    id: string,
    userGroup: string
}

export type userDataAggregator = (user: any) => AuthData