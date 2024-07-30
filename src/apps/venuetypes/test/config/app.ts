import { Controller } from "../../controller/controller";
import { VenuesTypesRouter } from "../../urls/urls";
import { VenueCategoryDAL } from "../mocks/data-access";
import { VenueCategory } from "../../data-access/model";
import { Authenticator, user, app } from "../../../../z-library/testing";
import { validData } from "../mocks/raw-data";

const dataAccess = new VenueCategoryDAL(VenueCategory, validData)
const controller = new Controller(dataAccess, 'venue-types')

user.userGroup = 'host'
const authenticator = new Authenticator(user)

const venueTypesRouter = new VenuesTypesRouter(controller, authenticator)
app.use('/venue-types', venueTypesRouter.authenticateAndControlRoutes())

export { app }