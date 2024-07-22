import { AuthController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";

const dataAccess  = new DataAccess()
const controller = new AuthController(dataAccess)

export const authRouter = routesWrapper(controller)


