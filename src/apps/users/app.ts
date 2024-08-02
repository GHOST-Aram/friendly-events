import { UsersRouter } from "./urls/urls";
import { UsersDAL } from "./data-access/data-access";
import { UsersController } from "./controller/controller";
import { connectionPool, server } from "../../_config/config";
import { userSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth";
import { AppConfig, ZRouter } from "../../z-library/types";
import { usersDbName } from "../../_environment";

let usersRouter: ZRouter


try {
    if(usersDbName) {
        const appConf: AppConfig  = {
            connectionPool,
            dBName: usersDbName,
            modelName: 'User',
            applicationName: 'users',
            dataSchema: userSchema,
            authenticator,
            DataAccess: UsersDAL,
            Controller: UsersController,
            GhostRouter: UsersRouter,
        }

        usersRouter = server.setUpRouter(appConf)
    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Users Database: ", error.message)
}

export { usersRouter }
