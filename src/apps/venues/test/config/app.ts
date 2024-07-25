import { Controller } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { VenuesDAL } from "../mocks/data-access";
import { Venue } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/auth/mock/auth";
import { user } from "../../../../z-library/auth/mock/mock-user";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new VenuesDAL(Venue)
const controller = new Controller(dataAccess, 'venues')

const authenticator = new Authenticator(user)


app.use('/events', routesWrapper(controller, authenticator))

export { app }