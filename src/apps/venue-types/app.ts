import { routesWrapper } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { tSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import 'dotenv/config'

let appRouter: Router
const appDbName = process.env.APPDB_NAME

try {
    if(appDbName) {
        const db = new DB(connection.switch(appDbName))
        const AppModel = db.createModel('<modelName>', tSchema)
        
        const appDAL = new DataAccess(AppModel)
        const controller = new Controller(appDAL, '<appName>')
        appRouter = routesWrapper(controller, authenticator)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venues Database: ", error.message)
}

export { appRouter }
