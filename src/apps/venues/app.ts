import { authenticateAndControlRoutes } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connectionPool,server } from "../../_config/config";
import { venueSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import { AppConfig } from "../../z-library/types";
import 'dotenv/config'

let venuesRouter: Router
const venuesDbName = process.env.VENUESDB_NAME

try {
    if(venuesDbName) {
        const appConf: AppConfig  = {
            connectionPool,
            dBName: venuesDbName,
            modelName: 'VenueCategory',
            applicationName: 'venue-types',
            dataSchema: venueSchema,
            authenticator,
            DataAccessConstructor: DataAccess,
            ControllerConstructor: Controller,
            authenticateAndControlRoutes,
        }

        venuesRouter = server.setUpRouter(appConf)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venues Database: ", error.message)
}

export { venuesRouter }
