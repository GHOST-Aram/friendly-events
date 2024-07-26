import { Controller } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { VenueTypeDAL } from "../mocks/data-access";
import { VenueType } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/auth/mock/auth";
import { user } from "../../../../z-library/auth/mock/mock-user";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new VenueTypeDAL(VenueType)
const controller = new Controller(dataAccess, 'venue-types')

user.userGroup = 'host'
const authenticator = new Authenticator(user)


app.use('/venue-types', routesWrapper(controller, authenticator))

export { app }