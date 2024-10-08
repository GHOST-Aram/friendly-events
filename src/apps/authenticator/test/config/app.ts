import { AuthController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { AuthRouter } from "../../urls/urls";
import { app } from "../../../../zero/testing";

const controller = new AuthController(dataAccess)
const authRouter = new AuthRouter(controller)

app.use('/auth', authRouter.registerRoutes())

export { app }