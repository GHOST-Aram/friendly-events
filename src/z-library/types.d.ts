import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction,
    Router 
} from "express"
import { GenericController } from "./bases/generic-controller"
import { Authenticator } from "./auth/auth"

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
    DataAccess: DataAccessConstructor<GenericDataAccess<Model<any>, any>>,
    Controller: ControllerConstructor<GenericController<Accessible>>, 
    GhostRouter: GhostRouterConstructor<GhostRouter>,
    authenticator: Authenticator,
    modelName: string,
    applicationName: string
}

type DataAccessConstructor<DataAccess> = new (model: Model<any>) => DataAccess
type ControllerConstructor<Controller> = new (
    dataAccess: GenericDataAccess<Model<any>, any>, microserViceName: string) => Controller

type GhostRouterConstructor<GhostRouter> = new(
        controller: GenericController<GenericDataAccess<Model<any>, any>>, 
        authenticator: Authenticator
    ) => GhostRouter

type routesAuthandController =  (controller: GenericController, authenticator: Authenticator)=> Router

interface AppRouter{
    router: Router
    controller: Controller
    authenticator: Authenticator
    authenticateAndControlRoutes: ()=> Router
}

interface Controller extends GenericController<GenericDataAccess<Model<any>, any>>{}

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

interface FileError { message: string, filename: string }

interface Paginator{
    skipDocs: number,
    limit: number
}
interface NextFunction extends ExpressNextFunction{}
interface Request extends ExpressRequest{}

interface RequestData{
    referenceId: string
    reqBody: any 
    user:any
    currentUserId: string
    file: Express.Multer.File
    files: Express.Multer.File[]
}

interface Response extends ExpressResponse{}

interface URLMetadata{
    path: string, 
    router: Router 
}

interface ZRouter extends Router{}

type userDataAggregator = (user: any) => AuthData