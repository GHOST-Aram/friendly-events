import { EventsRouter } from "./urls/urls";
import { EventsDataAccess } from "./data-access/data-access";
import { EventsController } from "./controller/controller";
import { connectionPool, server } from "../../_config/config";
import { eventSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth";
import { AppConfig, ZRouter } from "../../z-library/types";
import { eventsDbName } from "../../_environment";

let eventsRouter: ZRouter


try {
    if(eventsDbName) {
        const appConf: AppConfig  = {
            connectionPool,
            dBName: eventsDbName,
            modelName: 'VenueCategory',
            applicationName: 'venue-types',
            dataSchema: eventSchema,
            authenticator,
            DataAccessConstructor: EventsDataAccess,
            ControllerConstructor: EventsController,
            GhostRouterConstructor: EventsRouter,
        }

        eventsRouter = server.setUpRouter(appConf)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Events Database: ", error.message)
}

export { eventsRouter }
