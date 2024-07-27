import { routesWrapper } from "./urls/urls";
import { UsersDAL } from "./data-access/data-access";
import { UsersController } from "./controller/controller";
import { connection, server } from "../../_config/config";
import { userSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";
import { Router } from "express";
import { AppConfigFields } from "../../z-library/server/server";
import 'dotenv/config'

let usersRouter: Router
const usersDbName = process.env.USERSDB_NAME

try {
    if(usersDbName) {
        const appConf: AppConfigFields  = {
            connection,
            dBName: usersDbName,
            modelName: 'VenueCategory',
            applicationName: 'venue-types',
            dataSchema: userSchema,
            authenticator,
            DataAccessConstructor: UsersDAL,
            ControllerConstructor: UsersController,
            routesWrapper,
        }

        usersRouter = server.setUpRouter(appConf)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Users Database: ", error.message)
}

export { usersRouter }
