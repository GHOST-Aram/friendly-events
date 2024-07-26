import { Controller } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { MockDataAccess } from "../mocks/data-access";
import { Model } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/auth/mock/auth";
import { user } from "../../../../z-library/auth/mock/mock-user";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new MockDataAccess(Model)
const controller = new Controller(dataAccess, '<appName>')

const authenticator = new Authenticator(user)


app.use('/<appName>', routesWrapper(controller, authenticator))

export { app }