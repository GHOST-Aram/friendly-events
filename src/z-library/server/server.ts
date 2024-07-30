import express, { Application, Router } from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from 'morgan'
import { Connection } from "mongoose"
import { DB } from "../db"
import { authenticator } from "../auth"
import { AppConfig, URLMetadata } from "../types"
import { httpErrors } from "../http"
import { GhostRouter } from "../routing/router"

export class Server{

    private app:Application

    constructor(){
        this.app = express()
    }

    public useJSONPayloads = () =>{
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())

    }

    public allowCrossOriginResourceSharing = () =>{
        this.app.use(cors())
    }

    public enforceSecurity = () =>{
        this.app.use(helmet())
    }

    public logRequestsandResponses = () =>{
        this.app.use(morgan('dev'))
    }

    public listenToRequests = (port: number, appName: string) =>{
        this.app.listen(port, () =>{
            console.log(`Running ${appName} on http://localhost:${port}`)
        })
    }

    public setUpRouter = (config: AppConfig): Router =>{

        //Switch to another database in the connection pool
        const connection = config.connectionPool.switchConnection(config.dBName)
        const db = new DB(connection)

        const dataModel = db.createModel(config.modelName, config.dataSchema)
            
        const dataAccess = new config.DataAccessConstructor(dataModel)
        const controller = new config.ControllerConstructor(dataAccess, config.applicationName)

        const appRouter: GhostRouter = new config.GhostRouterConstructor(controller, config.authenticator)

        const routes =  appRouter.authenticateAndControlRoutes()

        return routes
    }

    public setUpAuthenticator = (secretOrKey: string, authDbConnection: Connection) =>{
        authenticator.configureStrategy(secretOrKey, authDbConnection)
        authenticator.initialize(this.app)
    }

    public configureUrls = (routesMetadata: URLMetadata[]) =>{
        routesMetadata.forEach(data =>{
            this.app.use(data.path, data.router)
        })
    }

    public handleServerErrors = () =>{
        this.app.use(httpErrors.handleServerErrors)
    }
    
    public handleUnknownUrls = () =>{
        this.app.use(httpErrors.handleUnknownUrls)
    }

}

const server = new Server()
export default server