import { EventsRouter } from "./urls/urls";
import { EventsDataAccess } from "./data-access/data-access";
import { EventsController } from "./controller/controller";
import { connectionPool, zero } from "../../_config/config";
import { eventSchema } from "./data-access/model";
import { authenticator } from "../../zero/auth";
import { ZRouter } from "../../zero/types";
import { eventsDbName } from "../../_environment";
import { RouterConfig } from "../../zero/zero/types";

let eventsRouter: ZRouter


try {
    if(eventsDbName) {
        const routerConfig: RouterConfig  = {
            connectionPool,
            dBName: eventsDbName,
            modelName: 'VenueCategory',
            applicationName: 'venue-types',
            dataSchema: eventSchema,
            authenticator,
            DataAccess: EventsDataAccess,
            Controller: EventsController,
            GhostRouter: EventsRouter,
        }

        eventsRouter = zero.configureRouter(routerConfig)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Events Database: ", error.message)
}

export { eventsRouter }
