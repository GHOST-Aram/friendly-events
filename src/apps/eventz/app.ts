import { routesWrapper } from "./urls/urls";
import { EventsDataAccess } from "./data-access/data-access";
import { EventsController } from "./controller/controller";
import { connection, server } from "../../_config/config";
import { eventSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import { AppConfigFields } from "../../z-library/server/server";
import 'dotenv/config'

let eventsRouter: Router
const eventsDbName = process.env.EVENTSDB_NAME

try {
    if(eventsDbName) {
        const appConf: AppConfigFields  = {
            connection,
            dBName: eventsDbName,
            modelName: 'VenueCategory',
            applicationName: 'venue-types',
            dataSchema: eventSchema,
            authenticator,
            DataAccessConstructor: EventsDataAccess,
            ControllerConstructor: EventsController,
            routesWrapper,
        }

        eventsRouter = server.setUpRouter(appConf)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Events Database: ", error.message)
}

export { eventsRouter }
