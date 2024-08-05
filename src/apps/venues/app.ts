import { VenuesRouter } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connectionPool,siztim } from "../../_config/config";
import { venueSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth";
import { ZRouter } from "../../z-library/types";
import { venuesDbName } from "../../_environment";
import { RouterConfig } from "../../z-library/siztim/types";

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

        venuesRouter = siztim.configureRouter(routerConfig)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Venues Database: ", error.message)
}

export { venuesRouter }
