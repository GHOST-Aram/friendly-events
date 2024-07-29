import { Controller } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { CategoriesDAL } from "../mocks/data-access";
import { EventCategory } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/testing/mocks/auth";
import { user } from "../../../../z-library/testing/mocks/mock-user";
import { validData } from "../mocks/raw-data";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new CategoriesDAL(EventCategory, validData)
const controller = new Controller(dataAccess, 'categories')

user.userGroup = 'superuser'
const authenticator = new Authenticator(user)


app.use('/categories', routesWrapper(controller, authenticator))

export { app }