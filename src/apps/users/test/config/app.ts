import { routesWrapper } from "../../urls/urls";
import { UsersDAL } from "../mocks/data-access";
import { UsersController } from "../../controller/controller";
import express from "express"
import { User } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/auth/mock/auth";
import { user } from "../../../mock-user";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const usersDAL = new UsersDAL(User)
const controller = new UsersController(usersDAL, 'users')

const authenticator = new Authenticator(user)
app.use('/users', routesWrapper(controller, authenticator))

export { app }