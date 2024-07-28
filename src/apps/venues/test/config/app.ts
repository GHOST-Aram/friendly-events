import { Controller } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { VenuesDAL } from "../mocks/data-access";
import { Venue } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/auth/mock/auth";
import { user } from "../../../../z-library/auth/mock/mock-user";
import { validData } from "../mocks/raw-data";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new VenuesDAL(Venue, validData)
const controller = new Controller(dataAccess, 'venues')

user.userGroup = 'host'
const authenticator = new Authenticator(user)


app.use('/venues', routesWrapper(controller, authenticator))

export { app }