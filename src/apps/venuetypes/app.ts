import { authenticateAndControlRoutes } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connectionPool, server } from "../../_config/config";
import { venueCatSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import { AppConfig } from "../../z-library/types";
import 'dotenv/config'

let venueTypesRouter: Router
const venueCategoryDbName = process.env.VENUECATEGORYDB_NAME

try {
    if(venueCategoryDbName) {
        const appConf: AppConfig  = {
            connectionPool,
            dBName: venueCategoryDbName,
            modelName: 'VenueCategory',
            applicationName: 'venue-types',
            dataSchema: venueCatSchema,
            authenticator,
            DataAccessConstructor: DataAccess,
            ControllerConstructor: Controller,
            authenticateAndControlRoutes,
        }

        venueTypesRouter = server.setUpRouter(appConf)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venue Types Database: ", error.message)
}

export { venueTypesRouter }
