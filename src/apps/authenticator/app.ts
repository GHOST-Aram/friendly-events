import { AuthController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { AuthRouter } from "./urls/urls";

const dataAccess  = new DataAccess()
const controller = new AuthController(dataAccess)



export const authRouter = new AuthRouter(controller).controlRoutes()


