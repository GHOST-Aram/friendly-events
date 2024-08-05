import { CategoryRouter } from "./urls/urls";
import { DataAccess } from "./data-access/data-access";
import { Controller } from "./controller/controller";
import { connectionPool, zero } from "../../_config/config";
import { categorySchema } from "./data-access/model";
import { authenticator } from "../../zero/auth";
import { ZRouter } from "../../zero/types";
import { categoriesDbName } from "../../_environment";
import { RouterConfig } from "../../zero/zero/types";

let categoriesRouter: ZRouter


try {
    if(categoriesDbName) {

        const routerConfig: RouterConfig  = {
            connectionPool,
            dBName: categoriesDbName,
            modelName: 'Category',
            applicationName: 'event-categories',
            dataSchema: categorySchema,
            authenticator,
            DataAccess: DataAccess,
            Controller: Controller,
            GhostRouter: CategoryRouter,
        }

        categoriesRouter = zero.configureRouter(routerConfig)

    } else {
        throw new Error("Database name not found in environment Variables")
    }
    
} catch (error: any) {
    console.warn("Error occured while Switching to Categories Database: ", error.message)
}

export { categoriesRouter }
