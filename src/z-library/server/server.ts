import express, { Application, Router } from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from 'morgan'
import { Connection, Schema } from "mongoose"
import { ConnectionPool } from "../db/connection"
import { DB } from "../db/db"
import { Authenticator, authenticator } from "../auth/auth"

export class Server{

    private app:Application

    constructor(app: Application){
        this.app = app
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
        const db = new DB(config.connectionPool.switchConnection(config.dBName))

        const dataModel = db.createModel(config.modelName, config.dataSchema)
            
        const dataAccess = new config.DataAccessConstructor(dataModel)
        const controller = new config.ControllerConstructor(dataAccess, config.applicationName)

        return config.routesWrapper(controller, config.authenticator)
    }

    public setUpAuthenticator = (secretOrKey: string, authDbConnection: Connection) =>{
        authenticator.configureStrategy(secretOrKey, authDbConnection)
        authenticator.initialize(this.app)
    }

}


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