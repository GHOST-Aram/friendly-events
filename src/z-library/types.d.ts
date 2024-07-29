import { Request, Response, NextFunction } from "express"

interface Accessible{
    createNew:(data: any) => Promise<HydratedDocument<any>>
    findByReferenceId:(refId: string) => Promise<HydratedDocument<any> | null>
    findWithPagination: (paginator: Paginator) => Promise<HydratedDocument<any>[]>
    findByIdAndUpdate: (id: string, updateDoc: HydratedDocument<any>
        ) => Promise<HydratedDocument<any> | null>

    findByIdAndDelete: (id: string) => Promise<HydratedDocument<any> | null>
    findByCreatorId: (creatorId: string, paginator:Paginator) => 
            Promise<HydratedDocument<any>[]>
}

interface AppConfig{
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

interface AuthData{
    fullName: string,
    email: string,
    username?: string,
    id: string,
    userGroup: string
}

interface Controllable{
    addNew: (req: Request, res: Response, next: NextFunction) => Promise<void> 
    getOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getMany: (req: Request, res: Response, next: NextFunction) => Promise<void>
    updateOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
    modifyOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
    deleteOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

interface DomainData{
    aggregateInputDocument :(reqData: RequestData) => Object
}

interface Paginator{
    skipDocs: number,
    limit: number
}

interface RequestData{
    referenceId: string
    reqBody: any 
    user:any
    currentUserId: string
    file: Express.Multer.File
    files: Express.Multer.File[]
}

type userDataAggregator = (user: any) => AuthData