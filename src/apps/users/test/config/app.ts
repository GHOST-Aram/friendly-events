import { UsersDAL } from "../mocks/data-access";
import { UsersController } from "../../controller/controller";
import { User } from "../../data-access/model";
import { Authenticator } from "../mocks/auth";
import { user } from "../../../../z-library/testing/mocks/mock-user";
import { validUserData } from "../mocks/raw-data";
import { UsersRouter } from "../../urls/urls";
import { app } from '../../../../z-library/testing/config/app'

const usersDAL = new UsersDAL(User, validUserData)
const controller = new UsersController(usersDAL, 'users')

const authenticator = new Authenticator(user)

const usersRouter = new UsersRouter(controller, authenticator)
app.use('/users', usersRouter.authenticateAndControlRoutes())

export { app }