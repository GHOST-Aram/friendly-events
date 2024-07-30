import { Controller } from "../../controller/controller";
import { VenuesDAL } from "../mocks/data-access";
import { Venue } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/testing/mocks/auth";
import { user } from "../../../../z-library/testing/mocks/mock-user";
import { validData } from "../mocks/raw-data";
import { VenuesRouter } from "../../urls/urls";
import { app } from '../../../../z-library/testing/config/app'

const dataAccess = new VenuesDAL(Venue, validData)
const controller = new Controller(dataAccess, 'venues')

user.userGroup = 'host'
const authenticator = new Authenticator(user)

const venuesRouter = new VenuesRouter(controller, authenticator)


app.use('/venues', venuesRouter.authenticateAndControlRoutes())

export { app }