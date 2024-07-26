import { Controller } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { CategoriesDAL } from "../mocks/data-access";
import { EventCategory } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/auth/mock/auth";
import { user } from "../../../../z-library/auth/mock/mock-user";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new CategoriesDAL(EventCategory)
const controller = new Controller(dataAccess, 'categories')

const authenticator = new Authenticator(user)


app.use('/categories', routesWrapper(controller, authenticator))

export { app }