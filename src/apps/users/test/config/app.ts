import { UsersDAL } from "../mocks/data-access";
import { UsersController } from "../../controller/controller";
import { User } from "../../data-access/model";
import { Authenticator } from "../mocks/auth";
import { user, app } from "../../../../z-library/testing";
import { validUserData } from "../mocks/raw-data";
import { UsersRouter } from "../../urls/urls";

const usersDAL = new UsersDAL(User, validUserData)
const controller = new UsersController(usersDAL, 'users')

const authenticator = new Authenticator(user)

const usersRouter = new UsersRouter(controller, authenticator)
app.use('/users', usersRouter.registerRoutes())

export { app }