import { EventsController } from "../../controller/controller";
import { authenticateAndControlRoutes, EventsRouter } from "../../urls/urls";
import express from "express"
import { EventsDAL } from "../mocks/data-access";
import { Event } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/testing/mocks/auth";
import { user } from "../../../../z-library/testing/mocks/mock-user";
import { validData } from "../mocks/raw-data";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new EventsDAL(Event, validData)
const controller = new EventsController(dataAccess, 'events')

user.userGroup = 'organizer'
const authenticator = new Authenticator(user)

const eventsRouter = new EventsRouter(controller, authenticator)

app.use('/events', eventsRouter.authenticateAndControlRoutes())

export { app }