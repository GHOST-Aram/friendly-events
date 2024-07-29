import { Controller } from "../../controller/controller";
import { VenuesTypesRouter } from "../../urls/urls";
import express from "express"
import { VenueCategoryDAL } from "../mocks/data-access";
import { VenueCategory } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/testing/mocks/auth";
import { user } from "../../../../z-library/testing/mocks/mock-user";
import { validData } from "../mocks/raw-data";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new VenueCategoryDAL(VenueCategory, validData)
const controller = new Controller(dataAccess, 'venue-types')

user.userGroup = 'host'
const authenticator = new Authenticator(user)

const venueTypesRouter = new VenuesTypesRouter(controller, authenticator)
app.use('/venue-types', venueTypesRouter.authenticateAndControlRoutes())

export { app }