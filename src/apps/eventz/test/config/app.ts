import { EventsController } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { EventsDAL } from "../mocks/data-access";
import { Event } from "../../data-access/model";
import { Authenticator } from "../../../../z-library/auth/mock/auth";
import { user } from "../../../mock-user";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new EventsDAL(Event)
const controller = new EventsController(dataAccess, 'events')

user.userGroup = 'organizer'
const authenticator = new Authenticator(user)


app.use('/events', routesWrapper(controller, authenticator))

export { app }