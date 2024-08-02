import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction,
    Router 
} from "express"
import { GenericController } from "./bases/generic-controller"
import { Authenticator } from "./auth/auth"
import { GhostRouter } from "./routing"

interface AppConfig{
    connectionPool: ConnectionPool 
    dBName: string, 
    dataSchema: Schema<any>,
    DataAccess: DataAccessConstructor<DataAccess>,
    Controller: ControllerConstructor<Controller>, 
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

interface Controller extends GenericController<GenericDataAccess<Model<any>, any>>{}
interface DataAccess extends GenericDataAccess<Model<any>, any>{}

interface DomainData{
    aggregateInputDocument :(reqData: RequestData) => Object
}

interface FileError { message: string, filename: string }

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