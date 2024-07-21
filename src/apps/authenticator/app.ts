import { AuthController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { connection } from "../../config/config"

const dataAccess  = new DataAccess()
const controller = new AuthController(dataAccess)

export const authRoutes = routesWrapper(controller)


