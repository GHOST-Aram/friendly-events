import { EventsController } from "../../controller/controller";
import { EventsRouter } from "../../urls/urls";
import { EventsDAL } from "../mocks/data-access";
import { Event } from "../../data-access/model";
import { Authenticator, user, app } from "../../../../z-library/testing";
import { validData } from "../mocks/raw-data";

const dataAccess = new EventsDAL(Event, validData)
const controller = new EventsController(dataAccess, 'events')

user.userGroup = 'organizer'
const authenticator = new Authenticator(user)

const eventsRouter = new EventsRouter(controller, authenticator)

app.use('/events', eventsRouter.registerRoutes())

export { app }