import { GenericController } from "../bases/generic-controller"
import { Authenticator } from "../auth/auth"
import { GhostRouter } from "../routing"
import { Controller, DataAccess } from "../types"

export interface URLMetadata{
    path: string, 
    router: Router 
}


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

    
    // interface Controller extends GenericController<GenericDataAccess<Model<any>, any>>{}
    // interface DataAccess extends GenericDataAccess<Model<any>, any>{}
