import { Controller } from "../../controller/controller";
import { VenuesDAL } from "../mocks/data-access";
import { Venue } from "../../data-access/model";
import { Authenticator, user, app } from "../../../../z-library/testing";
import { validData } from "../mocks/raw-data";
import { VenuesRouter } from "../../urls/urls";

const dataAccess = new VenuesDAL(Venue, validData)
const controller = new Controller(dataAccess, 'venues')

user.userGroup = 'host'
const authenticator = new Authenticator(user)

const venuesRouter = new VenuesRouter(controller, authenticator)


app.use('/venues', venuesRouter.registerRoutes())

export { app }