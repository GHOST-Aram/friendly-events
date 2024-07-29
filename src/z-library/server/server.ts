import express, { Application, Router } from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from 'morgan'
import { Connection } from "mongoose"
import { DB } from "../db/db"
import { authenticator } from "../auth/auth"
import { AppConfig } from "../types"

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

        return config.authenticateAndControlRoutes(controller, config.authenticator)
    }

    public setUpAuthenticator = (secretOrKey: string, authDbConnection: Connection) =>{
        authenticator.configureStrategy(secretOrKey, authDbConnection)
        authenticator.initialize(this.app)
    }

}