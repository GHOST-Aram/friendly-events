import { AuthController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { AuthRouter } from "../../urls/urls";
import { app } from "../../../../z-library/testing";

const controller = new AuthController(dataAccess)
const authRouter = new AuthRouter(controller)

app.use('/auth', authRouter.controlRoutes())

export { app }