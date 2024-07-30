import { AuthController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import express from 'express'
import { AuthRouter } from "../../urls/urls";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const controller = new AuthController(dataAccess)
const authRouter = new AuthRouter(controller)

app.use('/auth', authRouter.controlRoutes())

export { app }