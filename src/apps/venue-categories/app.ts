import { routesWrapper } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connection } from "../../_config/config";
import { DB } from "../../z-library/db/db";
import { venueCatSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import 'dotenv/config'

let venueCategoriesRouter: Router
const venueCategoryDbName = process.env.VENUECATEGORYDB_NAME

try {
    if(venueCategoryDbName) {
        const db = new DB(connection.switch(venueCategoryDbName))
        const AppModel = db.createModel('venue-categories', venueCatSchema)
        
        const appDAL = new DataAccess(AppModel)
        const controller = new Controller(appDAL, 'venue-categories')
        venueCategoriesRouter = routesWrapper(controller, authenticator)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venue Categories Database: ", error.message)
}

export { venueCategoriesRouter }
