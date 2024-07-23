import { EventsController } from "../../controller/controller";
import { routesWrapper } from "../../urls/urls";
import express from "express"
import { EventsDAL } from "../mocks/data-access";
import { Event } from "../../data-access/model";
import { authenticator } from "../../../../z-library/auth/mock/auth";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new EventsDAL(Event)
const controller = new EventsController(dataAccess, 'events')

app.use('/events', routesWrapper(controller, authenticator))

export { app }