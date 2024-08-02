import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction,
    Router 
} from "express"
import { GenericController } from "./bases/generic-controller"
import { Authenticator } from "./auth/auth"

    
interface Controller extends GenericController<GenericDataAccess<Model<any>, any>>{}
interface DataAccess extends GenericDataAccess<Model<any>, any>{}

interface NextFunction extends ExpressNextFunction{}
interface Request extends ExpressRequest{}
interface Response extends ExpressResponse{}

interface ZRouter extends Router{}