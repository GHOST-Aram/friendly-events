import express, { Application, Router } from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from 'morgan'
import { Schema } from "mongoose"
import { Connection } from "../db/connection"
import { DB } from "../db/db"
import { Authenticator } from "../auth/auth"

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

    public switchDbConnection = (dbName: string) =>{
        
    }

    public setUpRouter = (fields: AppConfigFields): Router =>{
        const db = new DB(fields.connection.switch(fields.dBName))
        const dataModel = db.createModel(fields.modelName, fields.dataSchema)
            
        const dataAccess = new fields.DataAccessConstructor(dataModel)
        const controller = new fields.ControllerConstructor(dataAccess, fields.applicationName)

    return fields.routesWrapper(controller, fields.authenticator)
}

}


export interface AppConfigFields{
    connection: Connection 
    dBName: string, 
    dataSchema: Schema<any>,
    DataAccessConstructor: any,
    ControllerConstructor: any, 
    routesWrapper: (controller: any, authenticator: Authenticator)=> Router,
    authenticator: Authenticator,
    modelName: string,
    applicationName: string
}