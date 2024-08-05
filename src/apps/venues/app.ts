import { VenuesRouter } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connectionPool,zero } from "../../_config/config";
import { venueSchema } from "./data-access/model";
import { authenticator } from "../../zero/auth";
import { ZRouter } from "../../zero/types";
import { venuesDbName } from "../../_environment";
import { RouterConfig } from "../../zero/zero/types";

let venuesRouter: ZRouter

try {
    if(venuesDbName) {
        const routerConfig: RouterConfig  = {
            connectionPool,
            dBName: venuesDbName,
            modelName: 'VenueCategory',
            applicationName: 'venue-types',
            dataSchema: venueSchema,
            authenticator,
            DataAccess: DataAccess,
            Controller: Controller,
            GhostRouter: VenuesRouter
        }

        venuesRouter = zero.configureRouter(routerConfig)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venues Database: ", error.message)
}

export { venuesRouter }
