import { routesWrapper } from "./urls/urls";
import { UsersDAL } from "./data-access/data-access";
import { UsersController } from "./controller/controller";
import { connection } from "../../config/config";
import { DB } from "../../z-library/db/db";
import { userSchema } from "./data-access/model";
import { authenticator } from "../../z-library/auth/auth";


const db = new DB(connection.switch('homenest-users'))
const UserModel = db.createModel('User', userSchema)

const usersDAL = new UsersDAL(UserModel)
const controller = new UsersController(usersDAL, 'users')

export const usersRouter = routesWrapper(controller, authenticator)
