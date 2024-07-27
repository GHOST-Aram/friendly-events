import { routesWrapper } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connection, server } from "../../_config/config";
import { categorySchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import { AppConfig } from "../../z-library/server/server";
import 'dotenv/config'

let categoriesRouter: Router
const categoriesDbName = process.env.CATEGORIESDB_NAME

try {
    if(categoriesDbName) {

        const appConf: AppConfig  = {
            connection,
            dBName: categoriesDbName,
            modelName: 'Category',
            applicationName: 'event-categories',
            dataSchema: categorySchema,
            authenticator,
            DataAccessConstructor: DataAccess,
            ControllerConstructor: Controller,
            routesWrapper,
        }

        categoriesRouter = server.setUpRouter(appConf)

    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Categories Database: ", error.message)
}

export { categoriesRouter }
