import { Controller } from "../../controller/controller";
import { authenticateAndControlRoutes } from "../../urls/urls";
import express from "express"
import { VenuesDAL } from "../mocks/data-access";
import { Venue } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/testing/mocks/auth";
import { user } from "../../../../z-library/testing/mocks/mock-user";
import { validData } from "../mocks/raw-data";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new VenuesDAL(Venue, validData)
const controller = new Controller(dataAccess, 'venues')

user.userGroup = 'host'
const authenticator = new Authenticator(user)


app.use('/venues', authenticateAndControlRoutes(controller, authenticator))

export { app }