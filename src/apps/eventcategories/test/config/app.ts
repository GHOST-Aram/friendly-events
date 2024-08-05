import { Controller } from "../../controller/controller";
import { CategoriesDAL } from "../mocks/data-access";
import { EventCategory } from "../../data-access/model";
import { app, Authenticator, user } from "../../../../zero/testing";
import { validData } from "../mocks/raw-data";
import { CategoryRouter } from "../../urls/urls";


const dataAccess = new CategoriesDAL(EventCategory, validData)
const controller = new Controller(dataAccess, 'categories')

user.userGroup = 'superuser'
const authenticator = new Authenticator(user)

const categoriesRouter = new CategoryRouter(controller, authenticator)
app.use('/categories', categoriesRouter.registerRoutes())

export { app }